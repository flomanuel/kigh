using System.Collections.Generic;
using System.Net;

namespace kigh.WebMessageHandler.InstructionWorker;

public class UpdateEntryWorker : AbstractWorker
{
    public UpdateEntryWorker() : base(Tasks.UpdateEntry)
    {
    }

    public override Response Run(List<Entry> entries)
    {
        foreach (var entry in entries)
        {
            UpdateEntry(entry);
        }

        return new Response(HttpStatusCode.OK, Task, DummyData.Entries);
    }

    private void UpdateEntry(Entry entry)
    {
        foreach (var candidate in DummyData.Entries)
        {
            if (candidate.Id == entry.Id)
            {
                candidate.Update(entry); //todo: form validation
                return;
            }
        }
    }
}