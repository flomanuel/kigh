using System;
using System.Collections.Generic;
using System.Net;
using kigh.WebMessageHandler.Model;
using System.Linq;


namespace kigh.WebMessageHandler.InstructionWorker;

public class ReadEntriesWorker : AbstractWorker
{
    public ReadEntriesWorker() : base(Tasks.GetEntries)
    {
    }

    public override Response
        Run(List<Entry> entries, EntryContext entryContext) // frontend passes empty entry elements only containing IDs
    {
        List<Entry> result;
        var error = false;
        try
        {
            if (entries.Count > 0)
            {
                var selectedEntries = new List<string>();
                entries.ForEach(e => selectedEntries.Add(e.Id));
                result = entryContext.Entries.Where(entry => selectedEntries.Contains(entry.Id)).ToList();
            }
            else
                result = entryContext.Entries.OrderBy(e => e.Title).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            error = true;
            result = new List<Entry>();
        }

        return new Response(error ? HttpStatusCode.InternalServerError : HttpStatusCode.OK, Task, result);
    }
}