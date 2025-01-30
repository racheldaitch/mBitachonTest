namespace bitachon_server.DAL
{
    public class ProductsCategory   
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }

    }

}
