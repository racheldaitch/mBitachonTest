using bitachon_server.DAL;

namespace bitachon_server.BL.Interface
{
    public interface IProductsBL
    {
        List<ProductsCategory> GetAllProductsCategories();
        List<Product> GetProductsByCategory(int categoryId);
    }
}
