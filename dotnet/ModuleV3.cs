using Sabio.Models.Domain.Tasks;
using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Modules
{
    public class ModuleV3 : ModuleV2
    {

        public new List<ModuleTask> Tasks { get; set; }

    }
}
