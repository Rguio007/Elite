import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const CharacterCard = (props) => {
    return (
        <div className="card col-2 mx-2">
        <img src={props.character.image} className="card-img-top p-2" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.character.name}</h5>
          <p className="card-text" >
          Status: {props.character.status}
        </p>
        <p className="card-text" >
          Species: {props.character.species}
        </p>
        <p className="card-text">
          Origin: {props.character.origin.name}
        </p>
        </div>
      </div>
    );
  };
  
  export default CharacterCard;