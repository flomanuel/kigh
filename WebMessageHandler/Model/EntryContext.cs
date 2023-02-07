using System;
using Microsoft.EntityFrameworkCore;

namespace kigh.WebMessageHandler.Model;

/// <summary>
/// Session with the database for persisting / loading entries from the database.
/// </summary>
public class EntryContext : DbContext
{
    /// <summary>
    /// Database Set containing all entries.
    /// </summary>
    public DbSet<Entry> Entries { get; set; }

    private string DbPath { get; }

    /// <summary>
    /// Constructor.
    /// </summary>
    public EntryContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "kigh.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}