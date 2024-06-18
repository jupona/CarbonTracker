import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  height: calc(100vh - var(--nav-height) -1rem);

  .accueil-container {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    padding: 3rem 0;

    @media (min-width: 992px) {
      width: 85vw;
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 2rem;
    }

    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .card-total {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 1px solid grey;
        box-shadow: var(--light-shadow);
        transition: var(--transition);
        gap: 1rem;

        .title {
          .title-main {
            font-size: 1.5rem;
            font-weight: 400;
            text-transform: capitalize;
          }

          .title-description {
            font-size: 0.75rem;
            font-weight: 300;
            text-transform: capitalize;
            color: grey;
            font-style: italic;
          }
        }

        .number {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          text-align: center;
          font-size: 3rem;
        }

        .btn-total {
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          background-color: #beb2fe;

          &:hover {
            transform: scale(1.05);
          }
        }
      }

      .card-emission {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 1px solid grey;
        box-shadow: var(--light-shadow);
        transition: var(--transition);
        gap: 1rem;

        .title {
          .title-main {
            font-size: 1.5rem;
            font-weight: 400;
            text-transform: capitalize;
          }

          .title-description {
            font-size: 0.75rem;
            font-weight: 300;
            text-transform: capitalize;
            color: grey;
            font-style: italic;
          }
        }

        .number {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          text-align: center;
          font-size: 3rem;
        }

        .progress-bar {
          width: 100%;
          height: 1.25rem;
          border-radius: 0.75rem;
          -webkit-appearance: none;
          appearance: none;

          &::-webkit-progress-bar {
            background-color: #eff0f3;
            border-radius: 0.5rem;
          }

          &::-webkit-progress-value {
            background-color: #beb2fe;
            border-radius: 0.5rem;
          }
        }

        .progress-value {
          text-align: left;
          font-size: 0.75rem;
          font-weight: 300;
          text-transform: capitalize;
          color: grey;
          font-style: italic;
        }
      }
    }

    .right-panel {
      width: 100%;
      .chart {
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid grey;
        width: 100%;

        .chart-title {
          font-size: 1.5rem;
          font-weight: 400;
          text-transform: capitalize;
        }

        .chart-description {
          font-size: 0.75rem;
          font-weight: 300;
          text-transform: capitalize;
          color: grey;
          font-style: italic;
        }
      }
    }
  }
`;

export default Wrapper;
