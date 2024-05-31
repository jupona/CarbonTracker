import React from "react";
import Wrapper from "../assets/wrappers/Accueil";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { dataHistogramme } from "../utils/charts";

const RADIAN = Math.PI / 180;
const data = [
  { name: "A", value: 80, color: "#ff0000" },
  { name: "B", value: 45, color: "#00ff00" },
  { name: "C", value: 25, color: "#0000ff" },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
const value = 50;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const Accueil = () => {
  const entreprise = "Sayona North American Lithium";
  return (
    <Wrapper>
      <div className="accueil-container">
        <div className="left-panel">
          <div className="card-total">
            <div className="title">total</div>
            <div className="number">
              <span className="number-text">29000</span>
            </div>
            <p>{`Emission CO2e (t)`}</p>
          </div>

          <div className="card-emission">
            <div className="title">
              {`Emissions CO2e (t) par tonnes de minerai (t)`}
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data}
                  cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {needle(value, data, cx, cy, iR, oR, "#d0d000")}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="right-panel">
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart width={500} height={500} data={dataHistogramme}>
            <XAxis dataKey="name" />
            <YAxis dataKey="CO2e" />
            <Bar dataKey="CO2e" fill="#8884d8" />
          </BarChart>
          {/* </ResponsiveContainer> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Accueil;
