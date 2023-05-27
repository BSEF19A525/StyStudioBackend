import React from "react";
const Salons = (props) => {
  return (
    <div className="salon-card">
      <div>
        <div key={props.id}>
          <img src={props.image} alt="salon img" className="salon-image"></img>

          {/*<div className="salon-content">*/}
          <h3 className="salon-name"> {props.name}</h3>
          <p className="salon-description"> {props.description}</p>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Salons;
