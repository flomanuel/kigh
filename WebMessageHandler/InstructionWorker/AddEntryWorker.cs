using System.Collections.Generic;
using System.Net;

namespace kigh.WebMessageHandler.InstructionWorker;

public class AddEntryWorker : AbstractWorker
{
    public AddEntryWorker() : base(Tasks.AddEntry)
    {
    }

    public override Response Run(List<Entry> entries)
    {
        foreach (var entry in entries)
        {
            DummyData.Entries.Add(entry); //todo: form validation
        }

        return new Response(HttpStatusCode.OK, Task, DummyData.Entries);
    }
}