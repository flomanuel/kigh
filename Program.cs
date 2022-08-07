using PhotinoNET;
using System;
using System.Drawing;
using System.IO;
using System.Text;

namespace kigh
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            string windowTitle = "kigh";

            var window = new PhotinoWindow()
                .SetTitle(windowTitle)
                .SetUseOsDefaultSize(false)
                .SetSize(new Size(900, 500))
                .Center()
                .SetResizable(true)
                .SetIconFile("wwwroot/IconGlobe.svg") // todo: fix icon load
                .Load("wwwroot/index.html");

            window.WaitForClose();
        }
    }
}
