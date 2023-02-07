using System.Collections.Generic;
using System.Net;
using System.Text;
using Newtonsoft.Json;

namespace kigh.WebMessageHandler;

/// <summary>
/// Class representing the response sent back to the frontend.
/// </summary>
public class Response
{
    private HttpStatusCode StatusCode { get; }
    private Tasks Task { get; }
    private List<Entry> Entries { get; }

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="statusCode">http status code of the result</param>
    /// <param name="task">code of the task / worker</param>
    /// <param name="entries">List of entries. Result of running the worker.</param>
    public Response(HttpStatusCode statusCode, Tasks task, List<Entry> entries = null)
    {
        StatusCode = statusCode;
        Task = task;
        Entries = entries ?? new List<Entry>();
    }

    /// <summary>
    /// Returning values of fields and properties. Formatted as JSON.
    /// </summary>
    /// <returns>Content of response object in JSON format.</returns>
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