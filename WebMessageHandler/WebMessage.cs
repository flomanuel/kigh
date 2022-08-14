using System.Collections.Generic;

namespace kigh.WebMessageHandler;

public class WebMessage
{
    public Tasks Task { get; }
    public List<Entry> EntryList { get; }

    /// <summary>
    /// Object representing message from the frontend.
    /// {"task": 1, "EntryList": [{data from first entry}, {data from second entry}]}
    /// </summary>
    /// <param name="task"></param>
    /// <param name="entryList"></param>
    public WebMessage(Tasks task, List<Entry> entryList)
    {
        Task = task;
        EntryList = entryList;
    }
}