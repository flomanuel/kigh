using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net;
using PhotinoNET;

namespace kigh.WebMessageHandler.InstructionWorker;

public class OpenEntriesWorker : AbstractWorker
{
    public OpenEntriesWorker() : base(Tasks.OpenEntries)
    {
    }

    static void NewDelegateWindow(Entry entry)
    {
        if (entry.OpenAtStartup && Uri.IsWellFormedUriString(entry.Url, UriKind.Absolute))
        {
            new PhotinoWindow()
                .SetTitle(entry.Title)
                .SetUseOsDefaultSize(false)
                .SetSize(new Size(960, 540))
                .SetUseOsDefaultLocation(true)
                .SetResizable(true)
                .SetContextMenuEnabled(true)
                .Load(entry.Url)
                .WaitForClose();
        }
    }

    public override Response Run(List<Entry> entry)
    {
        foreach (var entry1 in DummyData.Entries)
        {
            NewDelegateWindow(entry1);
        }

        return new Response(HttpStatusCode.OK, Task, entry);
    }
}