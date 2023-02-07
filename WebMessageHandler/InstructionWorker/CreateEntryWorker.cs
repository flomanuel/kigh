using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Worker for creating and saving new entries.
/// </summary>
public class CreateEntryWorker : AbstractWorker
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public CreateEntryWorker() : base(Tasks.AddEntry)
    {
    }

    /// <summary>
    /// Start the task.
    /// </summary>
    /// <param name="entries">List of all entries that are to be processed.</param>
    /// <param name="entryContext">Database session object</param>
    /// <returns>Response class containing the http status code (500 or 200)</returns>
    public override Response Run(List<Entry> entries, EntryContext entryContext)
    {
        var error = false;
        List<Entry> result;
        foreach (var entry in entries)
        {
            try
            {
                entryContext.Add(entry);
                entryContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                error = true;
            }
        }

        try
        {
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