class Config {

}

class DevelopmentConfig {
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public authUrl = "http://localhost:8080/auth/login";
    public allCoupons = "http://localhost:8080/allCoupons";
    public allCategories = "http://localhost:5000/api/Product/categories";
    public productsByCategory = "http://localhost:5000/api/Product/products?categoryId=";
    public createOrder = "http://localhost:8000/api/orders";
    public addOrderItems = "http://localhost:8000/api/ordersItems/";
}

class ProductionConfig {
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public authUrl = "http://localhost:8080/auth/login";
    public allCoupons = "http://localhost:8080/allCoupons";
    public allCategories = "http://localhost:5000/api/Product/categories";
    public productsByCategory = "http://localhost:5000/api/Product/products?categoryId=";
    public createOrder = "http://localhost:8000/api/orders";
    public addOrderItems = "http://localhost:8000/api/ordersItems/";
    
}

const appConfig = process.env.NODE_ENV === "development"
    ? new DevelopmentConfig() : new ProductionConfig();
export default appConfig;