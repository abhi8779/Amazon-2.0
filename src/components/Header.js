import "./Header.css";
import { auth } from "../firebaseSetup";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useStore } from "../store/store-context-provider";

const Header = () => {
  const [{ totalCartItem, user }] = useStore();

  const authenticationHandler = () => {
    if (user) {
      auth.signOut();
    }
  };

  const userName = user?.email.split("@")[0];

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={authenticationHandler} className="header__nav__option">
            <span className="header__optionLineOne">
              Hello {user ? userName : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__nav__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__nav__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout" className="header__optionBasket">
          <AddShoppingCartIcon className="" />
          <span className="header__optionLineTwo header_basketCount">
            {totalCartItem}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
