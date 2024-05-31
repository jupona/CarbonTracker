import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  height: calc(100vh - var(--nav-height) -1rem);

  .accueil-container {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    padding-top: 1rem;

    @media (min-width: 992px) {
      width: 85vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 3rem;
    }

    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .card-total {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 1px solid black;
        box-shadow: var(--light-shadow);
        transition: var(--transition);

        .title {
          font-size: 1.25rem;
          font-weight: 400;
          color: red;
          text-transform: uppercase;
        }

        .number {
          background-color: orange;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          text-align: center;
          width: 8rem;
        }
      }

      .card-emission {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius);
        border: 1px solid black;
        box-shadow: var(--light-shadow);
        transition: var(--transition);

        .title {
        }
      }
    }
  }
`;

export default Wrapper;
