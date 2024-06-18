import React, { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import carbonABI from "../abis/carbonABI.json";
import { carbonContract } from "../abis/contractAddress.json";
import WalletContext from "../context/walletContext";
import Wrapper from "../assets/wrappers/Bilan";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Loading } from "../components";

const web3 = new Web3(window.ethereum);

const Bilan = () => {
  const { walletAddress } = useContext(WalletContext);
  const [emissionsData, setEmissionsData] = useState(null);
  const [totalEmission, setTotalEmission] = useState(0);

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

  const fetchEmissionsData = async (walletAddress) => {
    try {
      const address = carbonContract[0];
      const carbon = new web3.eth.Contract(carbonABI, address);

      const emissionsData = {
        combustiblesSourcesFixes: Number(
          await carbon.methods
            .getCombustiblesFossilesSourcesFixes(walletAddress)
            .call()
        ),
        combustiblesSourcesMobiles: Number(
          await carbon.methods
            .getCombustiblesFossilesSourcesMobiles(walletAddress)
            .call()
        ),
        productionElectriciteSourcesFixes: Number(
          await carbon.methods
            .getProductionElectriciteCombustiblesSourcesFixes(walletAddress)
            .call()
        ),
        chauffageFossile: Number(
          await carbon.methods.getChauffageFossile(walletAddress).call()
        ),
        explosifs: Number(
          await carbon.methods.getExplosifs(walletAddress).call()
        ),
        fournisseurElectricite: Number(
          await carbon.methods.getFournisseur(walletAddress).call()
        ),
        pertesEnLigneElectricite: Number(
          await carbon.methods.getPertesEnLigne(walletAddress).call()
        ),
        emissionsFugitivesClimatisation: Number(
          await carbon.methods.getClimatisation(walletAddress).call()
        ),
        emissionsFugitivesTransportElectricite: Number(
          await carbon.methods.getTransportElectricite(walletAddress).call()
        ),
        traitement: Number(
          await carbon.methods.getTraitementEauxUsees(walletAddress).call()
        ),
        metaux: Number(await carbon.methods.getMetaux(walletAddress).call()),
        produitsChimiques: Number(
          await carbon.methods.getProduitsChimiques(walletAddress).call()
        ),
        plastiques: Number(
          await carbon.methods.getPlastiques(walletAddress).call()
        ),
        hydrogene: Number(
          await carbon.methods.getHydrogene(walletAddress).call()
        ),
        matiereOrganique: Number(
          await carbon.methods.getMatiereOrganique(walletAddress).call()
        ),
        autresMateriaux: Number(
          await carbon.methods.getAutresMateriaux(walletAddress).call()
        ),
        perteStocksDeboisement: Number(
          await carbon.methods.getPerteStocks(walletAddress).call()
        ),
        perteSequestrationDeboisement: Number(
          await carbon.methods.getPerteSequestration(walletAddress).call()
        ),
        fluxRoutier: Number(
          await carbon.methods.getFluxRoutier(walletAddress).call()
        ),
        fluxFerroviaire: Number(
          await carbon.methods.getFluxFerroviaire(walletAddress).call()
        ),
        fluxMaritime: Number(
          await carbon.methods.getFluxMaritime(walletAddress).call()
        ),
        deplacementsDomicileTravail: Number(
          await carbon.methods.getDomicileTravail(walletAddress).call()
        ),
        voyagesAffaires: Number(
          await carbon.methods.getTravail(walletAddress).call()
        ),
      };

      setEmissionsData(emissionsData);
    } catch (error) {
      console.error("Impossible de récupérer les données d'émissions", error);
    }
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Insert spaces before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      .replace(/combustibles Sources Fixes/g, "Combustibles Sources Fixes")
      .replace(/combustibles Sources Mobiles/g, "Combustibles Sources Mobiles")
      .replace(
        /production Electricite Sources Fixes/g,
        "Production Electricité Sources Fixes"
      )
      .replace(/chauffage Fossile/g, "Chauffage Fossile")
      .replace(/explosifs/g, "Explosifs")
      .replace(/fournisseur Electricite/g, "Fournisseur d'Electricité")
      .replace(/pertes En Ligne Electricite/g, "Pertes En Ligne d'Electricité")
      .replace(
        /emissions Fugitives Climatisation/g,
        "Emissions Fugitives Climatisation"
      )
      .replace(
        /emissions Fugitives Transport Electricite/g,
        "Emissions Fugitives Transport Électricité"
      )
      .replace(/traitement/g, "Traitement des eaux usées")
      .replace(/metaux/g, "Métaux")
      .replace(/produits Chimiques/g, "Produits Chimiques")
      .replace(/plastiques/g, "Plastiques")
      .replace(/hydrogene/g, "Hydrogène")
      .replace(/matiere Organique/g, "Matière Organique")
      .replace(/autres Materiaux/g, "Autres Matériaux")
      .replace(/perte Stocks Deboisement/g, "Perte Stocks Déboisement")
      .replace(
        /perte Sequestration Deboisement/g,
        "Perte Séquestration Déboisement"
      )
      .replace(/flux Routier/g, "Flux Routier")
      .replace(/flux Ferroviaire/g, "Flux Ferroviaire")
      .replace(/flux Maritime/g, "Flux Maritime")
      .replace(
        /deplacements Domicile Travail/g,
        "Déplacements Domicile-Travail"
      )
      .replace(/voyages Affaires/g, "Voyages d'affaires");
  };

  useEffect(() => {
    if (walletAddress) {
      getTotalEmissionsFromChain(walletAddress);
      fetchEmissionsData(walletAddress);
    }
  }, [walletAddress]);

  const pieData = emissionsData
    ? Object.entries(emissionsData).map(([key, value]) => ({
        name: formatKey(key),
        value: parseFloat(((value / totalEmission) * 100).toFixed(2)),
      }))
    : [];

  const COLORS = [
    "#beb2fe",
    "#d1c4ff",
    "#e4d6ff",
    "#f6e8ff",
    "#d9caff",
    "#c4b6ff",
    "#af9dff",
    "#9a84ff",
    "#856bff",
    "#7052ff",
    "#5b39ff",
    "#4620ff",
    "#3107ff",
    "#1c00ff",
    "#0700e6",
    "#0600b3",
    "#050080",
    "#04004d",
    "#03001a",
    "#020000",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    if (percent * 100 < 1) return null; // Ne pas afficher les valeurs en dessous de 1%
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const CustomizedLegend = (props) => {
    <Legend {...props} wrapperStyle={{ fontFamily: "revert" }} />;
  };

  return (
    <Wrapper>
      <div className="bilan-wrapper">
        {emissionsData ? (
          <>
            <div className="left-panel">
              <table className="bilan-table">
                <thead>
                  <tr>
                    <th>Type d'émission</th>
                    <th>Valeur (CO2e)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(emissionsData).map(([key, value]) => (
                    <tr key={key}>
                      <td>{formatKey(key)}</td>
                      <td>{(value / 100).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-emission">
                <h3>Emission totale de CO2e</h3>
                <p>{(totalEmission / 100).toLocaleString()} tonnes</p>
              </div>
            </div>
            <div className="right-panel">
              <h4>Répartition des émissions de CO2e</h4>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <section className="loading-screen">
            <div className="loading-container">
              <Loading center={true} />
              <p>Chargement des données d'émissions...</p>
            </div>
          </section>
        )}
      </div>
    </Wrapper>
  );
};

export default Bilan;
