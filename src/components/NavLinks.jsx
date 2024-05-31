import { NavLink } from "react-router-dom";
import { links } from "../utils/links";

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
