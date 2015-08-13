using ng.Insider.WebApi.Models;
using ng.Insider.WebApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng.Insider.WebApi.Helper
{
    public static class ConfigKeys
    {
        private static ConfigurationKeys _keys;

        public static ConfigurationKeys Keys
        {
            get
            {
                ConfigurationRepository cr = new ConfigurationRepository();
                _keys = cr.Retrieve();
                return _keys;
            }
        }

    }
}