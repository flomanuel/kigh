using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace kigh.WebMessageHandler.InstructionWorker;

public class DeleteEntryWorker : AbstractWorker
{
    public DeleteEntryWorker() : base(Tasks.DeleteEntry)
    {
    }

    public override Response Run(List<Entry> entries)
    {
        foreach (var entry in entries)
        {
            var itemToRemove = DummyData.Entries.Single(item => item.Id == entry.Id);
            DummyData.Entries.Remove(itemToRemove);
        }

        return new Response(HttpStatusCode.OK, Task, DummyData.Entries);
    }
}