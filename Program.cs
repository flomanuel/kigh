using PhotinoNET;
using System;
using System.Collections.Generic;
using System.Drawing;
using kigh.WebMessageHandler;
using kigh.WebMessageHandler.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq;
using System.Reflection;

class Program
{
    static void Main()
    {
        var entryContext = new EntryContext();
        if (!entryContext.Database.GetService<IRelationalDatabaseCreator>().Exists())
        {
            entryContext.Database.Migrate();
        }

        InitMainWindow(entryContext);
    }

    static void InitMainWindow(EntryContext entryContext)
    {
        List<Entry> entriesList;
        try
        {
            entriesList = entryContext.Entries.Where(e => e.OpenAtStartup).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }

        var window = new PhotinoWindow()
            .SetTitle("kigh")
            .SetUseOsDefaultSize(false)
            .SetSize(new Size(900, 500))
            .Center()
            .SetResizable(true)
            .SetIconFile("wwwroot/IconGlobe.svg") // todo: fix icon load
            .SetContextMenuEnabled(true)
            .RegisterWebMessageReceivedHandler((sender, message) =>
            {
                if (message == "open-entries")
                {
                    foreach (var entry in entriesList)
                    {
                        if (Uri.IsWellFormedUriString(entry.Url, UriKind.Absolute))
                        {
                            var entryWindow = new PhotinoWindow()
                                .SetTitle(entry.Title)
                                .SetUseOsDefaultSize(false)
                                .SetSize(new Size(900, 500))
                                .SetUseOsDefaultLocation(true)
                                .SetResizable(true)
                                .SetContextMenuEnabled(true);
                            entryWindow.StartUrl = entry.Url;
                            entryWindow.WaitForClose();
                        }
                    }
                }
                else
                {
                    WebMessageHandler webMessageHandler = new WebMessageHandler(message, entryContext);
                    string response = webMessageHandler.Response.ToString();
                    var window = (PhotinoWindow) sender;
                    window.SendWebMessage(response);
                }
            });
        window.StartUrl = "wwwroot/index.html";
        window.WaitForClose();
    }
}