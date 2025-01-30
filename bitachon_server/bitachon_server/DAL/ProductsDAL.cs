using bitachon_server.DAL.Interface;

namespace bitachon_server.DAL
{
    public class ProductsDAL: IProductsDAL
    {
        AppDbContext context;
        public ProductsDAL(AppDbContext _context)
        {
            this.context = _context;   
        }
        public List<ProductsCategory> GetAllProductsCategories()
        {
            List<ProductsCategory> categories;
            using (context)
            {
                 categories = context.Categories.ToList(); // שליפת כל המוצרים
            }


            return categories;
        }

        public List<Product> GetProductsByCategory(int categoryId)
        {
            List<Product> products;
            using (context)
            {
                products = context.Products.Where(p=>p.CategoryId == categoryId).ToList(); // שליפת כל המוצרים
            }


            return products;
        }


    }
}
