using PhotinoNET;
using System;
using System.Drawing;
using System.IO;
using System.Text;
using kigh.WebMessageHandler;

class Program
{
    [STAThread]
    static void Main()
    {
        var window = new PhotinoWindow()
            .SetTitle("kigh")
            .SetUseOsDefaultSize(false)
            .SetSize(new Size(900, 500))
            .Center()
            .SetResizable(true)
            .SetIconFile("wwwroot/IconGlobe.svg") // todo: fix icon load
            .SetContextMenuEnabled(true)
            .Load("wwwroot/index.html");

        window.RegisterWebMessageReceivedHandler((sender, message) =>
        {
            WebMessageHandler webMessageHandler = new WebMessageHandler(message);
            string response = webMessageHandler.ToString();
            var window = (PhotinoWindow) sender;
            window.SendWebMessage(response);
        });

        window.WaitForClose();
    }
}