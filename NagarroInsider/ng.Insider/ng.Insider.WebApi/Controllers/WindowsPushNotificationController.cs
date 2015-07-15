using System;
using System.IO;
using System.Net;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
//using System.Web.Mvc;
using System.Web.Http;
using ng.Insider.WebApi.Helper;

namespace ng.Insider.WebApi.Controllers
{
    public class WindowsPushNotificationController : ApiController
    {
        [DataContract]
        public class OAuthToken
        {
            [DataMember(Name = "access_token")]
            public string AccessToken { get; set; }
            [DataMember(Name = "token_type")]
            public string TokenType { get; set; }
        }

        public static class stringHolder
        {
            public static string holder = string.Empty;
            public static OAuthToken token = null;
        }

        [HttpPost]
        public void Post()
        {
            //var oSR = new StreamReader(Request);
            //string sContent = oSR.ReadToEnd();
            
            string channelUri = Request.Content.ReadAsStringAsync().Result;;
            //channelUri = "asd"; //sContent;
            stringHolder.holder = channelUri;
            var token = GetAccessToken(ConfigKeys.Keys.wpSecret, ConfigKeys.Keys.wpSecurityIdentifier);
            stringHolder.token = token;
            SendNotification(channelUri, token);

        }

        protected OAuthToken GetAccessToken(string secret, string sid)
        {
            var urlEncodedSecret = HttpUtility.UrlEncode(secret);
            var urlEncodedSid = HttpUtility.UrlEncode(sid);
            var body =
              String.Format("grant_type=client_credentials&client_id={0}&client_secret={1}&scope=notify.windows.com", urlEncodedSid, urlEncodedSecret);

            string response;
            using (var client = new WebClient())
            {
                client.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                response = client.UploadString(ConfigKeys.Keys.accessTokenRequestUrl, body);
            }
            return GetOAuthTokenFromJson(response);
        }

        private OAuthToken GetOAuthTokenFromJson(string jsonString)
        {
            using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(jsonString)))
            {
                var ser = new DataContractJsonSerializer(typeof(OAuthToken));
                var oAuthToken = (OAuthToken)ser.ReadObject(ms);
                return oAuthToken;
            }
        }

        protected void SendNotification(string channelUrl, OAuthToken token)
        {
            //var urlEncodedSecret = HttpUtility.UrlEncode(secret);
            //var urlEncodedSid = HttpUtility.UrlEncode(sid);
            var body = "<toast><visual><binding template=\"ToastText02\"><text id=\"1\">Sodexo</text><text id=\"2\">Please collect sodexo vouchers...</text></binding></visual></toast>";
            string response;
            using (var client = new WebClient())
            {
                client.Headers.Add("Authorization", token.TokenType + " " + token.AccessToken);
                client.Headers.Add("X-WNS-Type", "wns/toast");
                client.Headers.Add("user-agent", "Only a test!");
                client.Headers.Add("Content-Type", "text/xml");
                response = client.UploadString(channelUrl, body);
            }
        }
    }
}
