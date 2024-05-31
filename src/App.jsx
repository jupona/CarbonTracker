import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Accueil,
  Bilan,
  Calcul,
  Combustibles,
  Deboisement,
  Dechets,
  Deplacements,
  EauxUsee,
  Electricite,
  Expedition,
  Halocarbures,
  Intrants,
  Layout,
} from "./pages";
import Dechet from "./pages/Dechets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Accueil />,
      },
      {
        path: "calcul",
        element: <Calcul />,
        children: [
          {
            index: true,
            element: <Combustibles />,
          },
          {
            path: "electricite",
            element: <Electricite />,
          },
          {
            path: "halocarbures",
            element: <Halocarbures />,
          },
          {
            path: "eaux-usee",
            element: <EauxUsee />,
          },
          {
            path: "intrants",
            element: <Intrants />,
          },
          {
            path: "dechets-directs",
            element: <Dechets />,
          },
          {
            path: "deboisement",
            element: <Deboisement />,
          },
          {
            path: "expedition",
            element: <Expedition />,
          },
          {
            path: "deplacements",
            element: <Deplacements />,
          },
        ],
      },
      {
        path: "bilan",
        element: <Bilan />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
