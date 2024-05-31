import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Halocarbures";
import { saveAs } from "file-saver";

const hydrofluorocarburesOptions = [
  { name: "HFC-23", formula: "CHF3", prp: 14800 },
  { name: "HFC-32", formula: "CH2F2", prp: 675 },
  { name: "HFC-41", formula: "CHF", prp: 92 },
  { name: "HFC-43-10mee", formula: "C5H2F10", prp: 1640 },
  { name: "HFC-125", formula: "C2HF5", prp: 3500 },
  { name: "HFC-134", formula: "C2H2F4", prp: 1100 },
  { name: "HFC-134a", formula: "C2H2F4", prp: 1430 },
  { name: "HFC-143", formula: "C2H3F3", prp: 353 },
  { name: "HFC-143a", formula: "C2H3F3", prp: 4470 },
  { name: "HFC-152", formula: "C2H4F2", prp: 53 },
  { name: "HFC-152a", formula: "C2H4F2", prp: 124 },
  { name: "HFC-161", formula: "CH3F", prp: 12 },
  { name: "HFC-227ea", formula: "C3HF7", prp: 3220 },
  { name: "HFC-236cb", formula: "C3H2F6", prp: 1340 },
  { name: "HFC-236ea", formula: "C3H2F6", prp: 1370 },
  { name: "HFC-236fa", formula: "C3H2F6", prp: 9810 },
  { name: "HFC-245ca", formula: "C3H3F5", prp: 693 },
  { name: "HFC-245fa", formula: "C3H3F5", prp: 1030 },
  { name: "HFC-365mfc", formula: "C4H3F5", prp: 794 },
];

const perfluorocarburesOptions = [
  { name: "Perfluorométhane (Freon)", formula: "CF4", prp: 7390 },
  { name: "Perfluoroéthane", formula: "C2F6", prp: 12200 },
  { name: "Perfluoropropane", formula: "C3F8", prp: 8830 },
  { name: "Perfluorobutane", formula: "C4F10", prp: 8860 },
  { name: "Perfluorocyclobutane", formula: "c-C4F8", prp: 10300 },
  { name: "Perfluoropentane", formula: "C5F12", prp: 9160 },
  { name: "Perfluorohexane", formula: "C6F14", prp: 9300 },
  { name: "Perfluorodecalin", formula: "C10F18", prp: 7500 },
  { name: "Perfluorocyclopropane", formula: "c-C3F6", prp: 17340 },
  { name: "Trifluorure d'azote", formula: "NF3", prp: 17200 },
  { name: "Hexafluorure de soufre", formula: "SF6", prp: 22800 },
];

const initialSelection = (options) =>
  options.map(() => ({
    quantity: "",
    prpResult: 0,
  }));

const Halocarbures = () => {
  const [selectionsHFC, setSelectionsHFC] = useState(
    initialSelection(hydrofluorocarburesOptions)
  );
  const [selectionsPFC, setSelectionsPFC] = useState(
    initialSelection(perfluorocarburesOptions)
  );

  const handleInputChange = (
    selections,
    setSelections,
    options,
    index,
    value
  ) => {
    const newSelections = [...selections];
    const prp = options[index].prp;
    newSelections[index] = {
      quantity: value,
      prpResult: ((value * prp) / 1000).toFixed(2), // t CO2e
    };
    setSelections(newSelections);
  };

  const handleSave = () => {
    const data = {
      hydrofluorocarbures: selectionsHFC,
      perfluorocarbures: selectionsPFC,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "halocarbures_data.json");
  };

  const totalPRP = (selections) =>
    selections
      .reduce((acc, curr) => acc + parseFloat(curr.prpResult), 0)
      .toFixed(2);

  return (
    <Wrapper>
      <div className="section">
        <h2>Emissions d'Hydrofluorocarbures</h2>
        <table>
          <thead>
            <tr>
              <th>Emissions d'Hydrofluorocarbures</th>
              <th>Formule chimique</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>PRP</th>
              <th>t CO2e</th>
            </tr>
          </thead>
          <tbody>
            {hydrofluorocarburesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.formula}</td>
                <td>kg</td>
                <td>
                  <input
                    type="number"
                    value={selectionsHFC[index].quantity}
                    onChange={(e) =>
                      handleInputChange(
                        selectionsHFC,
                        setSelectionsHFC,
                        hydrofluorocarburesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.prp}</td>
                <td>{selectionsHFC[index].prpResult}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="5">TOTAL</td>
              <td>{totalPRP(selectionsHFC)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Emissions de perfluorocarbures</h2>
        <table>
          <thead>
            <tr>
              <th>Emissions de perfluorocarbures</th>
              <th>Formule chimique</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>PRP</th>
              <th>t CO2e</th>
            </tr>
          </thead>
          <tbody>
            {perfluorocarburesOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.formula}</td>
                <td>kg</td>
                <td>
                  <input
                    type="number"
                    value={selectionsPFC[index].quantity}
                    onChange={(e) =>
                      handleInputChange(
                        selectionsPFC,
                        setSelectionsPFC,
                        perfluorocarburesOptions,
                        index,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{option.prp}</td>
                <td>{selectionsPFC[index].prpResult}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="5">TOTAL</td>
              <td>{totalPRP(selectionsPFC)}</td>
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

export default Halocarbures;
