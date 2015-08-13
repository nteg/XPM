using Newtonsoft.Json;
using ng.Insider.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace ng.Insider.WebApi.Repositories
{
    public class ConfigurationRepository
    {

        internal ConfigurationKeys Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/configuration.json");

            var json = System.IO.File.ReadAllText(filePath);

            var configurations = JsonConvert.DeserializeObject<ConfigurationKeys>(json);

            return configurations;
        }
    }
}