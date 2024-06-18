// import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Deplacements";
// import { saveAs } from "file-saver";
import { useState, useContext } from "react";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from "../context/walletContext";
import Web3 from "web3";
import { carbonContract } from "../abis/contractAddress.json";
const Deplacements = () => {
  const { walletAddress } = useContext(WalletContext);
  const [domicileTravail, setDomicileTravail] = useState({
    diesel: {
      employees: "",
      kmPerDay: "",
      emissionFactor: 2.663,
      totalCO2e: 0,
    },
    essence: {
      employees: "",
      kmPerDay: "",
      emissionFactor: 2.289,
      totalCO2e: 0,
    },
  });

  const [cadreTravail, setCadreTravail] = useState({
    essence: { consumption: "", emissionFactor: 2.289, totalCO2e: 0 },
    diesel: { consumption: "", emissionFactor: 2.663, totalCO2e: 0 },
  });

  const [avion, setAvion] = useState({
    trajets: "",
    employees: "",
    distance: "",
    emissionFactor: 0.141,
    frequency: "",
    totalCO2e: 0,
  });

  const handleDomicileTravailChange = (fuel, field, value) => {
    setDomicileTravail((prev) => {
      const updated = { ...prev };
      updated[fuel][field] = value;
      if (updated[fuel].employees && updated[fuel].kmPerDay) {
        updated[fuel].totalCO2e = (
          (updated[fuel].employees *
            updated[fuel].kmPerDay *
            365 *
            0.092 *
            updated[fuel].emissionFactor) /
          1000
        ).toFixed(2);
      }
      return updated;
    });
  };

  const handleCadreTravailChange = (fuel, value) => {
    setCadreTravail((prev) => {
      const updated = { ...prev };
      updated[fuel].consumption = value;
      if (updated[fuel].consumption) {
        updated[fuel].totalCO2e = (
          (updated[fuel].consumption * updated[fuel].emissionFactor) /
          1000
        ).toFixed(2);
      }
      return updated;
    });
  };

  const handleAvionChange = (field, value) => {
    setAvion((prev) => {
      const updated = { ...prev };
      updated[field] = value;
      if (updated.trajets && updated.employees && updated.distance) {
        updated.totalCO2e = (
          (updated.trajets *
            updated.employees *
            updated.distance *
            updated.emissionFactor *
            updated.frequency) /
          1000
        ).toFixed(2);
      }
      return updated;
    });
  };

  // const handleSave = (data, filename) => {
  //   const json = JSON.stringify(data, null, 2);
  //   const blob = new Blob([json], { type: "application/json" });
  //   saveAs(blob, filename);
  // };

  let domicileTravailInt = Math.floor(domicileTravail.diesel.totalCO2e * 100);
  let cadreTravailInt = Math.floor(cadreTravail.diesel.totalCO2e * 100);
  let avionInt = Math.floor(avion.totalCO2e * 100);
  const addDomicileTravailInt = async (domicileTravailInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods
        .addDomicileTravail(domicileTravailInt)
        .send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  };

  const addCadreTravailInt = async (cadreTravailInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods
        .addTravail(cadreTravailInt)
        .send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  };

  const addAvionInt = async (avionInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addTravail(avionInt).send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  };
  return (
    <Wrapper>
      <div className="section">
        <h2>Déplacements domicile-travail</h2>
        <table>
          <thead>
            <tr>
              <th>Carburant</th>
              <th>Nombre demployés</th>
              <th>Moyenne parcourus par un employé/ jour (Km)</th>
              <th>Total de km pour lannée</th>
              <th>Litre/100 km en voiture</th>
              <th>Facteur démission kg CO2 / litre</th>
              <th>t CO2e</th>
            </tr>
          </thead>
          <tbody>
            {["diesel", "essence"].map((fuel) => (
              <tr key={fuel}>
                <td>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</td>
                <td>
                  <input
                    type="number"
                    value={domicileTravail[fuel].employees}
                    onChange={(e) =>
                      handleDomicileTravailChange(
                        fuel,
                        "employees",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={domicileTravail[fuel].kmPerDay}
                    onChange={(e) =>
                      handleDomicileTravailChange(
                        fuel,
                        "kmPerDay",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  {(
                    domicileTravail[fuel].employees *
                    domicileTravail[fuel].kmPerDay *
                    365
                  ).toFixed(2)}
                </td>
                <td>0.092</td>
                <td>{domicileTravail[fuel].emissionFactor}</td>
                <td>{domicileTravail[fuel].totalCO2e}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="6">TOTAL</td>
              <td>
                {(
                  parseFloat(domicileTravail.diesel.totalCO2e) +
                  parseFloat(domicileTravail.essence.totalCO2e)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addDomicileTravailInt(domicileTravailInt)}>
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Déplacements des employés cadre du travail</h2>
        <table>
          <thead>
            <tr>
              <th>Consommation</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Litre/100 km en voiture</th>
              <th>Facteurs Diesel</th>
              <th>Facteurs Essence</th>
              <th>t CO2e (combustion)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essence</td>
              <td>Litres</td>
              <td>
                <input
                  type="number"
                  value={cadreTravail.essence.consumption}
                  onChange={(e) =>
                    handleCadreTravailChange("essence", e.target.value)
                  }
                />
              </td>
              <td>0.092</td>
              <td>{cadreTravail.diesel.emissionFactor}</td>
              <td>{cadreTravail.essence.emissionFactor}</td>
              <td>{cadreTravail.essence.totalCO2e}</td>
            </tr>
            <tr>
              <td>Diesel</td>
              <td>Litres</td>
              <td>
                <input
                  type="number"
                  value={cadreTravail.diesel.consumption}
                  onChange={(e) =>
                    handleCadreTravailChange("diesel", e.target.value)
                  }
                />
              </td>
              <td>0.092</td>
              <td>{cadreTravail.diesel.emissionFactor}</td>
              <td>{cadreTravail.essence.emissionFactor}</td>
              <td>{cadreTravail.diesel.totalCO2e}</td>
            </tr>
            <tr>
              <td colSpan="6">TOTAL</td>
              <td>
                {(
                  parseFloat(cadreTravail.essence.totalCO2e) +
                  parseFloat(cadreTravail.diesel.totalCO2e)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addCadreTravailInt(cadreTravailInt)}>
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Déplacement avion EMPLOYÉ</h2>
        <table>
          <thead>
            <tr>
              <th>Caractérisation du transport</th>
              <th>Nb Trajets</th>
              <th>Nb employé</th>
              <th>Distance (km)</th>
              <th>Facteur (kg CO2e /peq.km)</th>
              <th>Info GES (t CO2e)</th>
              <th>Frequence</th>
              <th>t CO2e (amont + combustion)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Avion</td>
              <td>
                <input
                  type="number"
                  value={avion.trajets}
                  onChange={(e) => handleAvionChange("trajets", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={avion.employees}
                  onChange={(e) =>
                    handleAvionChange("employees", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={avion.distance}
                  onChange={(e) =>
                    handleAvionChange("distance", e.target.value)
                  }
                />
              </td>
              <td>{avion.emissionFactor}</td>
              <td>
                {(
                  (avion.emissionFactor *
                    avion.distance *
                    avion.employees *
                    avion.trajets) /
                  1000
                ).toFixed(2)}
              </td>
              <td>
                <input
                  type="number"
                  value={avion.frequency}
                  onChange={(e) =>
                    handleAvionChange("frequency", e.target.value)
                  }
                />
              </td>
              <td>{avion.totalCO2e}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addAvionInt(avionInt)}>Enregistrer</button>
      </div>
    </Wrapper>
  );
};

export default Deplacements;
