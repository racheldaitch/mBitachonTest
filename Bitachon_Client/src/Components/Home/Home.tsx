import { useEffect, useState } from "react";
import productService from "../../Services/productsService";
import { Autocomplete, Card, TextField, IconButton, Box, Button, CardContent, Stack, Typography } from "@mui/material";
import "./Home.css";
import ProductCategory from "../../Models/ProductCategory";
import Product from "../../Models/Product";
import { Add, Category, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchProductByCategoryId, fetchProductCategories } from "../../Redux/productSlice";
import ChartItem from "../../Models/ChartItem";
import { useNavigate } from "react-router-dom";

function Home(): JSX.Element {
  const navigate = useNavigate();
  const productState = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  const min = 1;
  const max = 10;
  const defaultValue = 1;
  const [categories, setCategories] = useState<ProductCategory[]>();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(defaultValue);
  const [cart, setCart] = useState<ChartItem[]>([]);

  const handleChange = (value: number) => {
    if (value >= min && value <= max) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const existingProductIndex = cart.findIndex((item) => item.id === selectedProduct.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += quantity;
        setCart(updatedCart);
      } else {
        setCart([...cart, {
          ...selectedProduct, quantity: quantity,
          category: selectedCategory.name
        }]);
      }
    }
  };
  const goToMyOrder = () => {
    dispatch(fetchCart({cartItems:cart}));
    navigate('/cart');
  };

  // סידור המוצרים לפי קטגוריות
  const groupedByCategory = cart.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, { id: number; name: string; category: string; quantity: number }[]>);

  let couponId: number;
  useEffect(() => {
    if (selectedCategory) {
      if (!productState.productsByCategory[selectedCategory.id]) {
        (async () => {
          productService.getProductsByCategoryId(selectedCategory.id).then((arr) => {
            setProducts(arr);
            dispatch(fetchProductByCategoryId({ categoryId: selectedCategory.id, products: arr }));
          });
        })();
      }
      else {
        setProducts(productState.productsByCategory[selectedCategory.id])
      }
    } else {
      setProducts([]); // אם אין קטגוריה נבחרת, ננקה את הרשימה
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (productState.productCategories.length === 0) {
      (async () => {

        productService.getAllProductsCategory().then((arr) => {
          setCategories(arr);
          dispatch(fetchProductCategories({ categories: categories }));
        },);

      })();
    }
    else {
      setCategories(productState.productCategories);
    }
  }, []);
  const isCartFull = cart.length > 0;
  return (

    <div className="Home">
      <Card sx={{ padding: 2, width: 500 }}>
        <CardContent>
          <Stack spacing={2}>
            <Autocomplete className="Autocomplete"
              options={categories}
              getOptionLabel={(option) => option.name} // מציג רק את ה-value
              value={selectedCategory}
              onChange={(event, newValue) => { setSelectedProduct(undefined); setSelectedCategory(newValue) }}
              renderInput={(params) => <TextField {...params} label="בחר קטגוריה" />}
            />


            <Autocomplete className="Autocomplete"
              options={products}
              getOptionLabel={(option) => option.name} // מציג רק את ה-value
              value={selectedProduct}
              onChange={(event, newValue) => { setQuantity(1); setSelectedProduct(newValue) }}
              renderInput={(params) => <TextField {...params} label="בחר מוצר" />}
            />

            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
              <IconButton onClick={() => handleChange(quantity - 1)} disabled={quantity <= min}>
                <Remove />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => handleChange(Number(e.target.value))}
                inputProps={{ min, max, style: { textAlign: "center" } }}
                size="small"
                sx={{ width: 60, textAlign: "center" }}
              />
              <IconButton onClick={() => handleChange(quantity + 1)} disabled={quantity >= max}>
                <Add />
              </IconButton>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedProduct}
                onClick={handleAddToCart}
              >
                הוסף לסל
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h5">המוצרים בסל</Typography>
          {Object.keys(groupedByCategory).length > 0 ? (
            Object.entries(groupedByCategory).map(([category, items]) => (
              <Box key={category} mt={2}>
                <Typography variant="h6">{category}</Typography>
                <Stack spacing={2}>
                  {items.map((item) => (
                    <Box key={item.id} >
                      <Typography>{item.name}</Typography>

                      <Typography sx={{ padding: "0 8px" }}>{item.quantity}</Typography>

                    </Box>
                  ))}
                </Stack>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">הסל ריק</Typography>
          )}
        </CardContent>
      </Card>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={goToMyOrder}
          disabled={!isCartFull} // כפתור רק אם הסל מלא
        >
          המשך להזמנה
        </Button>
      </Box>
    </div>
  );
}

export default Home;
