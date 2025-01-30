import { Route, Routes } from "react-router-dom";


import PageNotFound from "../PageNotFound/PageNotFound";

import "./Routing.css";
import Cart from "../../Cart/Cart";
import Home from "../../Home/Home";


function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
              
                <Route path="/cart" element={<Cart />} />



                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
