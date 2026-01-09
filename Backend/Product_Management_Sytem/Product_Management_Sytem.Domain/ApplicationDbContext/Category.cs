using System;
using System.Collections.Generic;

namespace Product_Management_Sytem.Persistence.ApplicationDbContext;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool? IsDeleted { get; set; }

    public DateTime? CreatedOn { get; set; }

    public virtual ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
}
