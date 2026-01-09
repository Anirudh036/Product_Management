using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Application.ViewModel
{
    public class OrderViewModel
    {
        public int? Id { get; set; }
        public decimal? OrderValue {  get; set; }
        public int? CustomerId { get; set; }
    }
}
