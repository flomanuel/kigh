using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

public class DeleteEntryWorker : AbstractWorker
{
    public DeleteEntryWorker() : base(Tasks.DeleteEntry)
    {
    }

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