import { createSlice } from '@reduxjs/toolkit'
import ProductCategory from '../Models/ProductCategory';
import Product from '../Models/Product';
import ChartItem from '../Models/ChartItem';

export interface ProductState {
 productCategories: ProductCategory[] ;
 productsByCategory:Record<number, Product[]>;
 cart:ChartItem[];
}
const initialState: ProductState = {
    productCategories: [],
    productsByCategory: [],
    cart: []
}



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductCategories:(state, actions) => {
state.productCategories = actions.payload.categories;
    },
    fetchProductByCategoryId:(state, actions) => {
        state.productsByCategory[actions.payload.categoryId] = actions.payload.products;
            },
fetchCart:(state, actions) => {
    state.cart= actions.payload.cartItems;
        },
   
  },
})

// Action creators are generated for each case reducer function
export const { fetchProductCategories ,fetchProductByCategoryId,fetchCart} = productSlice.actions

export default productSlice.reducer













// import Product from "../Models/Product";
// import ProductCategory from "../Models/ProductCategory";

// export class ProductsState {
//     public productCategories: ProductCategory[] = [];
//     public myproductCategories: ProductCategory[] = [];
//     public myProducts:Product[]=[];
//     public allProducts:Product[]=[];
//     public productsByCategory:Record<number, Product[]>=[];
// }



// // 3. Action - an interface describing a single command
// export interface ProductsAction {
//     type: ProductActionType; // action type
//     payload: any; // action data
//     categoryId?:number
// }



// export function fetchProductCategoriesAction(categories: ProductCategory[]): ProductsAction {
//     return { type: ProductActionType.FetchProductsCategory, payload: categories };
// }

// export function fetchProductsByCategoriesAction(categoryId:number, products: Product[]): ProductsAction {
//     return { type: ProductActionType.FetchProducts, payload: products, categoryId:categoryId};
// }

// // 5. reducer - a single function performing any of the above actions

// export function productReducer(currentState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState {
//     const newState = { ...currentState }; // duplicate current state

//     switch (action.type) {
//         case ProductActionType.FetchProductsCategory: // here payload is all coupons
//             newState.productCategories = action.payload;
//             break;

//             case ProductActionType.FetchProducts: // here payload is all coupons
//             newState.productsByCategory[action.categoryId] = action.payload;
//             break;
      
//     }

//     return newState;
// }

