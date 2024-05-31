import { Link, NavLink } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/Navbar";
import { useHomeContext } from "../pages/Layout";

const Navbar = () => {
  const { toggleSidebar } = useHomeContext();

  return (
    <Wrapper>
      <div className="navbar">
        <div className="navbar-start">
          {/* MENU */}
          <BsList size={22} className="menu-icon" onClick={toggleSidebar} />
          {/* TITLE */}
          <NavLink to="/" className="title">
            transparensii
          </NavLink>
        </div>
        <div className="navbar-center">
          {/* TITLE tablet/mobile */}
          <Link to="/" className="title">
            <p>transparensii</p>
          </Link>
          {/* NAV LINKS desktop */}
          <ul>
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <FaUser size={22} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
