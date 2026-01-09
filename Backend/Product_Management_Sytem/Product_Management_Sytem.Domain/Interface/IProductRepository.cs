using Product_Management_Sytem.Persistence.ApplicationDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Persistence.Interface
{
    public interface IProductRepository
    {
        Task<(List<Product>, int)> GetAllProducts(string search, int page, int pageSize);
        Task<Product> GetProductById(int? id);
        Task<Product> AddProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        Task<bool> DeleteProduct(Product product);
        Task<List<Category>> GetAllCategories();
    }
}
