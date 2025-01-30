namespace bitachon_server.DAL
{
    public class Product
    {
        public int Id { get; set; } // מפתח ראשי
        public string Name { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public ProductsCategory ProductsCategory { get; set; } // ניווט

    }
}
