import React from "react";
import "./tempature.css";

const Tempature = ({ data }) => {
  return (
    <div className={data.win ? "result-box-win" : "result-box"}>
      <div>{data.value}</div>
      <div>Was {data.realValue}</div>
    </div>
  );
};

export default Tempature;
