import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer__top">
        <p> Back to top </p>
      </div>
      <div className="footer__bottom">
        <div className="para">
          <ul>
            <p>Make Money with Us</p>
            <li>
              <Link to="/login">Sell products on Amazon</Link>
            </li>
            <li>
              <Link to="/login">Sell on Amazon Business</Link>
            </li>
            <li>
              <Link to="/login">Advertise Your Products</Link>
            </li>
            <li>
              <Link to="/login">See More Make Money with Us</Link>
            </li>
            <li>
              <Link to="/login">Host an Amazon Hub</Link>
            </li>
            <li>
              <Link to="/login">Become an Affiliate</Link>
            </li>
            <li>
              <Link to="/login">Self-Publish with Us</Link>
            </li>
          </ul>
        </div>
        <div className="para">
          <ul>
            <p>Amazon Payment Products</p>
            <li>
              <Link to="/login">Amazon Business Card</Link>
            </li>
            <li>
              <Link to="/login">Amazon Currency Converter</Link>
            </li>
            <li>
              <Link to="/login">Shop with Points</Link>
            </li>
            <li>
              <Link to="/login">Reload Your Balance</Link>
            </li>
          </ul>
        </div>
        <div className="para">
          <ul>
            <p>Amazon Payment Products</p>
            <li>
              <Link to="/login">Amazon and COVID-19</Link>
            </li>
            <li>
              <Link to="/login">Your Account</Link>
            </li>
            <li>
              <Link to="/login">Your Orders</Link>
            </li>
            <li>
              <Link to="/login">Shipping Rates & Policies</Link>
            </li>
            <li>
              <Link to="/login">Returns & Replacements</Link>
            </li>
            <li>
              <Link to="/login">Manage Your Content and Devices</Link>
            </li>
            <li>
              <Link to="/login">Amazon Assistant</Link>
            </li>
            <li>
              <Link to="/login">help</Link>
            </li>
          </ul>
        </div>
      </div>
      <div id="footer__end" classname="footer__end">
        <h4>
          ⚠️ Please Note This Is Just A amazon clone made for Educational
          Purposes. ⚠️
        </h4>
        <p>
          © Abhishek Bhandari. Copyright @107 & 2022. Any illegal reproduction
          of this content will result in immediate legal action. This website
          features materials protected by the Fair Use guidelines of Section 107
          of the Copyright Act. All rights reserved to the copyright owners AB_
        </p>

        <big>Amazon CLone 2.0</big>
      </div>
    </footer>
  );
};

export default Footer;
