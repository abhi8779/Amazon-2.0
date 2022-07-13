import "./Home.css";
import Product from "./Product";
const Home = () => {
  return (
    <section className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="product__row">
          <Product
            id="p1"
            title="boAt Airdopes 141 42H Playtime, Beast Mode ENx Tech, ASAP Charge, IWP, IPX4 Water Resistance, "
            price="20.99"
            rating={4}
            image="https://m.media-amazon.com/images/I/51HBom8xz7L._SL1500_.jpg"
            quantity={1}
          />
          <Product
            id="p2"
            title="Apple iPhone 13 (128GB) - Starlight (Inclusive of all taxes
EMI starts at ₹3,389. "
            price="700.99"
            rating={4}
            image="https://m.media-amazon.com/images/I/71GLMJ7TQiL._SL1500_.jpg"
            quantity={1}
          />
        </div>
        <div className="product__row">
          <Product
            id="p3"
            title="BenQ Zowie XL2546 24.5 inch 240 Hz Esports Gaming Monitor, 1ms, Full HD 1080p, 320 Nits, Height Adjustable, "
            price="200.99"
            rating={4}
            image="https://m.media-amazon.com/images/I/51j3FWbh21L._SL1000_.jpg"
            quantity={1}
          />
          <Product
            id="p4"
            title="LG Full HD 55 cm (22 inches) Gaming Monitor - 1ms, 75Hz, Full HD, AMD Freesync, VA Panel Monitor, s"
            price="190.99"
            rating={4}
            image="https://m.media-amazon.com/images/I/81aJZQk3+PL._SL1500_.jpg"
            quantity={1}
          />
          <Product
            id="p5"
            title="BenQ Zowie XL2546 24.5 inch 240 Hz Esports Gaming Monitor, 1ms, Full HD 1080p, 320 Nits, Height Adjustable,"
            price="200.99"
            rating={4}
            image="https://m.media-amazon.com/images/I/51j3FWbh21L._SL1000_.jpg"
            quantity={1}
          />
        </div>
        <div className="product__row">
          <Product
            id="p6"
            title="
LG 87 cm (34 Inches) UltraWide Full HD (2560 x 1080) Display - HDR 10, AMD Free sync, IPS with sRGB 95%, Multitasking,."
            price="2020.99"
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            quantity={1}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
