// import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Deboisement";
// import { saveAs } from "file-saver";
import { useState, useContext } from "react";
import { carbonContract} from "../abis/contractAddress.json";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from '../context/walletContext';
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

const Deboisement = () => {
  const [superficie, setSuperficie] = useState("");
  const [superficieSequestration, setSuperficieSequestration] = useState("");
  const { walletAddress} = useContext(WalletContext);

  const perteStocksCarbone = {
    tMSh: 62.9,
    Tx: 0.39,
    CC: 0.47,
  };

  const perteSequestration = {
    CBA: 1.1,
    Tx: 0.39,
    CC: 0.47,
  };

  const totalCO2eStocksCarbone = (
    superficie *
    perteStocksCarbone.tMSh *
    (1 + perteStocksCarbone.Tx) *
    perteStocksCarbone.CC *
    (44 / 12)
  ).toFixed(2);

  const totalCO2eSequestration = (
    superficieSequestration *
    perteSequestration.CBA *
    (1 + perteSequestration.Tx) *
    perteSequestration.CC *
    (44 / 12) *
    100
  ).toFixed(2);

  // const handleSave = (data, filename) => {
  //   const json = JSON.stringify(data, null, 2);
  //   const blob = new Blob([json], { type: "application/json" });
  //   saveAs(blob, filename);
  // };
  let totalCO2eStocksCarboneInt = Math.floor(totalCO2eStocksCarbone * 100) 
  let totalCO2eSequestrationInt = Math.floor(totalCO2eSequestration * 100)
  const addtotalCO2eStocksCarboneInt = async (totalCO2eStocksCarboneInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addPerteStocks(totalCO2eStocksCarboneInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  };
  const addtotalCO2eSequestrationInt = async (totalCO2eSequestrationInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addPerteSequestration(totalCO2eSequestrationInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  }

  return (
    <Wrapper>
      <div className="section">
        <h2>Perte de stocks de carbone</h2>
        <table>
          <thead>
            <tr>
              <th>Superficie de déboisement</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>tMSh</th>
              <th>Tx</th>
              <th>CC</th>
              <th>total t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Forêt Boréal (conifères)</td>
              <td>Hectars</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={superficie}
                  onChange={(e) => setSuperficie(e.target.value)}
                />
              </td>
              <td>{perteStocksCarbone.tMSh}</td>
              <td>{perteStocksCarbone.Tx}</td>
              <td>{perteStocksCarbone.CC}</td>
              <td>{totalCO2eStocksCarbone}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addtotalCO2eStocksCarboneInt(totalCO2eStocksCarboneInt)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Perte de capacité de séquestration sur 100 ans</h2>
        <table>
          <thead>
            <tr>
              <th>Superficie de déboisement</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>CBA</th>
              <th>Tx</th>
              <th>CC</th>
              <th>total t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Forêt Boréal (conifères)</td>
              <td>Hectars</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={superficieSequestration}
                  onChange={(e) => setSuperficieSequestration(e.target.value)}
                />
              </td>
              <td>{perteSequestration.CBA}</td>
              <td>{perteSequestration.Tx}</td>
              <td>{perteSequestration.CC}</td>
              <td>{totalCO2eSequestration}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addtotalCO2eSequestrationInt(totalCO2eSequestrationInt)
          }
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Deboisement;
