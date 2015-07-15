using Newtonsoft.Json;
using ng.Insider.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace ng.Insider.WebApi.Repositories
{
    public class NotificationRepository
    {
        internal List<Announcement> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/sampleA.json");

            var json = System.IO.File.ReadAllText(filePath);

            var announcements = JsonConvert.DeserializeObject<List<Announcement>>(json);

            return announcements;
        }
    }
}