using Sabio.Models;
using Sabio.Models.Domain.Modules;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IModuleService
    {
        Module Get(int id);
        ModuleV2 GetV2(int id);
        List<Module> GetAll();
        Paged<Module> GetAllModulesPaginated(int pageIndex, int pageSize);
        Paged<Module> Search(int pageIndex, int pageSize, string query);
        int Add(ModuleAddRequest model, int userId);
        void Update(ModuleUpdateRequest model, int userId);
        void UpdateModuleStatus(int moduleId);
        void Delete(int id);
        public void AddStudentModule(StudentModulesAddRequest model);
        public void DeleteStudentModule(int studentId, int moduleId);
        public void UpdateStudentModule(StudentModuleUpdateRequest model);
        public List<StudentModule> GetByStudentId(int studentId);
        public List<StudentModule> GetByModuleId(int moduleId);
        public Paged<StudentModule> SelectAllPaginated(int pageIndex, int pageSize);
        public List<StudentModule> GetByModuleAndLevelId(int moduleId, int levelId);
        public List<StudentModule> GetByModuleIsCompleted();
        public List<StudentModuleCount> GetByStudentModuleCount();
        public void AddStudentModuleBatch(StudentModulesBatchAdd model);
        public void ModuleEmailPerStudent(StudentModulesBatchAdd model);
        List<ModuleV3> GetAllModulesByStudentId(int studentId);
        List<StudentModWithModDetails> GetByStudentIdPlusModule(int studentId);
    }
}