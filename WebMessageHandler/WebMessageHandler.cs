using System.Collections.Generic;
using System.Net;
using kigh.WebMessageHandler.InstructionWorker;
using kigh.WebMessageHandler.Model;
using Newtonsoft.Json;

namespace kigh.WebMessageHandler;

/// <summary>
/// Class for handling frontend requests. Interpreting values, creating objects, calling responsible worker.
/// </summary>
public class WebMessageHandler
{
    private string MessageRawData { get; }

    private EntryContext DbContext { get; }

    private WebMessage WebMessage { get; set; }

    /// <summary>
    /// Response returned by the worker.
    /// </summary>
    public Response Response { get; private set; }

    private readonly Dictionary<Tasks, AbstractWorker> _workers;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="messageRawData">Frontend message data. JSON format</param>
    /// <param name="dbContext">Database session object</param>
    public WebMessageHandler(string messageRawData, EntryContext dbContext)
    {
        _workers = new Dictionary<Tasks, AbstractWorker>
        {
            { Tasks.AddEntry, new CreateEntryWorker() },
            { Tasks.DeleteEntry, new DeleteEntryWorker() },
            { Tasks.GetEntries, new ReadEntriesWorker() },
            { Tasks.UpdateEntry, new UpdateEntryWorker() },
            { Tasks.ExportEntries, new ExportEntriesWorker() }
        };

        MessageRawData = messageRawData;
        DbContext = dbContext;
        ParseMessage();
        HandleInstructions();
    }

    private void ParseMessage() //todo: form validation
    {
        WebMessage = JsonConvert.DeserializeObject<WebMessage>(MessageRawData);
    }

    private void HandleInstructions()
    {
        if (_workers.TryGetValue(WebMessage.Task, out var worker))
        {
            Response = worker.Run(WebMessage.EntryList, DbContext);
        }
        else
        {
            Response = new Response(HttpStatusCode.InternalServerError, WebMessage.Task);
        }
    }
}