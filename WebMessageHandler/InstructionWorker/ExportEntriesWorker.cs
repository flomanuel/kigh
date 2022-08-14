using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

public class ExportEntriesWorker : AbstractWorker
{
    public ExportEntriesWorker() : base(Tasks.ExportEntries)
    {
    }

    public override Response
        Run(List<Entry> entries, EntryContext entryContext) // frontend passes empty entry elements only containing IDs
    {
        List<Entry> result;
        var error = false;

        var selectedEntries = new List<string>();
        entries.ForEach(e => selectedEntries.Add(e.Id));

        try
        {
            result = entryContext.Entries.Where(entry => selectedEntries.Contains(entry.Id)).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            error = true;
            result = new List<Entry>();
        }

        //todo: instead of copy to clipboard, write data to file for download
        return new Response(error ? HttpStatusCode.InternalServerError : HttpStatusCode.OK, Task, result);
    }
}