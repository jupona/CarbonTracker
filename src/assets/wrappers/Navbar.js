import styled from "styled-components";

const Wrapper = styled.nav`
  background-color: white;
  min-height: var(--nav-height);
  border-bottom: 1px solid grey;

  /* @media (min-width: 768px) {
    border-bottom: none;
  }

  @media (min-width: 992px) {
    border-bottom: none;
    min-height: 4rem;
  } */

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 1rem 0;
    width: 90vw;
    max-width: var(--max-width);

    @media (min-width: 768px) {
      border-bottom: 2px solid grey;
    }

    @media (min-width: 992px) {
      border-bottom: 2px solid grey;
      padding: 2rem 0;
      width: 85vw;
    }

    :where(.navbar > *) {
      display: inline-flex;
      align-items: center;
    }

    .navbar-start {
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: lowercase;
        color: black;
        margin-left: 1rem;
        display: none;

        @media (min-width: 768px) {
          display: block;
        }

        @media (min-width: 992px) {
          margin-left: 0;
        }
      }

      .menu-icon {
        cursor: pointer;
        @media (min-width: 992px) {
          display: none;
        }
      }
    }

    .navbar-center {
      p {
        color: black;
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: lowercase;

        @media (min-width: 768px) {
          display: none;
        }
      }

      .nav-link {
        color: black;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-weight: 400;
      }

      ul {
        display: none;

        @media (min-width: 992px) {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
      }
    }

    .navbar-end {
      position: relative;
      .cart-icon {
        cursor: pointer;
      }
    }
  }
`;

export default Wrapper;
