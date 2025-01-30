import axios from "axios";


import appConfig from "../Utils/Config";
import ProductCategory from "../Models/ProductCategory";
import Product from "../Models/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../Redux/productSlice";



class OrdersService {
 
  public async createOrder (userData:any) {
    try {
      const response =await axios.post<any,any>(appConfig.createOrder,userData);
      return response.data.orderId; 
    } catch (error) {
      console.error("שגיאה ביצירת הזמנה:", error);
    }
  };
  public async addOrderItems (orderId:any, products:any) {
    try {
      const response = await axios.post<any,any>(appConfig.addOrderItems + orderId,products);
      return response; 
    } catch (error) {
      console.error("שגיאה בהוספת מוצרים להזמנה:", error);
    }
  };
  
}

const ordersService = new OrdersService();
export default ordersService;