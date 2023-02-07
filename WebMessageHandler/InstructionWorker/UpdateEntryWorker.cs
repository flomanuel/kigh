using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Task for updating existing entries with new values.
/// </summary>
public class UpdateEntryWorker : AbstractWorker
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public UpdateEntryWorker() : base(Tasks.UpdateEntry)
    {
    }

    /// <summary>
    /// Start the task.
    /// </summary>
    /// <param name="entries">List of all entries that are to be processed.</param>
    /// <param name="entryContext">Database session object</param>
    /// <returns>Response class containing the http status code (500 or 200) and list of entries.</returns>
    public override Response Run(List<Entry> entries, EntryContext entryContext)
    {
        var error = false;
        try
        {
            foreach (var entry in entries)
            {
                var entity = entryContext.Entries.FirstOrDefault(item => item.Id == entry.Id);
                entity.Update(entry);
                entryContext.SaveChanges();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            error = true;
        }

        List<Entry> result;
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