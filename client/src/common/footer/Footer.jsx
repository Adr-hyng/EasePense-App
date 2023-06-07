import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>EasePense</h1>
            <p>YConnect with ease, browse with joy, and transact effortlessly. Whether you're a shopper or a store owner, our user-friendly platform simplifies the process. </p>
            
          </div>

          <div className='box'>
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Contact Us</h2>
            <ul>
              <li>Arteche Blvd, Catbalogan City, 6700 Samar</li>
              <li>Email: adrian.abaigar@ssu.edu.ph</li>
              <li>Phone: +63 969 258 5985</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
