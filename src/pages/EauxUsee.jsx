// import React, { useState } from "react";
import Wrapper from "../assets/wrappers/EauxUsees";
// import { saveAs } from "file-saver";
import { useState, useContext } from "react";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from '../context/walletContext';
import Web3 from "web3";
import { carbonContract} from "../abis/contractAddress.json";
const EauxUsees = () => {
  const [populationChOrg, setPopulationChOrg] = useState("");
  const [populationAzote, setPopulationAzote] = useState("");
  const { walletAddress} = useContext(WalletContext);

  const eauxUseesChOrg = {
    DBOHabJour: 0.06,
    coeffCorrection: 1.25,
    facteurCorrection: 365,
    FECH4: 0.0108,
    eff: 0.85,
  };

  const eauxUseesAzote = {
    proteines: 69.85,
    FNPR: 0.16,
    Fmenage: 1.1758,
    FNC: 1.1359,
    FEN2O: 0.016,
  };
  

  const totalChOrg =
    populationChOrg *
    eauxUseesChOrg.DBOHabJour *
    eauxUseesChOrg.coeffCorrection *
    eauxUseesChOrg.facteurCorrection;
  const CH4 = totalChOrg * eauxUseesChOrg.FECH4 * eauxUseesChOrg.eff * 0.001;
  const PRPChOrg = CH4 * 25;

  const totalAzote =
    populationAzote *
    eauxUseesAzote.proteines *
    eauxUseesAzote.FNPR *
    eauxUseesAzote.Fmenage *
    eauxUseesAzote.FNC;
  const N2O = totalAzote * eauxUseesAzote.FEN2O * (44 / 28) * 0.001;
  const PRPAzote = N2O * 298;

  // const handleSave = (data, filename) => {
  //   const json = JSON.stringify(data, null, 2);
  //   const blob = new Blob([json], { type: "application/json" });
  //   saveAs(blob, filename);
  // };
  let eauxUseesAzoteInt = Math.floor(eauxUseesAzote.FEN2O * 100)
  let eauxUseesMethanegInt = Math.floor(eauxUseesChOrg.FECH4 * 100)

  const addEauxUseesAzoteInt = async (eauxUseesAzoteInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addTraitementEauxUsees(eauxUseesAzoteInt).send({ from: walletAddress });
    } catch (error) {
      console.log(error);
    }
  }
  const addEauxUseesMethanegInt = async (eauxUseesMethanegInt) => {
    try {
      const address = carbonContract[0];
      const web3 = new Web3(window.ethereum);
      const carbon = new web3.eth.Contract(carbonABI, address);
      await carbon.methods.addTraitementEauxUsees(eauxUseesMethanegInt).send({ from: walletAddress });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Wrapper>
      <div className="section">
        <h2>Eaux usées Méthane (hors procédé)</h2>
        <table>
          <thead>
            <tr>
              <th>Lieu</th>
              <th>Unite</th>
              <th>Population (pers)</th>
              <th>DBOHab.jour</th>
              <th>coeff correction</th>
              <th>Facteur correction (jours/année)</th>
              <th>TOTAL kg / an</th>
              <th>FECH4(trait) kg CH4/kg DBO5</th>
              <th>Eff</th>
              <th>CH4 (t)</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>ChOrg</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={populationChOrg}
                  onChange={(e) => setPopulationChOrg(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={eauxUseesChOrg.DBOHabJour}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={eauxUseesChOrg.coeffCorrection}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={eauxUseesChOrg.facteurCorrection}
                  readOnly
                />
              </td>
              <td>{totalChOrg.toFixed(2)}</td>
              <td>
                <input type="number" value={eauxUseesChOrg.FECH4} readOnly />
              </td>
              <td>
                <input
                  type="number"
                  value={eauxUseesChOrg.eff}
                  readOnly
                  style={{ width: "4rem" }}
                />
              </td>
              <td>{CH4.toFixed(2)}</td>
              <td>{PRPChOrg.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addEauxUseesMethanegInt(eauxUseesMethanegInt)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Eaux usées Azote </h2>
        <table>
          <thead>
            <tr>
              <th>Lieu</th>
              <th>Unite</th>
              <th>Population (pers)</th>
              <th>Protéines kg/pers/an</th>
              <th>F NPR kg N/kg prot</th>
              <th>Fménage</th>
              <th>F NC</th>
              <th>TOTAL kg / an</th>
              <th>FEN2O kg N2O/kg N</th>
              <th>N2O (t)</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>Azote</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={populationAzote}
                  onChange={(e) => setPopulationAzote(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={eauxUseesAzote.proteines}
                  readOnly
                />
              </td>
              <td>
                <input type="number" value={eauxUseesAzote.FNPR} readOnly />
              </td>
              <td>
                <input type="number" value={eauxUseesAzote.Fmenage} readOnly />
              </td>
              <td>
                <input type="number" value={eauxUseesAzote.FNC} readOnly />
              </td>
              <td>{totalAzote.toFixed(2)}</td>
              <td>
                <input type="number" value={eauxUseesAzote.FEN2O} readOnly />
              </td>
              <td>{N2O.toFixed(2)}</td>
              <td>{PRPAzote.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addEauxUseesAzoteInt(eauxUseesAzoteInt)
          }
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default EauxUsees;
