using bitachon_server.BL.Interface;
using bitachon_server.DAL;
using bitachon_server.DAL.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bitachon_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        IProductsBL ProductsBL;
        private readonly ILogger<ProductController> _logger;
        public ProductController(IProductsBL _ProductsBL, ILogger<ProductController> logger)
        {
            this.ProductsBL = _ProductsBL;
            _logger = logger;
        }

          

        [HttpGet("categories",Name = "GetAllCategories")]
        //[Route("/GetAllCategories")]
        public IEnumerable<ProductsCategory> GetAllCategories()
            {
                return this.ProductsBL.GetAllProductsCategories();
            }


        [HttpGet("products", Name = "GetProductsByCategory")]
        public IEnumerable<Product> GetProductsByCategory(int categoryId)
        {
            return this.ProductsBL.GetProductsByCategory(categoryId);
        }
    }
}