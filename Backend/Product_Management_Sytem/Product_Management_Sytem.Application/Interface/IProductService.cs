using Product_Management_Sytem.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Application.Interface
{
    public interface IProductService
    {
        Task<object> GetAllProducts(string search, int page, int pageSize);
        Task<ProductViewModel> GetProductById(int id);
        Task<ProductViewModel> CreateProduct(ProductCreateUpdateDto productViewModel);
        Task<ProductViewModel> UpdateProduct(int? id,ProductCreateUpdateDto productViewModel);
        Task<bool> DeleteProduct(int id);
    }
}
