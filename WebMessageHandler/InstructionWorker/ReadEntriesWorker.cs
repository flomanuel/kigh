using System;
using System.Collections.Generic;
using System.Net;
using kigh.WebMessageHandler.Model;
using System.Linq;


namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Worker for creating a list of entry-objects based on a given list of IDs.
/// </summary>
public class ReadEntriesWorker : AbstractWorker
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public ReadEntriesWorker() : base(Tasks.GetEntries)
    {
    }

    /// <summary>
    /// Start the task.
    /// </summary>
    /// <param name="entries">List of all entries that are to be processed.</param>
    /// <param name="entryContext">Database session object</param>
    /// <returns>Response class containing the http status code (500 or 200) and a list of entry-objects.</returns>
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