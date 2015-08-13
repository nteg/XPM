using mynagarro.webapi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace mynagarro.webapi.Repositories
{
    class AnnouncementRepository
    {
        internal List<Announcement> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/announcements.json");

            var json = System.IO.File.ReadAllText(filePath);

            var announcements = JsonConvert.DeserializeObject<List<Announcement>>(json);

            return announcements;
        }
    }
}
