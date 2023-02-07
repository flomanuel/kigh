using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Worker for deleting existing entries.
/// </summary>
public class DeleteEntryWorker : AbstractWorker
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public DeleteEntryWorker() : base(Tasks.DeleteEntry)
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
        List<Entry> result;
        var error = false;
        foreach (var entry in entries)
        {
            try
            {
                var entity = entryContext.Entries.FirstOrDefault(item => item.Id == entry.Id);
                entryContext.Remove(entity);
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