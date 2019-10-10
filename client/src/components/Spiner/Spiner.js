import React from "react";

import "./Spiner.css";

const spiner = () => (
  <div className="spiner">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);

export default spiner;
