﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web;

namespace WebApiApp
{
    //internal static class Helpers
    //{
    //    internal static async Task DisplayTextResultAsync(
    //        HttpResponseMessage response,
    //        TextBox output,
    //        CancellationToken token)
    //    {
    //        string responseBodyAsText;
    //        output.Text += SerializeHeaders(response);
    //        responseBodyAsText = await response.Content.ReadAsStringAsync().AsTask(token);

    //        token.ThrowIfCancellationRequested();

    //        // Insert new lines.
    //        responseBodyAsText = responseBodyAsText.Replace("<br>", Environment.NewLine);

    //        output.Text += responseBodyAsText;
    //    }

    //    internal static string SerializeHeaders(HttpResponseMessage response)
    //    {
    //        StringBuilder output = new StringBuilder();

    //        // We cast the StatusCode to an int so we display the numeric value (e.g., "200") rather than the
    //        // name of the enum (e.g., "OK") which would often be redundant with the ReasonPhrase.
    //        output.Append(((int)response.StatusCode) + " " + response.ReasonPhrase + "\r\n");

    //        SerializeHeaderCollection(response.Headers, output);
    //        SerializeHeaderCollection(response.Content.Headers, output);
    //        output.Append("\r\n");
    //        return output.ToString();
    //    }

    //    internal static void SerializeHeaderCollection(
    //        IEnumerable<KeyValuePair<string, string>> headers,
    //        StringBuilder output)
    //    {
    //        foreach (var header in headers)
    //        {
    //            output.Append(header.Key + ": " + header.Value + "\r\n");
    //        }
    //    }

    //    internal static void CreateHttpClient(ref HttpClient httpClient)
    //    {
    //        if (httpClient != null)
    //        {
    //            httpClient.Dispose();
    //        }

    //        // HttpClient functionality can be extended by plugging multiple filters together and providing
    //        // HttpClient with the configured filter pipeline.
    //        //IHttpFilter filter = new HttpBaseProtocolFilter();
    //        ////filter = new PlugInFilter(filter); // Adds a custom header to every request and response message.
    //        //httpClient = new HttpClient(filter);

    //        // The following line sets a "User-Agent" request header as a default header on the HttpClient instance.
    //        // Default headers will be sent with every request sent from this HttpClient instance.
    //        httpClient.DefaultRequestHeaders.UserAgent.Add(new HttpProductInfoHeaderValue("Sample", "v8"));
    //    }

     
    //    internal static bool TryGetUri(string uriString, out Uri uri)
    //    {
    //        // Note that this app has both "Internet (Client)" and "Home and Work Networking" capabilities set,
    //        // since the user may provide URIs for servers located on the internet or intranet. If apps only
    //        // communicate with servers on the internet, only the "Internet (Client)" capability should be set.
    //        // Similarly if an app is only intended to communicate on the intranet, only the "Home and Work
    //        // Networking" capability should be set.
    //        if (!Uri.TryCreate(uriString.Trim(), UriKind.Absolute, out uri))
    //        {
    //            return false;
    //        }

    //        if (uri.Scheme != "http" && uri.Scheme != "https")
    //        {
    //            return false;
    //        }

    //        return true;
    //    }
    //}
}