using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng.Insider.WebApi.Models
{
    public class ConfigurationKeys
    {
        public string accessTokenRequestUrl { get; set; }
        public string wpSecret { get; set; }
        public string wpSecurityIdentifier { get; set; }
    }
}