using System;
using System.Collections.Generic;

namespace TODO_LIST.Models;

public partial class Homework
{
    public long IdHomework { get; set; }

    public string Description { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }
}
