using mynagarro.webapi.Models;
using mynagarro.webapi.Repositories;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

namespace mynagarro.webapi.Controllers
{
    public class ValuesController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            AnnouncementRepository nr = new AnnouncementRepository();

            var data = nr.Retrieve();

            List<Announcement> filterData = null;

            //if (id != null)
            //{
            //    filterData = data.Where(z => z.ID > id).ToList();
            //}
            //else
            //{
               filterData = data;
            //}


            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var resp = new HttpResponseMessage(HttpStatusCode.OK);
            resp.Content = new ObjectContent<List<Announcement>>(filterData, jsonFormatter);
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }
    }
}
