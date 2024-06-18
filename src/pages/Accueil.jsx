import Wrapper from "../assets/wrappers/Accueil";
import {
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import carbonABI from "../abis/carbonABI.json";
import WalletContext from "../context/walletContext";
import Web3 from "web3";
import { carbonContract } from "../abis/contractAddress.json";
import { useContext, useState, useEffect } from "react";

const web3 = new Web3(window.ethereum);

const data = [
  { name: "A", CO2e: 80, color: "#ff0000" },
  { name: "B", CO2e: 45, color: "#00ff00" },
  { name: "C", CO2e: 25, color: "#0000ff" },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const Accueil = () => {
  const [totalEmission, setTotalEmission] = useState(0);
  const [scopesData, setScopesData] = useState([
    { name: "Scope 1", CO2e: 0 },
    { name: "Scope 2", CO2e: 0 },
    { name: "Scope 3", CO2e: 0 },
  ]);

  const { walletAddress } = useContext(WalletContext);

  const getTotalEmissionsFromChain = async (walletAddress) => {
    try {
      const address = carbonContract[0];
      const carbon = new web3.eth.Contract(carbonABI, address);
      const result = await carbon.methods
        .getTotalEmissions(walletAddress)
        .call();
      setTotalEmission(Number(result));
      return result;
    } catch (error) {
      console.error("Impossible de sauvegarder les données", error);
    }
  };

  const getScopeEmissionsFromChain = async (walletAddress) => {
    try {
      const address = carbonContract[0];
      const carbon = new web3.eth.Contract(carbonABI, address);

      const scope1 = await carbon.methods
        .getScope1Emissions(walletAddress)
        .call();
      const scope2 = await carbon.methods
        .getScope2Emissions(walletAddress)
        .call();
      const scope3 = await carbon.methods
        .getScope3Emissions(walletAddress)
        .call();

      setScopesData([
        { name: "Scope 1", CO2e: Number(scope1) / 100 },
        { name: "Scope 2", CO2e: Number(scope2) / 100 },
        { name: "Scope 3", CO2e: Number(scope3) / 100 },
      ]);
    } catch (error) {
      console.error("Impossible de récupérer les émissions des scopes", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      getScopeEmissionsFromChain(walletAddress);
    }
  }, [walletAddress]);

  let totalProd = 130000;

  return (
    <Wrapper>
      <div className="accueil-container">
        <div className="left-panel">
          <div className="card-total">
            <div className="title">
              <p className="title-main">total</p>
              <p className="title-description">
                Emission totale de CO2e en tonnes
              </p>
            </div>
            <div className="number">
              <span className="number-text">
                {(totalEmission / 100).toLocaleString()}
              </span>
            </div>
            <button
              className="btn btn-total"
              onClick={() => {
                getTotalEmissionsFromChain(walletAddress);
              }}
            >
              Obtenir les données
            </button>
          </div>

          <div className="card-emission">
            <div className="title">
              <p className="title-main">Performance</p>
              <p className="title-description">
                Ratio CO2e / tonnes de minerai{" "}
              </p>
            </div>
            <div className="number">
              <span className="number-text">
                {(totalEmission / 100 / 130000).toFixed(2)}
              </span>
            </div>
            <progress
              className="progress-bar"
              value={totalEmission / 100 / 130000}
              max="0.4"
            ></progress>
            <span className="progress-value">
              {((totalEmission / 100 / 130000 / 0.4) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="card-emission">
            <div className="title">
              <p className="title-main">Production de minerai</p>
              <p className="title-description">Tonnes de minerai / an</p>
            </div>
            <div className="number">
              <span className="number-text">{totalProd.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="chart">
            <h3 className="chart-title">Emissions CO2e</h3>
            <p className="chart-description">
              Graphique montre les émissions de CO2e par scope
            </p>
            <ResponsiveContainer width="100%" height={477}>
              <BarChart data={scopesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="CO2e" fill="#beb2fe" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Accueil;
