using System.Collections.Generic;
using kigh.WebMessageHandler.Model;

namespace kigh.WebMessageHandler.InstructionWorker;

/// <summary>
/// Base class of all workers. One Worker for each CRUD-operation.
/// </summary>
public abstract class AbstractWorker
{
    /// <summary>
    /// Task Enum. Each Enum is assigned to one 'InstructionWorker'.
    /// </summary>
    /// <see cref="kigh.WebMessageHandler.Tasks"/>
    public readonly Tasks Task;

    protected AbstractWorker(Tasks task)
    {
        Task = task;
    }

    /// <summary>
    /// Start the task.
    /// </summary>
    /// <param name="entries">list of all entries that are to be processed.</param>
    /// <param name="entryContext">Database session object</param>
    /// <returns>Response class</returns>
    public abstract Response Run(List<Entry> entries, EntryContext entryContext);

    /// <summary>
    /// Hashcode of the current object.
    /// </summary>
    /// <returns></returns>
    public override int GetHashCode()
    {
        return Task.GetHashCode();
    }
}