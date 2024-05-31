import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SmallSidebar } from "../components";
import Wrapper from "../assets/wrappers/Layout";
import { createContext, useState, useContext } from "react";

const HomeContext = createContext();

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    showSidebar
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  return (
    <HomeContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="home">
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="home-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Layout;
