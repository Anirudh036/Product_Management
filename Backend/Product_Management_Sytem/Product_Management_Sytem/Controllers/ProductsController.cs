using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Product_Management_Sytem.Application.Interface;
using Product_Management_Sytem.Application.ViewModel;

namespace Product_Management_Sytem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ApiResponseModel> GetAllProducts(
         [FromQuery] string search = "",
         [FromQuery] int page = 1,
         [FromQuery] int pageSize = 10)
        {
            var response = new ApiResponseModel();

            try
            {
                var result = await _service.GetAllProducts(search, page, pageSize);

                if (result == null)
                {
                    response.ErrorMessage = "Product list not found.";
                    response.Success = false;
                    response.Data = new List<ProductViewModel>();
                }
                else
                {
                    response.Message = "Get all products successfully.";
                    response.Success = true;
                    response.Data = result;
                }
            }
            catch (Exception ex)
            {
                response.ErrorMessage = ex.Message;
                response.Success = false;
                response.Data = new List<ProductViewModel>();
            }

            return response;
        }


        [HttpPost]
        public async Task<ApiResponseModel> GetProductById(int id)
        {
            var resposne = new ApiResponseModel();
            try
            {
                var result = await _service.GetProductById(id);
                if (result == null)
                {
                    resposne.ErrorMessage = "Product not found.";
                    resposne.Success = false;
                    resposne.Data = new List<ProductViewModel>();
                }
                else
                {
                    resposne.Message = "Get product successfully.";
                    resposne.Success = true;
                    resposne.Data = result;
                }
            }
            catch (Exception ex)
            {

                if (ex == null)
                {
                    resposne.ErrorMessage = "Product not found." + ex;
                    resposne.Data = new List<ProductViewModel>();
                    resposne.Success = false;
                }
            }
            return resposne;
        }

        [HttpPost]
        public async Task<ApiResponseModel> CreateProduct(ProductCreateUpdateDto dto)
        {
            var resposne = new ApiResponseModel();
            try
            {
                var result = await _service.CreateProduct(dto); 
                if (result == null)
                {
                    resposne.ErrorMessage = "Product not found.";
                    resposne.Success = false;
                    resposne.Data = new List<ProductViewModel>();
                }
                else
                {
                    resposne.Message = "Product added successfully.";
                    resposne.Success = true;
                    resposne.Data = result;
                }
            }
            catch (Exception ex)
            {

                if (ex == null)
                {
                    resposne.ErrorMessage = "Product not added." + ex;
                    resposne.Data = new List<ProductViewModel>();
                    resposne.Success = false;
                }
            }
            return resposne;
            
            
        }

        [HttpPost]
        public async Task<ApiResponseModel> UpdateProduct(int? id, ProductCreateUpdateDto dto)
        {
            var resposne = new ApiResponseModel();
            try
            {
                var result = await _service.UpdateProduct(id,dto); 
                if (result == null)
                {
                    resposne.ErrorMessage = "Product not found.";
                    resposne.Success = false;
                    resposne.Data = new List<ProductViewModel>();
                }
                else
                {
                    resposne.Message = "product updated successfully.";
                    resposne.Success = true;
                    resposne.Data = result;
                }
            }
            catch (Exception ex)
            {

                if (ex == null)
                {
                    resposne.ErrorMessage = "Product not updated." + ex;
                    resposne.Data = new List<ProductViewModel>();
                    resposne.Success = false;
                }
            }
            return resposne;
            
        }

        [HttpPost]
        public async Task<ApiResponseModel> DeleteProduct(int id)
        {
            var resposne = new ApiResponseModel();
            try
            {
                var result = await _service.DeleteProduct(id);
                if (!result)
                {
                    resposne.ErrorMessage = "Product not found.";
                    resposne.Success = false;
                }
                else
                {
                    resposne.Message = "Product deleted successfully.";
                    resposne.Success = true;
                }
            }
            catch (Exception ex)
            {

                if (ex == null)
                {
                    resposne.ErrorMessage = "Product not deleted." + ex;
                    resposne.Data = new List<ProductViewModel>();
                    resposne.Success = false;
                }
            }
            return resposne;
        }
    }
}
