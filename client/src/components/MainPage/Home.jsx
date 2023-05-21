import React, { useContext } from "react"
import Categories from "./Categories"
import VisibilityContext from "../../VisibilityContext";
import "./Home.css"
import SliderHome from "./Slider"

const Home = () => {
  const { categoriesVisible } = useContext(VisibilityContext);
  return (
    <>
      <section className="home">
        <div
          className={`container d_flex ${
            !categoriesVisible ? "slider-centered" : ""
          }`}
        >
          <div className="banner_content">
            {categoriesVisible && <Categories />}
          </div>
          <SliderHome />
        </div>
      </section>
    </>
  );
};


export default Home
