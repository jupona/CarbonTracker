import  { useState, useContext } from "react";
import Wrapper from "../assets/wrappers/Intrants";
// import { saveAs } from "file-saver";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from '../context/walletContext';
import Web3 from "web3";
import { carbonContract} from "../abis/contractAddress.json";

const web3 = new Web3(window.ethereum);
const Intrants = () => {
  const { walletAddress} = useContext(WalletContext);

  const [data, setData] = useState({
    acier: {
      fournisseurBoullet: 0,
      fournisseurBarres: 0,
      total: 0,
      facteur: 2210,
    },
    produitsChimiques: {
      naoh: 0,
      na2co3: 0,
      armatT: 0,
      mibc: 0,
      f100: 0,
      fa2: 0,
      total: 0,
      facteur: 2.06,
    },
    plastique: {
      plastiqueRigide: 0,
      total: 0,
      facteur: 2380,
    },
    hydrogene: {
      hydrogeneAchte: 0,
      total: 0,
      facteur: 9,
    },
  });

  const handleInputChange = (category, key, value) => {
    const newData = { ...data };
    newData[category][key] = parseFloat(value) || 0;
    newData[category].total =
      Object.keys(newData[category])
        .filter((k) => k !== "total" && k !== "facteur")
        .reduce(
          (sum, k) => sum + newData[category][k] * newData[category].facteur,
          0
        ) / 1000;
    setData(newData);
  };

  // const handleSave = (category, filename) => {
  //   const json = JSON.stringify(data[category], null, 2);
  //   const blob = new Blob([json], { type: "application/json" });
  //   saveAs(blob, filename);
  // };

  let totalAcier = Math.floor(data.acier.total * 100)
  let totalProduitsChimiques = Math.floor(data.produitsChimiques.total * 100)
  let totalPlastique = Math.floor(data.plastique.total * 100)
  let totalHydrogene = Math.floor(data.hydrogene.total * 100)
  const addtotalAcier = async (totalAcier) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
     const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addMetaux(totalAcier).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const addtotalProduitsChimiques = async (totalProduitsChimiques) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
     const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addProduitsChimiques(totalProduitsChimiques).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const addtotalPlastique = async (totalPlastique) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
     const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addPlastiques(totalPlastique).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const addtotalHydrogene = async (totalHydrogene) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
     const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addHydrogene(totalHydrogene).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Wrapper>
      <div className="section">
        <h2>Métaux</h2>
        <table>
          <thead>
            <tr>
              <th>Broyage usine</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs kg CO2e / t</th>
              <th>t CO2e amont</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fournisseur de boullet (broyage)</td>
              <td>tonnes</td>
              <td>
                <input
                  type="number"
                  value={data.acier.fournisseurBoullet}
                  onChange={(e) =>
                    handleInputChange(
                      "acier",
                      "fournisseurBoullet",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>{data.acier.facteur}</td>
              <td>
                {(
                  (data.acier.fournisseurBoullet * data.acier.facteur) /
                  1000
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Fournisseur de barres (broyage)</td>
              <td>tonnes</td>
              <td>
                <input
                  type="number"
                  value={data.acier.fournisseurBarres}
                  onChange={(e) =>
                    handleInputChange(
                      "acier",
                      "fournisseurBarres",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>{data.acier.facteur}</td>
              <td>
                {(
                  (data.acier.fournisseurBarres * data.acier.facteur) /
                  1000
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="total-row">
              <td colSpan="4">TOTAL</td>
              <td>{data.acier.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addtotalAcier(totalAcier)}>
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Produits chimiques</h2>
        <table>
          <thead>
            <tr>
              <th>Flotation usine</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs kg CO2e / kg</th>
              <th>t CO2e amont</th>
            </tr>
          </thead>
          <tbody>
            {["naoh", "na2co3", "armatT", "mibc", "f100", "fa2"].map((key) => (
              <tr key={key}>
                <td>{key.toUpperCase()}</td>
                <td>kg</td>
                <td>
                  <input
                    type="number"
                    value={data.produitsChimiques[key]}
                    onChange={(e) =>
                      handleInputChange(
                        "produitsChimiques",
                        key,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{data.produitsChimiques.facteur}</td>
                <td>
                  {(
                    (data.produitsChimiques[key] *
                      data.produitsChimiques.facteur) /
                    1000
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="4">TOTAL</td>
              <td>{data.produitsChimiques.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
           addtotalProduitsChimiques(totalProduitsChimiques)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Plastiques</h2>
        <table>
          <thead>
            <tr>
              <th>Achat pour site</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs kg CO2e / t</th>
              <th>t CO2e amont</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plastiques rigides</td>
              <td>kg</td>
              <td>
                <input
                  type="number"
                  value={data.plastique.plastiqueRigide}
                  onChange={(e) =>
                    handleInputChange(
                      "plastique",
                      "plastiqueRigide",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>{data.plastique.facteur}</td>
              <td>
                {(
                  (data.plastique.plastiqueRigide * data.plastique.facteur) /
                  1000
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="total-row">
              <td colSpan="4">TOTAL</td>
              <td>{data.plastique.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addtotalPlastique(totalPlastique)}>
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Hydrogène</h2>
        <table>
          <thead>
            <tr>
              <th>Hydrogène acheté</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs kg CO2e / t</th>
              <th>t CO2e amont</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hydrogène acheté</td>
              <td>kg</td>
              <td>
                <input
                  type="number"
                  value={data.hydrogene.hydrogeneAchte}
                  onChange={(e) =>
                    handleInputChange(
                      "hydrogene",
                      "hydrogeneAchte",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>{data.hydrogene.facteur}</td>
              <td>
                {(
                  (data.hydrogene.hydrogeneAchte * data.hydrogene.facteur) /
                  1000
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="total-row">
              <td colSpan="4">TOTAL</td>
              <td>{data.hydrogene.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => addtotalHydrogene(totalHydrogene) }>
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Intrants;
