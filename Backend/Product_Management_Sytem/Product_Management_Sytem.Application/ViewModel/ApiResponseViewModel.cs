using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Application.ViewModel
{
    public class ApiResponseModel
    {
        public bool Success { get; set; }
        public object? Data { get; set; }
        public string? Message { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
