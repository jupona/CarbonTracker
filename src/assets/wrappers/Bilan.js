import styled from "styled-components";

const Wrapper = styled.main`
  width: 90vw;
  margin: 0 auto;
  max-width: var(--max-width);
  padding: 3rem 0;

  @media (min-width: 992px) {
    width: 85vw;
  }

  .bilan-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .left-panel {
    flex: 1;
    margin: 10px;
    max-height: calc(100vh - 172px);
    overflow-y: auto;
    border: 1px solid grey;
    padding: 1rem;
    border-radius: var(--border-radius);
  }

  .right-panel {
    flex: 1;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid grey;
    padding: 1rem;
    border-radius: var(--border-radius);

    h4 {
      margin-bottom: 4rem;
      text-transform: none;
      letter-spacing: normal;
    }
  }

  .bilan-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-family: var(--font-roboto);
  }

  .left-panel::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .bilan-table th,
  .bilan-table td {
    padding: 8px;
  }

  .bilan-table tr {
    border-bottom: 1px solid #ccc;
  }

  .bilan-table thead th {
    text-align: left;
    background-color: #beb2fe;
    opacity: 0.8;
  }

  .bilan-table tr:hover {
    background-color: #f1f1f1;
  }

  .total-emission {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #beb2fe;
    text-align: center;
  }

  .total-emission h3 {
    margin: 0;
    color: #333;
    text-transform: none;
  }

  .total-emission p {
    font-size: 1.2em;
    color: #555;
  }

  .right-panel h3 {
    margin-bottom: 20px;
    color: #333;
  }

  .responsive-container {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 768px) {
    .bilan-wrapper {
      flex-direction: column;
    }

    .left-panel,
    .right-panel {
      margin: 0;
      width: 100%;
    }

    .responsive-container {
      height: 300px;
    }
  }

  .loading-screen {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;

    .loading-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;
export default Wrapper;
