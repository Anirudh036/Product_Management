using System;
using System.Collections.Generic;

namespace Product_Management_Sytem.Persistence.ApplicationDbContext;

public partial class ProductCategory
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public int? CategoryId { get; set; }

    public bool? IsDelete { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Product? Product { get; set; }
}
