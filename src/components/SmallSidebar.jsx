import Wrapper from "../assets/wrappers/SmallSidebar";
import { NavLink } from "react-router-dom";
import { useHomeContext } from "../pages/Layout";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useHomeContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="nav-links">
          <NavLink to="/" className="nav-link" onClick={toggleSidebar}>
            <p className="nav-link-text">accueil</p>
            <span>{">"}</span>
          </NavLink>
          <NavLink to="/calcul" className="nav-link" onClick={toggleSidebar}>
            <p className="nav-link-text">calcul</p>
            <span>{">"}</span>
          </NavLink>
          <NavLink to="/bilan" className="nav-link" onClick={toggleSidebar}>
            <p className="nav-link-text">bilan</p>
            <span>{">"}</span>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
