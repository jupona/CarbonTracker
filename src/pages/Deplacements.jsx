import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Deplacements";
import { saveAs } from "file-saver";

const Deplacements = () => {
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

  const handleSave = () => {
    const data = { domicileTravail, cadreTravail, avion };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "deplacements_data.json");
  };

  return (
    <Wrapper>
      <div className="section">
        <h2>Déplacements domicile-travail</h2>
        <table>
          <thead>
            <tr>
              <th>Carburant</th>
              <th>Nombre d'employés</th>
              <th>Moyenne parcourus par un employé/ jour (Km)</th>
              <th>Total de km pour l'année</th>
              <th>Litre/100 km en voiture</th>
              <th>Facteur d'émission kg CO2 / litre</th>
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
              <td>{(avion.emissionFactor * avion.distance).toFixed(2)}</td>
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
      </div>

      <div className="section">
        <button onClick={handleSave}>Enregistrer</button>
      </div>
    </Wrapper>
  );
};

export default Deplacements;
