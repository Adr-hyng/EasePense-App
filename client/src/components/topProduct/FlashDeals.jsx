import React from "react"
import FlashCard from "./FlashCard"
import "./style.css"

const FlashDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className="flash">
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h1>Top Purchased</h1>
          </div>
          {[0, 1, 2].includes(productItems.length) ? (
            <h2 style={{ fontSize: "2rem", textAlign: "center", marginTop: "2rem" }}>
              Empty
            </h2>
          ) : (
            <FlashCard productItems={productItems} addToCart={addToCart} />
          )}
        </div>
      </section>
    </>
  );
};


export default FlashDeals
