using System;
using System.Collections.Generic;

namespace kigh.WebMessageHandler;

/// <summary>
/// Object representing message from the frontend.
/// {"task": 1, "EntryList": [{data from first entry}, {data from second entry}]}
/// </summary>
public class WebMessage
{
    public Tasks Task { get; }
    public List<Entry> EntryList { get; }

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="task">code of the task / worker</param>
    /// <param name="entryList">List of entries. Created by the frontend.</param>
    /// <exception cref="ArgumentNullException">No Entry List passed to constructor</exception>
    public WebMessage(Tasks task, List<Entry> entryList)
    {
        Task = task;
        EntryList = entryList ?? throw new ArgumentNullException();
    }
}