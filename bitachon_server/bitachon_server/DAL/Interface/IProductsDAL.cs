namespace bitachon_server.DAL.Interface
{
    public interface IProductsDAL
    {
        List<ProductsCategory> GetAllProductsCategories();
        List<Product> GetProductsByCategory(int categoryId);
    }
}
