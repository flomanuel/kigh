using System.Collections.Generic;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

public abstract class AbstractWorker
{
    public readonly Tasks Task;

    protected AbstractWorker(Tasks task)
    {
        Task = task;
    }

    public abstract Response Run(List<Entry> entries, EntryContext entryContext);
}