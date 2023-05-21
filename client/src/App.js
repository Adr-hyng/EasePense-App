import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import { VisibilityProvider } from "./VisibilityContext";

function App() {
  const [productItems, setProductItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const fetchShopData = () => {
      fetch("/api/shop")
        .then((res) => res.json())
        .then((data) => {
          const updatedData = data.map((item) => ({
            ...item,
            cover: item.path,
          }));
          setShopItems(updatedData);
        });
    };

    fetchShopData(); // fetch shop data initially
    const intervalId = setInterval(fetchShopData, 5000); // fetch data every 5 seconds
  
    return () => {
      clearInterval(intervalId); // clean up the interval when the component is unmounted
    };
  }, []);


  useEffect(() => {
    const fetchData = () => {
      fetch("/api/top")
        .then((res) => res.json())
        .then((data) => {
          const updatedData = data.map((item) => ({
            ...item,
            cover: item.path,
          }));
          setProductItems(updatedData);
        });
    };
  
    fetchData(); // fetch data initially
    const intervalId = setInterval(fetchData, 5000); // fetch data every 5 seconds
  
    return () => {
      clearInterval(intervalId); // clean up the interval when the component is unmounted
    };
  }, []);
  
  

  const [CartItem, setCartItem] = useState([]);

  const removeFromCart = (product, clearAll = false) => {
    if(clearAll) setCartItem([]);
    else setCartItem(CartItem.filter((item) => item.id !== product.id));
  };
  
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <VisibilityProvider>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
            />
          </Route>
          <Route path="/cart" exact>
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </VisibilityProvider>
  );
}

export default App;
