using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Domain.Modules;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/modules")]
    [ApiController]
    public class ModuleApiController : BaseApiController
    {
        private IModuleService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ModuleApiController(IModuleService service
            , IAuthenticationService<int> authService
            , ILogger<ModuleApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region Modules

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Module>> GetModuleById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Module module = _service.Get(id);

                if (module == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Module> { Item = module };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("details/{id:int}")]
        public ActionResult<ItemResponse<ModuleV2>> GetModuleByIdV2(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                ModuleV2 moduleV2 = _service.GetV2(id);

                if (moduleV2 == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<ModuleV2> { Item = moduleV2 };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Module>> GetAllModules()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Module> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Module> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Module>>> PaginatedModules(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Module> page = _service.GetAllModulesPaginated(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Module>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Module>>> SearchModules(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Module> page = _service.Search(pageIndex, pageSize, query);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Module>> { Item = page };
                }
                return StatusCode(code, response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                code = 500;
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> CreateModule(ModuleAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);

            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateModule(ModuleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("status/{moduleId:int}")]
        public ActionResult<ItemResponse<int>> UpdateModuleStauts(int moduleId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateModuleStatus(moduleId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<ItemResponse<int>> DeleteModuleById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        #endregion


        #region StudentModules

        [HttpPost("studentmodulesbatch")]
        public ActionResult<ItemResponse<StudentModulesBatchAdd>> CreateStudentModuleBatch(StudentModulesBatchAdd model)
        {
            ObjectResult result = null;

            try
            {
                _service.AddStudentModuleBatch(model);
                ItemResponse<StudentModulesBatchAdd> response = new ItemResponse<StudentModulesBatchAdd>() { Item = model };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPost("studentmodules")]
        public ActionResult<ItemResponse<StudentModulesAddRequest>> CreateStudentModule(StudentModulesAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                _service.AddStudentModule(model);
                ItemResponse<StudentModulesAddRequest> response = new ItemResponse<StudentModulesAddRequest>() { Item = model };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpDelete("studentmodules/{studentId:int}/{moduleId:int}")]
        public ActionResult<ItemResponse<int>> DeleteStudentModule(int studentId, int moduleId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteStudentModule(studentId, moduleId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("studentmodules")]
        public ActionResult<ItemResponse<StudentModuleUpdateRequest>> StudentModuleUpdate(StudentModuleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateStudentModule(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/bystudents/{studentId:int}")]
        public ActionResult<ItemsResponse<StudentModule>> GetStudentModuleByStudentId(int studentId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<StudentModule> list = _service.GetByStudentId(studentId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModule> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/bymodules/{moduleId:int}")]
        public ActionResult<ItemsResponse<StudentModule>> GetStudentModuleByModuleId(int moduleId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<StudentModule> list = _service.GetByModuleId(moduleId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModule> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("allassigned/{id:int}")]
        public ActionResult<ItemsResponse<ModuleV3>> GetAllModulesByStudentId (int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ModuleV3> list = _service.GetAllModulesByStudentId(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found.");
                }
                else
                {
                response = new ItemsResponse<ModuleV3> { Items = list };
                }

            }
            catch(Exception ex)
            {
                code=500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/paginate")]
        public ActionResult<ItemResponse<Paged<StudentModule>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<StudentModule> page = _service.SelectAllPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<StudentModule>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [HttpGet("studentmodules/completed")]
        public ActionResult<ItemsResponse<StudentModule>> GetByCompleted()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<StudentModule> list = _service.GetByModuleIsCompleted();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModule> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/bymodules/{moduleId:int}/{levelId:int}")]
        public ActionResult<ItemsResponse<StudentModule>> GetByModuleAndLevelId(int moduleId, int levelId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<StudentModule> list = _service.GetByModuleAndLevelId(moduleId, levelId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModule> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/bycompletedcount")]
        public ActionResult<ItemsResponse<StudentModuleCount>> GetByStudentModuleCount()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<StudentModuleCount> list = _service.GetByStudentModuleCount();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModuleCount> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("studentmodules/bystudents/plusmodule/{studentId:int}")]
        public ActionResult<ItemsResponse<StudentModWithModDetails>> GetByStudentIdPlusModule(int studentId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<StudentModWithModDetails> list = _service.GetByStudentIdPlusModule(studentId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<StudentModWithModDetails> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        #endregion

    }
}
