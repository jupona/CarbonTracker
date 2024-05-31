import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Deboisement";
import { saveAs } from "file-saver";

const Deboisement = () => {
  const [superficie, setSuperficie] = useState("");
  const [superficieSequestration, setSuperficieSequestration] = useState("");

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

  const handleSave = () => {
    const data = {
      perteStocksCarbone: {
        superficie,
        totalCO2e: totalCO2eStocksCarbone,
      },
      perteSequestration: {
        superficieSequestration,
        totalCO2e: totalCO2eSequestration,
      },
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "deboisement_data.json");
  };

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
      </div>

      <div className="section">
        <button onClick={handleSave}>Enregistrer</button>
      </div>
    </Wrapper>
  );
};

export default Deboisement;
