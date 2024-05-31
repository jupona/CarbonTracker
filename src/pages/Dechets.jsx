import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Dechets";
import { saveAs } from "file-saver";

const Dechets = () => {
  const [quantiteMatiereOrganique, setQuantiteMatiereOrganique] = useState("");
  const [resultMatiereOrganique, setResultMatiereOrganique] = useState({
    co2: 0,
    ch4: 0,
    n2o: 0,
    totalCO2e: 0,
  });
  const [autresRejets, setAutresRejets] = useState({
    quantite: "",
    co2Facteur: "",
    ch4Facteur: "",
    n2oFacteur: "",
    co2: 0,
    ch4: 0,
    n2o: 0,
    totalCO2e: 0,
  });

  const matiereOrganiqueFactors = {
    CH4: 3.54,
    N2O: 0.18,
  };

  const handleMatiereOrganiqueChange = (e) => {
    const { value } = e.target;
    const CH4 = (value * matiereOrganiqueFactors.CH4) / 1000;
    const N2O = (value * matiereOrganiqueFactors.N2O) / 1000;
    const totalCO2e = CH4 * 25 + N2O * 298;

    setQuantiteMatiereOrganique(value);
    setResultMatiereOrganique({
      co2: CH4.toFixed(2),
      ch4: N2O.toFixed(2),
      totalCO2e: totalCO2e.toFixed(2),
    });
  };

  const handleAutresRejetsChange = (e) => {
    const { name, value } = e.target;
    setAutresRejets((prev) => {
      const updatedRejets = { ...prev, [name]: value };
      const co2 = (
        updatedRejets.quantite *
        updatedRejets.co2Facteur *
        0.001
      ).toFixed(2);
      const ch4 = (
        updatedRejets.quantite *
        updatedRejets.ch4Facteur *
        0.001
      ).toFixed(2);
      const n2o = (
        updatedRejets.quantite *
        updatedRejets.n2oFacteur *
        0.001
      ).toFixed(2);
      const totalCO2e = (
        parseFloat(co2) +
        parseFloat(ch4) * 25 +
        parseFloat(n2o) * 298
      ).toFixed(2);
      return { ...updatedRejets, co2, ch4, n2o, totalCO2e };
    });
  };

  const handleSave = (data, filename) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, filename);
  };

  return (
    <Wrapper>
      <div className="section">
        <h2>Matière organique</h2>
        <table>
          <thead>
            <tr>
              <th>Compostage</th>
              <th>Unité</th>
              <th>Quantité de matière organique</th>
              <th>Facteurs kg CH4 / t MRO</th>
              <th>Facteurs kg N2O / t MRO</th>
              <th>CH4 (t)</th>
              <th>N2O (t)</th>
              <th>total t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compostage</td>
              <td>tonnes</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={quantiteMatiereOrganique}
                  onChange={handleMatiereOrganiqueChange}
                />
              </td>
              <td>{matiereOrganiqueFactors.CH4}</td>
              <td>{matiereOrganiqueFactors.N2O}</td>
              <td>{resultMatiereOrganique.co2}</td>
              <td>{resultMatiereOrganique.ch4}</td>
              <td>{resultMatiereOrganique.totalCO2e}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            handleSave(
              {
                quantiteMatiereOrganique,
                resultMatiereOrganique,
              },
              "matiere_organique_data.json"
            )
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Autres rejets</h2>
        <table>
          <thead>
            <tr>
              <th>Autres rejets</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs kg CO2 / t rejet</th>
              <th>Facteurs kg CH4 / t rejet</th>
              <th>Facteurs kg N2O / t rejet</th>
              <th>CO2 (t)</th>
              <th>CH4 (t)</th>
              <th>N2O (t)</th>
              <th>total t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>tonnes</td>
              <td>
                <input
                  type="number"
                  min={0}
                  name="quantite"
                  value={autresRejets.quantite}
                  onChange={handleAutresRejetsChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  name="co2Facteur"
                  value={autresRejets.co2Facteur}
                  onChange={handleAutresRejetsChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  name="ch4Facteur"
                  value={autresRejets.ch4Facteur}
                  onChange={handleAutresRejetsChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  name="n2oFacteur"
                  value={autresRejets.n2oFacteur}
                  onChange={handleAutresRejetsChange}
                />
              </td>
              <td>{autresRejets.co2}</td>
              <td>{autresRejets.ch4}</td>
              <td>{autresRejets.n2o}</td>
              <td>{autresRejets.totalCO2e}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => handleSave(autresRejets, "autres_rejets_data.json")}
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Dechets;
