using Product_Management_Sytem.Application.Interface;
using Product_Management_Sytem.Application.ViewModel;
using Product_Management_Sytem.Persistence.ApplicationDbContext;
using Product_Management_Sytem.Persistence.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product_Management_Sytem.Application.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
                _repository = repository;
        }
        public async Task<object> GetAllProducts(string search, int page, int pageSize)
        {
            var (products, totalCount) = await _repository.GetAllProducts(search, page, pageSize);
            var result = products.Select(p => new ProductViewModel
            {
                Id = p.Id,
                ProductName = p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
               // Categories = p.ProductCategories.Select(pc => pc.Category.Name).ToList()
            });

            return new { totalCount, result };
        }

        public async Task<ProductViewModel> CreateProduct(ProductCreateUpdateDto productViewModel)
        {
            var product = new Product
            {
                Name = productViewModel.Name,
                Description = productViewModel.Description,
                Price = productViewModel.Price,
                StockQuantity = productViewModel.StockQuantity,
                ProductCategories = productViewModel.CategoryIds.Select(id => new ProductCategory
                {
                    CategoryId = id
                }).ToList(),

                IsDelete = false,
                CreatedOn = DateTime.Now,

            };
            var savedProduct = await _repository.AddProduct(product);

            return new ProductViewModel
            {
                Id = savedProduct.Id,
                ProductName = savedProduct.Name,
                Description = savedProduct.Description,
                Price = savedProduct.Price,
                StockQuantity = savedProduct.StockQuantity,
            };
        }

        public async Task<ProductViewModel> GetProductById(int id)
        {
            var product =await _repository.GetProductById(id);
            if (product == null) {
                throw new Exception("Product not found");
            }

            return new ProductViewModel
            {
                Id = product.Id,
                ProductName = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
            };
        }

        public async Task<ProductViewModel> UpdateProduct(int? id, ProductCreateUpdateDto productViewModel)
        {
            var product = await _repository.GetProductById(id ?? 0);
            if (product == null)
            {
                throw new Exception("Product not found");
            }

            product.Name = productViewModel.Name;
            product.Description = productViewModel.Description;
            product.Price = productViewModel.Price;
            product.StockQuantity = productViewModel.StockQuantity;
            product.ProductCategories = productViewModel.CategoryIds.Select(cid => new ProductCategory
            {
                ProductId = id,
                CategoryId = cid
            }).ToList();

            product.UpdatedOn = DateTime.UtcNow;

            var updatedProduct = await _repository.UpdateProduct(product);

            return new ProductViewModel
            {
                Id = updatedProduct.Id,
                ProductName = updatedProduct.Name,
                Description = updatedProduct.Description,
                Price = updatedProduct.Price,
                StockQuantity = updatedProduct.StockQuantity,
            };
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _repository.GetProductById(id);
            if (product == null)
            {
                return false;
            }

            return await _repository.DeleteProduct(product);
        }
    }
}
