using System.Collections.Generic;
using System.Net;
using System.Text;
using Newtonsoft.Json;

namespace kigh.WebMessageHandler;

public class Response
{
    public HttpStatusCode StatusCode { get; }
    public Tasks Task { get; }
    public List<Entry> Entries { get; }

    public Response(HttpStatusCode statusCode, Tasks task, List<Entry> entries = null)
    {
        StatusCode = statusCode;
        Task = task;
        Entries = entries ?? new List<Entry>();
    }

    public override string ToString()
    {
        StringBuilder result = new StringBuilder();
        result.Append(@"{""HttpStatusCode"":" + (int)StatusCode)
            .Append(@",""Task"":")
            .Append((int)Task)
            .Append(@",""EntryList"":[");
        for (int i = 0; i < Entries.Count; ++i)
        {
            if (i > 0)
                result.Append(',');
            result.Append(JsonConvert.SerializeObject(Entries[i]));
        }

        result.Append("]}");

        return result.ToString();
    }
}