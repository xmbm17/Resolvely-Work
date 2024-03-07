using Sabio.Models.Domain.Tasks;
using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Sabio.Models.Domain.Modules
{
    public class ModuleV2
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public LookUp Status { get; set; }
        public int SortOrder { get; set; }
        public bool AutoAssign { get; set; }
        public bool HasTasks { get; set; }
        public string ImageUrl { get; set; }
        public bool IsDeleted { get; set; }
        public List<Task> Tasks { get; set; }
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
