using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

public class UpdateEntryWorker : AbstractWorker
{
    public UpdateEntryWorker() : base(Tasks.UpdateEntry)
    {
    }

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