using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

public class CreateEntryWorker : AbstractWorker
{
    public CreateEntryWorker() : base(Tasks.AddEntry)
    {
    }

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