import  { useState, useContext } from "react";
import Wrapper from "../assets/wrappers/Expedition";
// import { saveAs } from "file-saver";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from '../context/walletContext';
import Web3 from "web3";
import { carbonContract} from "../abis/contractAddress.json";
const Expedition = () => {
  const { walletAddress} = useContext(WalletContext);

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

  // const handleSave = (data, filename) => {
  //   const json = JSON.stringify(data, null, 2);
  //   const blob = new Blob([json], { type: "application/json" });
  //   saveAs(blob, filename);
  // };

  const handleInputChange = (setTransport, e) => {
    const { name, value } = e.target;
    setTransport((prev) => ({
      ...prev,
      [name]: value,
      emission: value,
    }));
  };
  let transportRoutierInt = Math.floor(transportRoutier.emission * 100)
  let transportFerroviaireInt = Math.floor(transportFerroviaire.emission * 100)
  let transportMaritimeInt = Math.floor(transportMaritime.emission * 100)
  const addTransportRoutierInt = async (transportRoutierInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addFluxRoutier(transportRoutierInt).send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  }

  const addTransportFerroviaireInt = async (transportFerroviaireInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addFluxFerroviaire(transportFerroviaireInt).send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  }

  const addTransportMaritimeInt = async (transportMaritimeInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addFluxMaritime(transportMaritimeInt).send({ from: walletAddress });
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  }

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
          onClick={() => addTransportRoutierInt(transportRoutierInt)}
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
              <td>CN Rail (Val dOr)</td>
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
            addTransportFerroviaireInt(transportFerroviaireInt)
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
            addTransportMaritimeInt(transportMaritimeInt)
          }
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Expedition;
