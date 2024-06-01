/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Combustibles";
import { saveAs } from "file-saver";
import { useState, useContext } from "react";
// import web3 from "web3";
import { carbonContract} from "../abis/contractAddress.json";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from '../context/walletContext';
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const combustiblesOptions = [
  {
    name: "Butane",
    unit: "litres",
    calorificValue: 28.44,
    emissionFactor: 60.83,
    ch4Factor: 0.84,
    n2oFactor: 3.8,
  },
  {
    name: "Propane",
    unit: "litres",
    calorificValue: 25.31,
    emissionFactor: 59.66,
    ch4Factor: 0.95,
    n2oFactor: 4.27,
  },
  {
    name: "Gaz naturel",
    unit: "litres",
    calorificValue: 38.32,
    emissionFactor: 49.01,
    ch4Factor: 0.97,
    n2oFactor: 0.86,
  },
  {
    name: "Essence",
    unit: "litres",
    calorificValue: 34.87,
    emissionFactor: 65.4,
    ch4Factor: 77.43,
    n2oFactor: 1.43,
  },
  {
    name: "Diesel",
    unit: "litres",
    calorificValue: 38.3,
    emissionFactor: 69.53,
    ch4Factor: 3.47,
    n2oFactor: 10.44,
  },
  {
    name: "Mazout léger",
    unit: "litres",
    calorificValue: 38.78,
    emissionFactor: 70.05,
    ch4Factor: 0.16,
    n2oFactor: 0.8,
  },
  {
    name: "Mazout lourd",
    unit: "litres",
    calorificValue: 42.5,
    emissionFactor: 71.07,
    ch4Factor: 2.82,
    n2oFactor: 1.51,
  },
];

const combustiblesMobilesOptions = [
  {
    name: "Essence",
    unit: "litres",
    emissionFactor: 2.289,
    ch4Factor: 2.7,
    n2oFactor: 0.05,
  },
  {
    name: "Diesel",
    unit: "litres",
    emissionFactor: 2.663,
    ch4Factor: 0.15,
    n2oFactor: 1.1,
  },
  {
    name: "Propane",
    unit: "litres",
    emissionFactor: 1.51,
    ch4Factor: 0.64,
    n2oFactor: 0.028,
  },
];

const explosifsOptions = [
  { name: "ANFO", unit: "tonnes", emissionFactor: 0.17 },
  { name: "Heavy ANFO", unit: "tonnes", emissionFactor: 0.18 },
  { name: "Emulsion", unit: "tonnes", emissionFactor: 0.17 },
];

const initialSelection = (options) =>
  options.map(() => ({
    quantity: "",
    emission: 0,
    ch4Emission: 0,
    n2oEmission: 0,
    prp: 0,
  }));

