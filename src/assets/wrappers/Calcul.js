import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  height: calc(100vh - var(--nav-height) -1rem);

  .calcul-container {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    padding-top: 1rem;
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      width: 85vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 3rem;
    }

    .navbar {
      .navbar-links {
        display: flex;
        gap: 0.25rem;

        .navlink {
          font-size: 0.825rem;
          font-weight: 400;
          width: 8rem;
          text-transform: uppercase;
          text-decoration: none;
          transition: var(--transition);
          text-decoration: none;
          text-align: center;

          .navlink-text {
            color: black;
          }
        }
      }
    }
  }
`;

export default Wrapper;
