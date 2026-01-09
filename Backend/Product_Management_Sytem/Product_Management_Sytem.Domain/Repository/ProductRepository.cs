using Microsoft.EntityFrameworkCore;
using Product_Management_Sytem.Persistence.ApplicationDbContext;
using Product_Management_Sytem.Persistence.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Persistence.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductDbContext _dbContext;

        public ProductRepository(ProductDbContext context)
        {
            _dbContext = context;
        }

        public async Task<Product> AddProduct(Product product)
        {
            try
            {
                _dbContext.Products.Add(product);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
           
            return product;
        }
        public async Task<Product> UpdateProduct(Product product)
        {
            _dbContext.Products.Update(product);
            await _dbContext.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteProduct(Product product)
        {
            _dbContext.Products.Remove(product);
           return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<(List<Product>, int)> GetAllProducts(string search, int page, int pageSize)
        {
            var query = _dbContext.Products
                        .Include(p => p.ProductCategories)
                        .ThenInclude(pc => pc.Category)
                        .Where(p => string.IsNullOrEmpty(search) || p.Name.Contains(search));

            var totalCount = await query.CountAsync();

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (products, totalCount);
        }

        public async Task<Product> GetProductById(int? id)
        {
            var product = await _dbContext.Products
                        .Include(p => p.ProductCategories)
                            .ThenInclude(pc => pc.Category)
                        .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var query = _dbContext.Categories.AsNoTracking().ToList();
            return query;
        }

    }
}