const Combustibles = () => {
  const { walletAddress} = useContext(WalletContext);

  const [selectionsFixes, setSelectionsFixes] = useState(
    initialSelection(combustiblesOptions)
  );
  const [selectionsMobiles, setSelectionsMobiles] = useState(
    initialSelection(combustiblesMobilesOptions)
  );
  const [selectionsElectricite, setSelectionsElectricite] = useState(
    initialSelection(combustiblesOptions)
  );
  const [selectionsChauffage, setSelectionsChauffage] = useState(
    initialSelection(combustiblesOptions)
  );
  const [selectionsExplosifs, setSelectionsExplosifs] = useState(
    initialSelection(explosifsOptions)
  );

  const handleInputChange = (
    selections,
    setSelections,
    options,
    index,
    value
  ) => {
    const newSelections = [...selections];
    const option = options[index];
    const emission =
      (value * option.calorificValue * option.emissionFactor) / 1000000; // en tonnes de CO2
    const ch4Emission =
      (value * option.calorificValue * option.ch4Factor) / 1000000000; // en tonnes de CH4
    const n2oEmission =
      (value * option.calorificValue * option.n2oFactor) / 1000000000; // en tonnes de N2O
    const prp = emission + ch4Emission * 25 + n2oEmission * 298;
    newSelections[index] = {
      quantity: value,
      emission: emission.toFixed(2),
      ch4Emission: ch4Emission.toFixed(2),
      n2oEmission: n2oEmission.toFixed(2),
      prp: prp.toFixed(2),
    };
    setSelections(newSelections);
  };

  const handleMobilesInputChange = (
    selections,
    setSelections,
    options,
    index,
    value
  ) => {
    const newSelections = [...selections];
    const option = options[index];
    const emission = (value * option.emissionFactor) / 1000; // en tonnes de CO2
    const ch4Emission = (value * option.ch4Factor) / 1000000; // en tonnes de CH4
    const n2oEmission = (value * option.n2oFactor) / 1000000; // en tonnes de N2O
    const prp = emission + ch4Emission * 25 + n2oEmission * 298;
    newSelections[index] = {
      quantity: value,
      emission: emission.toFixed(2),
      ch4Emission: ch4Emission.toFixed(2),
      n2oEmission: n2oEmission.toFixed(2),
      prp: prp.toFixed(2),
    };
    setSelections(newSelections);
  };

  const handleExplosifsInputChange = (index, value) => {
    const newSelections = [...selectionsExplosifs];
    const option = explosifsOptions[index];
    const emission = value * option.emissionFactor; // en tonnes de CO2
    const prp = emission; // en tonnes de CO2 (les explosifs n'ont pas de facteurs CH4 ou N2O)
    newSelections[index] = {
      quantity: value,
      emission: emission.toFixed(2),
      prp: prp.toFixed(2),
    };
    setSelectionsExplosifs(newSelections);
  };

  const totalEmission = (selections) =>
    selections
      .reduce((acc, curr) => acc + parseFloat(curr.emission), 0)
      .toFixed(2);
  const totalCH4Emission = (selections) =>
    selections
      .reduce((acc, curr) => acc + parseFloat(curr.ch4Emission), 0)
      .toFixed(2);
  const totalN2oEmission = (selections) =>
    selections
      .reduce((acc, curr) => acc + parseFloat(curr.n2oEmission), 0)
      .toFixed(2);
  const totalPRP = (selections) =>
    selections.reduce((acc, curr) => acc + parseFloat(curr.prp), 0).toFixed(2);

  const handleSave = (data, filename) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, filename);
  };

  let combustFixes = Number(totalPRP(selectionsFixes))
  let combustMobile = Number(totalPRP(selectionsMobiles))
  let productionElectricite = Number(totalPRP(selectionsElectricite))
  let chauffageFossile = Number(totalPRP(selectionsChauffage))
  let explosifs = Number(totalPRP(selectionsExplosifs))
  let combustFixesInt = Number(Math.floor(combustFixes * 100))
  let combustMobileInt = Number(Math.floor(combustMobile * 100))
  let productionElectriciteInt = Number(Math.floor(productionElectricite * 100))
  let chauffageFossileInt = Number(Math.floor(chauffageFossile * 100))
  let explosifsInt = Number(Math.floor(explosifs * 100))

 
  const addCombustiblesFossilesSourcesFixesFunction = async (combustFixesInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addCombustiblesFossilesSourcesFixes(combustFixesInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  };
  const addCombustiblesFossilesSourcesMobileesFunction = async (combustMobileInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addCombustiblesFossilesSourcesMobiles(combustMobileInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  };
  const addProductionElectriciteFunction = async (productionElectriciteInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addProductionElectriciteCombustiblesSourcesFixes(productionElectriciteInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  }
  const addChauffageFossileFunction = async (chauffageFossileInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addChauffageFossile(chauffageFossileInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  }

  const addexplosifsFunction = async (explosifsInt) => {
    try {
      // Contract address and ABI should already be available in the component
     const address = carbonContract[0];
      const contract = new web3.eth.Contract(carbonABI, address);
      const result = await contract.methods.addExplosifs(explosifsInt ).send({
        from: walletAddress // The connected address that will initiate the transaction
      });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show an error message to the user if something goes wrong.
    }
  }


  return (
    <Wrapper>
      <div className="section">
        <h2>Combustibles fossiles, sources fixes</h2>
        <table>
          <thead>
            <tr>
              <th>Combustible</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Pouvoir Calorifique (GJ/kl)</th>
              <th>Facteurs kg CO2/GJ</th>
              <th>Facteurs CH4 g/GJ</th>
              <th>Facteurs N2O g/GJ</th>
              <th>t CO2</th>
              <th>t CH4</th>
              <th>t N2O</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            {combustiblesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.unit}</td>
                <td>
                  <input
                    type="number"
                    value={selectionsFixes[index].quantity}
                    onChange={(e) =>
                      handleInputChange(
                        selectionsFixes,
                        setSelectionsFixes,
                        combustiblesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.calorificValue}</td>
                <td>{option.emissionFactor}</td>
                <td>{option.ch4Factor}</td>
                <td>{option.n2oFactor}</td>
                <td>{selectionsFixes[index].emission}</td>
                <td>{selectionsFixes[index].ch4Emission}</td>
                <td>{selectionsFixes[index].n2oEmission}</td>
                <td>{selectionsFixes[index].prp}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="7">TOTAL</td>
              <td className="total-td">{totalEmission(selectionsFixes)}</td>
              <td className="total-td">{totalCH4Emission(selectionsFixes)}</td>
              <td className="total-td">{totalN2oEmission(selectionsFixes)}</td>
              <td className="total-td">{totalPRP(selectionsFixes)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => addCombustiblesFossilesSourcesFixesFunction(combustFixesInt)}
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Combustibles fossiles, sources mobiles</h2>
        <table>
          <thead>
            <tr>
              <th>Combustible</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs CO2 (kg/l)</th>
              <th>Facteurs CH4 g/l</th>
              <th>Facteurs N2O g/l</th>
              <th>t CO2</th>
              <th>t CH4</th>
              <th>t N2O</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            {combustiblesMobilesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.unit}</td>
                <td>
                  <input
                    type="number"
                    value={selectionsMobiles[index].quantity}
                    onChange={(e) =>
                      handleMobilesInputChange(
                        selectionsMobiles,
                        setSelectionsMobiles,
                        combustiblesMobilesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.emissionFactor}</td>
                <td>{option.ch4Factor}</td>
                <td>{option.n2oFactor}</td>
                <td>{selectionsMobiles[index].emission}</td>
                <td>{selectionsMobiles[index].ch4Emission}</td>
                <td>{selectionsMobiles[index].n2oEmission}</td>
                <td>{selectionsMobiles[index].prp}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="6">TOTAL</td>
              <td className="total-td">{totalEmission(selectionsMobiles)}</td>
              <td className="total-td">
                {totalCH4Emission(selectionsMobiles)}
              </td>
              <td className="total-td">
                {totalN2oEmission(selectionsMobiles)}
              </td>
              <td className="total-td">{totalPRP(selectionsMobiles)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addCombustiblesFossilesSourcesMobileesFunction(combustMobileInt)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Production délectricité</h2>
        <table>
          <thead>
            <tr>
              <th>Combustible</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Pouvoir Calorifique (GJ/kl)</th>
              <th>Facteurs kg CO2/GJ</th>
              <th>Facteurs CH4 g/GJ</th>
              <th>Facteurs N2O g/GJ</th>
              <th>t CO2</th>
              <th>t CH4</th>
              <th>t N2O</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            {combustiblesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.unit}</td>
                <td>
                  <input
                    type="number"
                    value={selectionsElectricite[index].quantity}
                    onChange={(e) =>
                      handleInputChange(
                        selectionsElectricite,
                        setSelectionsElectricite,
                        combustiblesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.calorificValue}</td>
                <td>{option.emissionFactor}</td>
                <td>{option.ch4Factor}</td>
                <td>{option.n2oFactor}</td>
                <td>{selectionsElectricite[index].emission}</td>
                <td>{selectionsElectricite[index].ch4Emission}</td>
                <td>{selectionsElectricite[index].n2oEmission}</td>
                <td>{selectionsElectricite[index].prp}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="7">TOTAL</td>
              <td className="total-td">
                {totalEmission(selectionsElectricite)}
              </td>
              <td className="total-td">
                {totalCH4Emission(selectionsElectricite)}
              </td>
              <td className="total-td">
                {totalN2oEmission(selectionsElectricite)}
              </td>
              <td className="total-td">{totalPRP(selectionsElectricite)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addProductionElectriciteFunction(productionElectriciteInt)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Chauffage fossile, à partir des combustibles</h2>
        <table>
          <thead>
            <tr>
              <th>Combustible</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Pouvoir Calorifique (GJ/kl)</th>
              <th>Facteurs kg CO2/GJ</th>
              <th>Facteurs CH4 g/GJ</th>
              <th>Facteurs N2O g/GJ</th>
              <th>t CO2</th>
              <th>t CH4</th>
              <th>t N2O</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            {combustiblesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.unit}</td>
                <td>
                  <input
                    type="number"
                    value={selectionsChauffage[index].quantity}
                    onChange={(e) =>
                      handleInputChange(
                        selectionsChauffage,
                        setSelectionsChauffage,
                        combustiblesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.calorificValue}</td>
                <td>{option.emissionFactor}</td>
                <td>{option.ch4Factor}</td>
                <td>{option.n2oFactor}</td>
                <td>{selectionsChauffage[index].emission}</td>
                <td>{selectionsChauffage[index].ch4Emission}</td>
                <td>{selectionsChauffage[index].n2oEmission}</td>
                <td>{selectionsChauffage[index].prp}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="7">TOTAL</td>
              <td className="total-td">{totalEmission(selectionsChauffage)}</td>
              <td className="total-td">
                {totalCH4Emission(selectionsChauffage)}
              </td>
              <td className="total-td">
                {totalN2oEmission(selectionsChauffage)}
              </td>
              <td className="total-td">{totalPRP(selectionsChauffage)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addChauffageFossileFunction(chauffageFossileInt)
          }
        >
          Enregistrer
        </button>
      </div>

      <div className="section">
        <h2>Explosifs</h2>
        <table>
          <thead>
            <tr>
              <th>Combustible</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>Facteurs t CO2/t</th>
              <th>t CO2</th>
              <th>PRP (t CO2e)</th>
            </tr>
          </thead>
          <tbody>
            {explosifsOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.unit}</td>
                <td>
                  <input
                    type="number"
                    value={selectionsExplosifs[index].quantity}
                    onChange={(e) =>
                      handleExplosifsInputChange(index, e.target.value)
                    }
                  />
                </td>
                <td>{option.emissionFactor}</td>
                <td>{selectionsExplosifs[index].emission}</td>
                <td>{selectionsExplosifs[index].prp}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="4">TOTAL</td>
              <td className="total-td">{totalEmission(selectionsExplosifs)}</td>
              <td className="total-td">{totalPRP(selectionsExplosifs)}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addexplosifsFunction(explosifsInt)
          }
        >
          Enregistrer
        </button>
      </div>
    </Wrapper>
  );
};

export default Combustibles;
