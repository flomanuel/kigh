using System.Collections.Generic;

namespace kigh.WebMessageHandler.InstructionWorker;

public abstract class AbstractWorker
{
    public readonly Tasks Task;

    protected AbstractWorker(Tasks task)
    {
        Task = task;
    }

    public abstract Response Run(List<Entry> entry);
}