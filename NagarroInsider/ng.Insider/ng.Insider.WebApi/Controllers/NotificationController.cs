using Newtonsoft.Json.Serialization;
using ng.Insider.WebApi.Helper;
using ng.Insider.WebApi.Models;
using ng.Insider.WebApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

namespace ng.Insider.WebApi.Controllers
{
    public class NotificationController : ApiController
    {


        //public class MenuItems
        //{
        //    public int Id { get; set; }
        //    public string Title { get; set; }
        //}

        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            NotificationRepository nr = new NotificationRepository();

            var data = nr.Retrieve();
            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var resp = new HttpResponseMessage(HttpStatusCode.OK);
            resp.Content = new ObjectContent<List<Announcement>>(data, jsonFormatter);
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }
    }
}
