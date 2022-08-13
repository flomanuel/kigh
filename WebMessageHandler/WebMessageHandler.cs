using System.Collections.Generic;
using kigh.WebMessageHandler.InstructionWorker;
using Newtonsoft.Json;

namespace kigh.WebMessageHandler;

public class WebMessageHandler
{
    private string MessageRawData { get; }
    private WebMessage WebMessage { get; set; }

    public Response Response { get; set; }

    private readonly List<AbstractWorker> _workers;

    public WebMessageHandler(string messageRawData)
    {
        _workers = new List<AbstractWorker>
        {
            new AddEntryWorker(),
            new DeleteEntryWorker(),
            new GetEntriesWorker(),
            new UpdateEntryWorker(),
            new ExportEntriesWorker(),
            new OpenEntriesWorker()
        };

        MessageRawData = messageRawData;
        ParseMessage();
        HandleInstructions();
    }

    private void ParseMessage()
    {
        WebMessage = JsonConvert.DeserializeObject<WebMessage>(MessageRawData);
    }

    private void HandleInstructions()
    {
        foreach (var worker in _workers)
        {
            if (worker.Task == WebMessage.Task)
            {
                Response = worker.Run(WebMessage.EntryList);
                break;
            }
        }
    }

    public override string ToString()
    {
        return Response.ToString();
    }
}