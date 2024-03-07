using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Tasks
{
    public class ModuleTask
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public string ImageUrl { get; set; }
        public string StatusName { get; set; }
        public int StatusTypeId { get; set; }
        public int SortOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int TypeId { get; set; }
        public string Name { get; set; }
    }
}
