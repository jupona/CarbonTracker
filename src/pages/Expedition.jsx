import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Expedition";
import { saveAs } from "file-saver";

const Expedition = () => {
  const [transportRoutier, setTransportRoutier] = useState({
    infoGES: "",
    emission: 0,
  });

  const [transportFerroviaire, setTransportFerroviaire] = useState({
    infoGES: "",
    emission: 0,
  });

  const [transportMaritime, setTransportMaritime] = useState({
    infoGES: "",
    emission: 0,
  });

  const handleSave = (data, filename) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, filename);
  };

  const handleInputChange = (setTransport, e) => {
    const { name, value } = e.target;
    setTransport((prev) => ({
      ...prev,
      [name]: value,
      emission: value,
    }));
  };

  return (
    <Wrapper>
      <div className="section">
        <h2>Transport routier sortant</h2>
        <table>
          <thead>
            <tr>
              <th>Caractérisation du transport</th>
              <th>Info GES du prestataire</th>
              <th>t CO2e (amont + combustion)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Camion </td>
              <td>
                <input
                  type="number"
                  name="infoGES"
                  value={transportRoutier.infoGES}
                  onChange={(e) => handleInputChange(setTransportRoutier, e)}
                />
              </td>
              <td>{transportRoutier.emission}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => handleSave(transportRoutier, "transportRoutier.json")}
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Transport ferroviaire sortant</h2>
        <table>
          <thead>
            <tr>
              <th>Caractérisation du transport</th>
              <th>Info GES du prestataire</th>
              <th>t CO2e (amont + combustion)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CN Rail (Val d'Or)</td>
              <td>
                <input
                  type="number"
                  name="infoGES"
                  value={transportFerroviaire.infoGES}
                  onChange={(e) =>
                    handleInputChange(setTransportFerroviaire, e)
                  }
                />
              </td>
              <td>{transportFerroviaire.emission}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            handleSave(transportFerroviaire, "transportFerroviaire.json")
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Transport maritime sortant</h2>
        <table>
          <thead>
            <tr>
              <th>Caractérisation du transport</th>
              <th>Info GES du prestataire</th>
              <th>t CO2e (amont + combustion)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bateau (Quebec)</td>
              <td>
                <input
                  type="number"
                  name="infoGES"
                  value={transportMaritime.infoGES}
                  onChange={(e) => handleInputChange(setTransportMaritime, e)}
                />
              </td>
              <td>{transportMaritime.emission}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            handleSave(transportMaritime, "transportMaritime.json")
          }
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Expedition;
