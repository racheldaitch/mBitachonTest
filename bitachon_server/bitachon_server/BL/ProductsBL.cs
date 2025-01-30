using bitachon_server.BL.Interface;
using bitachon_server.DAL;
using bitachon_server.DAL.Interface;

namespace bitachon_server.BL
{
    public class ProductsBL:IProductsBL
    {
        IProductsDAL productsDAL;
        public ProductsBL(IProductsDAL _productsDAL)
        {
            this.productsDAL = _productsDAL;
        }
        public List<ProductsCategory> GetAllProductsCategories()
        {
            return this.productsDAL.GetAllProductsCategories();
        }

        public List<Product> GetProductsByCategory(int categoryId)
        {
            return this.productsDAL.GetProductsByCategory(categoryId);
        }
    }
}
