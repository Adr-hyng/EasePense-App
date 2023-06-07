import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Convenient",
      decs: "Enjoy ease and efficiency in your macro-store operations",
    },
    {
      cover: <i class='fas fa-sync-alt'></i>,
      title: "Seamless",
      decs: "Streamline your macro-store operations effortlessly",
    },
    {
      cover: <i class='fas fa-tachometer-alt'></i>,
      title: "Efficient",
      decs: "Enhance the efficiency of your macro-store",
    },
    {
      cover: <i class='fas fa-chart-line'></i>,
      title: "Profitable",
      decs: "Drive profitability in your macro-store",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
