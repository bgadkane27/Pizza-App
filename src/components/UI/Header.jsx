import { NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="grid header-grid">
          <div className="logo">
            <NavLink to="/">
              <h1>PizzaCut</h1>
            </NavLink>
          </div>
          <nav>
            <ul>
              {/* <li>
                <NavLink to="/">Home</NavLink>
              </li> */}
              <li>
                <NavLink to="/cart"><TiShoppingCart style={{ marginRight: '8px', fontSize: "2.4rem" }}/> Cart</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
