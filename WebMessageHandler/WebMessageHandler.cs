using System.Collections.Generic;
using System.Net;
using kigh.WebMessageHandler.InstructionWorker;
using kigh.WebMessageHandler.Model;
using Newtonsoft.Json;

namespace kigh.WebMessageHandler;

public class WebMessageHandler
{
    private string MessageRawData { get; }
    public EntryContext DbContext { get; }
    private WebMessage WebMessage { get; set; }

    public Response Response { get; set; }

    private readonly Dictionary<Tasks, AbstractWorker> _workers;

    public WebMessageHandler(string messageRawData, EntryContext dbContext)
    {
        _workers = new Dictionary<Tasks, AbstractWorker>
        {
            {Tasks.AddEntry, new CreateEntryWorker()},
            {Tasks.DeleteEntry, new DeleteEntryWorker()},
            {Tasks.GetEntries, new ReadEntriesWorker()},
            {Tasks.UpdateEntry, new UpdateEntryWorker()},
            {Tasks.ExportEntries, new ExportEntriesWorker()}
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