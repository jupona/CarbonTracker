import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    top: calc(3.5rem + 0.5rem);
    transform: translateX(-100%);
    transition: var(--transition);
    background-color: white;
    width: 100%;
    height: 100%;

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

      @media (min-width: 768px) {
        width: 90vw;
        margin: 0 auto;
        padding: 1rem 0;
      }

      .nav-link {
        display: flex;
        padding: 1rem 0;
        justify-content: space-between;
        border-bottom: 1px solid grey;
        cursor: pointer;

        span {
          color: black;
          font-size: 1.5rem;
        }

        .nav-link-text {
          color: black;
          font-size: 1.5rem;
          text-transform: capitalize;
        }
      }
    }
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    transform: translateX(0);
  }
`;
export default Wrapper;
