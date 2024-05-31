import styled from "styled-components";

const Wrapper = styled.main`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;

  h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: #fff;
  }

  th {
    background-color: #6c7ae0;
    color: white;
    padding: 10px;
    text-align: left;
    font-weight: bold;
  }

  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .total-row {
    background-color: #ddd;
    font-weight: bold;
  }

  .total-td {
    padding: 10px;
    text-align: left;
  }

  .section {
    margin-bottom: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  button {
    display: block;
    width: 200px;
    margin: 0 auto;
    padding: 10px;
    background-color: #6c7ae0;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #5a69c7;
  }
`;

export default Wrapper;
