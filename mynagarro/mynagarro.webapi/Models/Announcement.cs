using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mynagarro.webapi.Models
{
    class Announcement
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
    }
}
