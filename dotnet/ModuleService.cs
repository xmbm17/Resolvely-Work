using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Domain.Modules;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Sabio.Models.Domain.Tasks;

namespace Sabio.Services
{
    public class ModuleService : IModuleService
    {
        private IDataProvider _data = null;
        private ILookUpService _lookUp = null;
        private IUserService _user = null;
        private IEmailService _emailService;

        public ModuleService(IDataProvider data, ILookUpService lookUp, IUserService user, IEmailService emailService)
        {
            _data = data;
            _lookUp = lookUp;
            _user = user;
            _emailService = emailService;
        }

        public Module Get(int id)
        {
            string procName = "[dbo].[Modules_Select_ById]";
            Module module = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    module = MapSingleModule(reader, ref startingIndex);
                }
                );
            return module;
        }

        public ModuleV2 GetV2(int id)
        {
            string procName = "[dbo].[Modules_Select_ByIdV2]";
            ModuleV2 moduleV2 = null;

           _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    moduleV2 = MapSingleModuleV2(reader, ref startingIndex);
                }
                );
            return moduleV2;
        }

        public List<Module> GetAll()
        {
            string procName = "[dbo].[Modules_SelectAll]";
            List<Module> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Module module = MapSingleModule(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<Module>();
                    }
                    list.Add(module);
                }
                );
            return list;
        }

        public Paged<Module> GetAllModulesPaginated(int pageIndex, int pageSize)
        {
            List<Module> modList = null;
            Paged<Module> pagedlist = null;
            string procName = "[dbo].[Modules_SelectAllPaginated]";
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingindex = 0;
                Module module = MapSingleModule(reader, ref startingindex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingindex++);
                }
                if (modList == null)
                {
                    modList = new List<Module>();
                }
                modList.Add(module);
            });
            if (modList != null)
            {
                pagedlist = new Paged<Module>(modList, pageIndex, pageSize, totalCount);
            }
            return pagedlist;
        }

        public Paged<Module> Search(int pageIndex, int pageSize, string query)
        {
            List<Module> list = null;
            Paged<Module> pagedlist = null;
            int totalCount = 0;
            string procName = "[dbo].[Modules_Search_Paginated]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingindex = 0;
                Module module = MapSingleModule(reader, ref startingindex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingindex++);
                }
                if (list == null)
                {
                    list = new List<Module>();
                }
                list.Add(module);
            });
            if (list != null)
            {
                pagedlist = new Paged<Module>(list, pageIndex, pageSize, totalCount);
            }
            return pagedlist;
        }

        public int Add(ModuleAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Modules_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(model, coll);
                    coll.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    coll.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object OId = returnCollection["@Id"].Value;
                    int.TryParse(OId.ToString(), out id);
                }
                );
            return id;
        }
        public void Update(ModuleUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Modules_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(model, coll);
                    coll.AddWithValue("@Id", model.Id);
                    coll.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }

        public void UpdateModuleStatus(int moduleId)
        {
            string procName = "[dbo].[Modules_Update_StatusType]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", moduleId);
            },
            returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Modules_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        public List<ModuleV3> GetAllModulesByStudentId(int studentId)
        {
            string procName = "dbo.[Modules_SelectAll_ByStudentId]";
            List<ModuleV3> moduleList = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@StudentId", studentId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ModuleV3 moduleV3 = MapSingleModuleV3(reader, ref startingIndex);

                if (moduleList == null)
                {
                    moduleList = new List<ModuleV3>();

                }
                moduleList.Add(moduleV3);
            });
            return moduleList;
        }

        private Module MapSingleModule(IDataReader reader, ref int startingIndex)
        {
            Module module = new Module();
            module.Id = reader.GetSafeInt32(startingIndex++);
            module.Title = reader.GetSafeString(startingIndex++);
            module.Description = reader.GetSafeString(startingIndex++);
            module.Status = _lookUp.MapSingleLookUp(reader, ref startingIndex);
            module.SortOrder = reader.GetSafeInt32(startingIndex++);
            module.AutoAssign = reader.GetSafeBool(startingIndex++);
            module.HasTasks = reader.GetSafeBool(startingIndex++);
            module.ImageUrl = reader.GetSafeString(startingIndex++);
            module.IsDeleted = reader.GetSafeBool(startingIndex++);
            module.CreatedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.ModifiedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.DateCreated = reader.GetSafeDateTime(startingIndex++);
            module.DateModified = reader.GetSafeDateTime(startingIndex++);
            return module;
        }
        private ModuleV2 MapSingleModuleV2(IDataReader reader, ref int startingIndex)
        {
            ModuleV2 module = new ModuleV2();
            module.Id = reader.GetSafeInt32(startingIndex++);
            module.Title = reader.GetSafeString(startingIndex++);
            module.Description = reader.GetSafeString(startingIndex++);
            module.Status = _lookUp.MapSingleLookUp(reader, ref startingIndex);
            module.SortOrder = reader.GetSafeInt32(startingIndex++);
            module.AutoAssign = reader.GetSafeBool(startingIndex++);
            module.HasTasks = reader.GetSafeBool(startingIndex++);
            module.ImageUrl = reader.GetSafeString(startingIndex++);
            module.IsDeleted = reader.GetSafeBool(startingIndex++);
            module.Tasks = reader.DeserializeObject<List<Task>>(startingIndex++);
            module.CreatedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.ModifiedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.DateCreated = reader.GetSafeDateTime(startingIndex++);
            module.DateModified = reader.GetSafeDateTime(startingIndex++);
            return module;
        }
        private ModuleV3 MapSingleModuleV3(IDataReader reader, ref int startingIndex)
        {
            ModuleV3 module = new ModuleV3();

            module.Id = reader.GetSafeInt32(startingIndex++);
            module.Title = reader.GetSafeString(startingIndex++);
            module.Description = reader.GetSafeString(startingIndex++);
            module.Status = _lookUp.MapSingleLookUp(reader, ref startingIndex);
            module.SortOrder = reader.GetSafeInt32(startingIndex++);
            module.AutoAssign = reader.GetSafeBool(startingIndex++);
            module.HasTasks = reader.GetSafeBool(startingIndex++);
            module.ImageUrl = reader.GetSafeString(startingIndex++);
            module.IsDeleted = reader.GetSafeBool(startingIndex++);
            module.Tasks = reader.DeserializeObject<List<ModuleTask>>(startingIndex++);
            module.CreatedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.ModifiedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            module.DateCreated = reader.GetSafeDateTime(startingIndex++);
            module.DateModified = reader.GetSafeDateTime(startingIndex++);
            return module;
        }

        private static void AddCommonParams(ModuleAddRequest model, SqlParameterCollection coll)
        {
            coll.AddWithValue("@Title", model.Title);
            coll.AddWithValue("@Description", model.Description);
            coll.AddWithValue("@StatusTypeId", model.StatusTypeId);
            coll.AddWithValue("@SortOrder", model.SortOrder);
            coll.AddWithValue("@AutoAssign", model.AutoAssign);
            coll.AddWithValue("@HasTasks", model.HasTasks);
            coll.AddWithValue("@ImageUrl", model.ImageUrl);
            coll.AddWithValue("@IsDeleted", model.IsDeleted);
        }

        public void AddStudentModuleBatch(StudentModulesBatchAdd model)
        {
            DataTable studentIdsTable = MapStudentIds(model.StudentIds);
            string procName = "[dbo].[StudentModules_InsertBatch]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@StudentIds", studentIdsTable);
                    sqlParams.AddWithValue("@ModuleId", model.ModuleId);
                });
            ModuleEmailPerStudent(model);
        }

        public void ModuleEmailPerStudent(StudentModulesBatchAdd model)
        {
            var moduleDetails = Get(model.ModuleId);

            foreach (var studentInfo in model.StudentIds)
            {
                var studentDetails = _user.SelectById(studentInfo);
                _emailService.StudentModuleEmail(studentDetails, moduleDetails);
            }

        }

        private DataTable MapStudentIds(List<int> studentIds)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("StudentId", typeof(int));

            foreach (int studentId in studentIds)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;
                dr.SetField(startingIndex++, studentId);
                dt.Rows.Add(dr);
            }
            return dt;
        }

        public void AddStudentModule(StudentModulesAddRequest model)
        {

            string procName = "[dbo].[StudentModules_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("StudentId", model.StudentId);
                    coll.AddWithValue("ModuleId", model.ModuleId);
                },
                returnParameters: null
                );
        }

        public void DeleteStudentModule(int studentId, int moduleId)
        {
            string procName = "[dbo].[StudentModules_Delete]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@StudentId", studentId);
                    coll.AddWithValue("@ModuleId", moduleId);
                },
                returnParameters: null);
        }

        public void UpdateStudentModule(StudentModuleUpdateRequest model)
        {
            string procName = "[dbo].[StudentModules_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@StudentId", model.StudentId);
                    coll.AddWithValue("@ModuleId", model.ModuleId);
                    coll.AddWithValue("@IsCompleted", model.IsCompleted);
                },
                returnParameters: null);
        }
        public List<StudentModule> GetByStudentId(int studentId)
        {
            string procName = "[dbo].[StudentModules_SelectByStudentId]";
            List<StudentModule> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StudentId", studentId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModule studentModule = MapSingleStudentModule(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<StudentModule>();
                    }
                    list.Add(studentModule);
                }
                );
            return list;
        }

        public List<StudentModule> GetByModuleId(int moduleId)
        {
            string procName = "[dbo].[StudentModules_SelectByModuleId]";
            List<StudentModule> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@ModuleId", moduleId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModule studentModule = MapSingleStudentModule(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<StudentModule>();
                    }
                    list.Add(studentModule);
                }
                );
            return list;
        }

        public Paged<StudentModule> SelectAllPaginated(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[StudentModules_SelectAllPaginate]";

            Paged<StudentModule> pagedList = null;
            List<StudentModule> studentList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModule studentModule = MapSingleStudentModule(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (studentList == null)
                    {
                        studentList = new List<StudentModule>();
                    }
                    studentList.Add(studentModule);
                });
            if (studentList != null)
            {
                pagedList = new Paged<StudentModule>(studentList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<StudentModule> GetByModuleIsCompleted()
        {
            string procName = "[dbo].[StudentModules_SelectByModuleIsCompleted]";
            List<StudentModule> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModule studentModule = MapSingleStudentModule(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<StudentModule>();
                    }
                    list.Add(studentModule);
                }
                );
            return list;
        }

        public List<StudentModule> GetByModuleAndLevelId(int moduleId, int levelId)
        {
            string procName = "[dbo].[StudentModules_SelectByModuleIdAndLevelTypeId]";
            List<StudentModule> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@ModuleId", moduleId);
                    paramCol.AddWithValue("@LevelTypeId", levelId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModule studentModule = MapSingleStudentModule(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<StudentModule>();
                    }
                    list.Add(studentModule);
                }
                );
            return list;
        }

        public List<StudentModuleCount> GetByStudentModuleCount()
        {
            string procName = "[dbo].[StudentModules_SelectModuleCount]";
            List<StudentModuleCount> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModuleCount studentModuleCount = new StudentModuleCount();

                    studentModuleCount.Student = reader.DeserializeObject<BaseUser>(startingIndex++);
                    studentModuleCount.ModuleCompletedCount = reader.GetSafeInt32(startingIndex++);
                    studentModuleCount.TotalModuleCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<StudentModuleCount>();
                    }
                    list.Add(studentModuleCount);
                }
                );
            return list;
        }

        public List<StudentModWithModDetails> GetByStudentIdPlusModule(int studentId)
        {
            string procName = "[dbo].[StudentModules_SelectByStudentIdPlusMod]";
            List<StudentModWithModDetails> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StudentId", studentId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    StudentModWithModDetails studentModulePlus = MapSingleStudentModulePlusMod(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<StudentModWithModDetails>();
                    }
                    list.Add(studentModulePlus);
                }
                );
            return list;
        }

        private StudentModule MapSingleStudentModule(IDataReader reader, ref int startingIndex)
        {
            StudentModule studentModule = new StudentModule();
            studentModule.Student = reader.DeserializeObject<BaseUser>(startingIndex++);
            studentModule.ModuleId = reader.GetSafeInt32(startingIndex++);
            studentModule.IsCompleted = reader.GetSafeBool(startingIndex++);
            return studentModule;
        }

        private StudentModWithModDetails MapSingleStudentModulePlusMod(IDataReader reader, ref int startingIndex)
        {
            StudentModWithModDetails studentModulePlus = new StudentModWithModDetails();
            studentModulePlus.Student = reader.DeserializeObject<BaseUser>(startingIndex++);
            studentModulePlus.Module = reader.DeserializeObject<BaseModule>(startingIndex++);
            studentModulePlus.IsCompleted = reader.GetSafeBool(startingIndex++);
            return studentModulePlus;
        }

    }
}
