using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Worker for creating entry list based on a given set of IDs.
/// </summary>
public class ExportEntriesWorker : AbstractWorker
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public ExportEntriesWorker() : base(Tasks.ExportEntries)
    {
    }

    /// <summary>
    /// Start the task.
    /// </summary>
    /// <param name="entries">List of all entries that are to be processed.</param>
    /// <param name="entryContext">Database session object</param>
    /// <returns>Response class containing the http status code (500 or 200) and a list of all entry-objects that are to be exported.</returns>
    public override Response
        Run(List<Entry> entries, EntryContext entryContext) // empty entry elements only containing IDs
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