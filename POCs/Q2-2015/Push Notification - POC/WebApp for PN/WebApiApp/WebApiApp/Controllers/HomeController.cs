using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.IO;
using System.Text;
using System.Collections.Generic;


namespace WebApiApp.Controllers
{
    [DataContract]
    public class OAuthToken
    {
        [DataMember(Name = "access_token")]
        public string AccessToken { get; set; }
        [DataMember(Name = "token_type")]
        public string TokenType { get; set; }
    }



    public class HomeController : Controller
    {

        public HomeController()
        {
            //Helpers.CreateHttpClient(ref httpClient);
            //cts = new CancellationTokenSource();
        }

        public static class stringHolder
        {
            public static string holder = string.Empty;
            public static OAuthToken token = null;
        }

        [HttpPost]
        public ActionResult Index(string url)
        {


            var oSR = new StreamReader(Request.InputStream);
            string sContent = oSR.ReadToEnd();

            string[] bodyArray = sContent.Split(';');

            string channelUri;

            channelUri = sContent;
            stringHolder.holder = channelUri;


            var token = GetAccessToken("dyg4/0UIs2WvmwuiDEnORrU03GzXJE4R", "ms-app://s-1-15-2-318116213-2651238252-15649664-3530545174-1535617900-1371280941-3899397248");

            stringHolder.token = token;

            //SendNotification(channelUri, token);

            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult PushIt()
        {
            if (stringHolder.holder != null && stringHolder.token != null)
            {
                SendNotification(stringHolder.holder, stringHolder.token);
            }
            return View();
        }

        //private void PostToWNS()
        //{
        //    WebRequest request = WebRequest.Create("http://www.contoso.com/");
        //    ((HttpWebRequest)request).UserAgent = ".NET Framework Example Client";
        //    request.Method = "POST";
        //    // request.ContentLength = byteArray.Length;
        //    request.ContentType = "application/x-www-form-urlencoded";
        //    WebResponse response = request.GetResponse();
        //}

        private OAuthToken GetOAuthTokenFromJson(string jsonString)
        {
            using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(jsonString)))
            {
                var ser = new DataContractJsonSerializer(typeof(OAuthToken));
                var oAuthToken = (OAuthToken)ser.ReadObject(ms);
                return oAuthToken;
            }
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
                response = client.UploadString("https://login.live.com/accesstoken.srf", body);
            }
            return GetOAuthTokenFromJson(response);
        }



        protected void SendNotification(string channelUrl, OAuthToken token)
        {

            //var urlEncodedSecret = HttpUtility.UrlEncode(secret);
            //var urlEncodedSid = HttpUtility.UrlEncode(sid);

            var body = "<toast><visual><binding template=\"ToastText02\"><text id=\"1\">headlineText</text><text id=\"2\">bodyText</text></binding></visual></toast>";

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
