import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Electricite";
import { saveAs } from "file-saver";

const Electricite = () => {
  const [hydroQuebec, setHydroQuebec] = useState({
    caracterisation: "",
    conso: "",
    facteur: 1.7,
    emission: 0.0,
  });

  const [pertesLigne, setPertesLigne] = useState({
    conso: 0,
    facteur: 1.7,
    taux: 3.1,
    emission: 0.0,
  });

  useEffect(() => {
    const conso = parseFloat(hydroQuebec.conso) || 0;
    const emission =
      (conso * pertesLigne.facteur * pertesLigne.taux) / 100 / 1000000;
    setPertesLigne((prev) => ({
      ...prev,
      conso,
      emission: emission.toFixed(2),
    }));
  }, [hydroQuebec.conso, pertesLigne.facteur, pertesLigne.taux]);

  const handleHydroQuebecChange = (e) => {
    const { name, value } = e.target;
    setHydroQuebec((prev) => ({
      ...prev,
      [name]: value,
      emission:
        name === "conso" || name === "facteur"
          ? ((value * prev.facteur) / 1000000).toFixed(2)
          : prev.emission,
    }));
  };

  const handleSave = () => {
    const data = {
      hydroQuebec,
      pertesLigne,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "electricite_data.json");
  };

  return (
    <Wrapper>
      <div className="section">
        <h2>Hydro-Quebec producteur mensualisé</h2>
        <table>
          <thead>
            <tr>
              <th>Consommations mensuelles</th>
              <th>Caractérisation du matériel</th>
              <th>Conso (kWh)</th>
              <th>gCO2e/kWh</th>
              <th>t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hydro-Quebec</td>
              <td>
                <input
                  type="text"
                  name="caracterisation"
                  value={hydroQuebec.caracterisation}
                  onChange={handleHydroQuebecChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="conso"
                  value={hydroQuebec.conso}
                  onChange={handleHydroQuebecChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="facteur"
                  value={hydroQuebec.facteur}
                  onChange={handleHydroQuebecChange}
                />
              </td>
              <td>{hydroQuebec.emission}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Pertes en ligne de l'électricité</h2>
        <table>
          <thead>
            <tr>
              <th>Consommation</th>
              <th>Rappel Conso (kWh)</th>
              <th>Rappel g CO2e/kWh</th>
              <th>Taux de déperdition</th>
              <th>t CO2e</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pertes en ligne</td>
              <td>{pertesLigne.conso}</td>
              <td>{pertesLigne.facteur}</td>
              <td>{pertesLigne.taux}%</td>
              <td>{pertesLigne.emission}</td>
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

export default Electricite;
