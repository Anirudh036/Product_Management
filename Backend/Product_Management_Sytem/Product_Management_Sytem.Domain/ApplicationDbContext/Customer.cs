using System;
using System.Collections.Generic;

namespace Product_Management_Sytem.Persistence.ApplicationDbContext;

public partial class Customer
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public DateTime? CreatedOn { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
