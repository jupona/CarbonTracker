import { Outlet, NavLink } from "react-router-dom";
import { calculLinks } from "../utils/links";
import Wrapper from "../assets/wrappers/Calcul";

const Calcul = () => {
  return (
    <Wrapper>
      <div className="calcul-container">
        <nav className="navbar">
          <ul className="navbar-links">
            {calculLinks.map((link) => {
              return (
                <li key={link.id} className="navlink">
                  <NavLink to={link.url} className="navlink-text">
                    {link.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Calcul;
