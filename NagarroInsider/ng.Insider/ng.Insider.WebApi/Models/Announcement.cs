using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng.Insider.WebApi.Models
{
    public class Announcement
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
    }
}