import React from "react"
import "./style.css"

const Cart = ({ CartItem, addToCart, decreaseQty, removeFromCart }) => {
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);
  
  const updateProductStocks = async () => {
    try {
      const response = await fetch("/api/updateProductStocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CartItem),
      });

      if (response.ok) {
        CartItem.forEach((item) => removeFromCart(item, true));
        await fetch("/api/updateTotalPrice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalPrice: totalPrice }),
        });
      } else {
        console.error("Failed to clear cart and update database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}
            Php             
            {CartItem.map((item) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      ₱{item.price} x {item.qty}
                        <span>₱{productQty}</span>
                      </div>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart' onClick={ () => removeFromCart(item)}>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div className={`cart-total product${CartItem.length === 0 ? " cart-total-empty" : ""}`}>
            <h2>Cart Summary</h2>
            <div className={`cart-total-content${CartItem.length === 0 ? " cart-total-content-empty" : ""}`}>
              <div className='cart-summary-row'>
                <div className='d_flex'>
                  <h4>Total Price :</h4>
                  <h3>₱{totalPrice}.00</h3>
                </div>
              </div>
              {CartItem.length > 0 && (
                <div className="clear-cart-container" style={{ textAlign: "center" }}>
                  <button
                    className="clear-cart-btn"
                    style={{
                      backgroundColor: "#e94560",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={updateProductStocks}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Cart
