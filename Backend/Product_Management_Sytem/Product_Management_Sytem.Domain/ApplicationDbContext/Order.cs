using System;
using System.Collections.Generic;

namespace Product_Management_Sytem.Persistence.ApplicationDbContext;

public partial class Order
{
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public decimal? OrderValue { get; set; }

    public DateTime? CreatedOn { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual Customer? Customer { get; set; }
}
