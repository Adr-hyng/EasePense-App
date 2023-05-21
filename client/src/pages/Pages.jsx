import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/topProduct/FlashDeals"
import Shop from "../components/featuredProduct/Shop"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument />
      <Wrapper />
    </>
  )
}

export default Pages
