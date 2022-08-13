using System.Collections.Generic;
using System.Net;

namespace kigh.WebMessageHandler.InstructionWorker;

public class ExportEntriesWorker : AbstractWorker
{
    public ExportEntriesWorker() : base(Tasks.ExportEntries)
    {
    }

    public override Response Run(List<Entry> entries) // frontend passes empty entry elements only containing IDs
    {
        List<Entry> result;
        if (entries.Count > 0)
        {
            result = new List<Entry>();
            foreach (var entry in entries)
            {
                Entry item = GetEntry(entry.Id);
                if (item != null)
                    result.Add(item);
            }
        }
        else
            result = DummyData.Entries;

        return new Response(HttpStatusCode.OK, Task, result);
    }

    private Entry GetEntry(string id)
    {
        foreach (var entry in DummyData.Entries)
        {
            if (entry.Id == id)
                return entry;
        }

        return null;
    }
}