import axios from "axios";


import appConfig from "../Utils/Config";
import ProductCategory from "../Models/ProductCategory";
import Product from "../Models/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../Redux/productSlice";



class ProductsService {
 
  public async getAllProductsCategory(): Promise<ProductCategory[]> {
   
      const response = await axios.get<ProductCategory[]>(appConfig.allCategories);
      const categories = response.data;
      return categories;

  }

  public async getProductsByCategoryId(categoryId:number): Promise<Product[]> {
    // if (!store.getState().productsState.productsByCategory[categoryId]) {
       const response = await axios.get<Product[]>(appConfig.productsByCategory+categoryId);
       const products = response.data;
    //   store.dispatch(fetchProductsByCategoriesAction(categoryId,products));
      return products;
    // }
    // return store.getState().productsState.productsByCategory[categoryId];
    return undefined;
  }

}

const productsService = new ProductsService();
export default productsService;