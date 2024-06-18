import { useState, useEffect, useContext } from "react";
import Wrapper from "../assets/wrappers/Electricite";
import { carbonContract } from "../abis/contractAddress.json";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from "../context/walletContext";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const Electricite = () => {
  const { walletAddress } = useContext(WalletContext);

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
    setHydroQuebec((prev) => {
      const conso = name === "conso" ? parseFloat(value) || 0 : prev.conso;
      const facteur =
        name === "facteur" ? parseFloat(value) || 0 : prev.facteur;
      const emission = ((conso * facteur) / 1000000).toFixed(2);

      return {
        ...prev,
        [name]: value,
        emission,
      };
    });
  };

  const addPertesLigne = async () => {
    try {
      const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods
        .addPertesEnLigne(pertesLigneInt)
        .send({
          from: walletAddress,
        });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addHydroQuebec = async () => {
    try {
      const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods
        .addFournisseur(hydroQuebecInt)
        .send({
          from: walletAddress,
        });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let pertesLigneInt = Math.floor(pertesLigne.emission * 100);
  let hydroQuebecInt = Math.floor(hydroQuebec.emission * 100);

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
        <button onClick={addHydroQuebec}>Enregistrer</button>
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
        <button onClick={addPertesLigne}>Enregistrer</button>
      </div>
    </Wrapper>
  );
};

export default Electricite;
