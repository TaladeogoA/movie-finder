import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <Nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  height: 3rem;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
    z-index: 100;

  .logo {
    img {
      width: 120px;
    }
  }

  .links {
    a {
      margin-left: 2rem;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
    }
  }
`;
