import { useSelector } from "react-redux";
import "./Cart.css";
import { useEffect, useState } from "react";
import ChartItem from "../../Models/ChartItem";
import { Button, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import ordersService from "../../Services/ordersService";
import notificationService from "../../Services/NotificationService";

function Cart(): JSX.Element {
 const productState = useSelector((state: any) => state.product);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const validateForm = () => {
    const newErrors = { firstName: '', lastName: '', address: '', email: '' };
    let valid = true;

    if (!firstName) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה';
      valid = false;
    }
    if (!lastName) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה';
      valid = false;
    }
    if (!address) {
      newErrors.address = 'כתובת מלאה היא שדה חובה';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'מייל הוא שדה חובה';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'יש להזין מייל תקין';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const [cartProducts, setProducts] = useState<ChartItem[] | null>(productState.cart);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        ordersService.createOrder( {userName:firstName+' '+lastName, userEmail:email, userAddress:address}).then((orderId) => {
           if(orderId)
           {
            ordersService.addOrderItems(orderId,{products:cartProducts}).then((Response)=>{
               if(Response.status==200)
               {
                notificationService.success("הזמנה נקלטה במערכת");
               }
            })
           }
          });
    }
    }
    return (
        <div className="Cart">
            <div>
              <Typography variant="h5" gutterBottom>
        רשימת מוצרים
      </Typography>
      <List>
        {cartProducts.map((product:any) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={`מוצר: ${product.name}`}
              secondary={`קטגוריה: ${product.category} | כמות: ${product.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      </div>
      <div>
             <Typography variant="h5" gutterBottom>
        טופס רישום
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
        
          <TextField
            label="שם פרטי"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="שם משפחה"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="כתובת מלאה"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            label="מייל"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
         <Button type="submit" variant="contained" >
           אשר הזמנה
          </Button>
        </Stack>
      </form>
      </div>
        </div>
    );
}

export default Cart;
