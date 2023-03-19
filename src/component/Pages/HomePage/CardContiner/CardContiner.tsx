import React, { ReactElement, ReactNode } from "react";
import "./CardContiner.css";
interface Interface {
  title: string;
  cards: ReactElement;
  isToAllButton?: boolean;
  buttonText?: string;
  buttonFunc?: () => void;
}

const CardsContiner: React.FC<Interface> = (props) => {
  return (
    <div className="rowAndTitle">
      <h2>{props.title}</h2>
      <div className="row">{props.cards}</div>
      {props.isToAllButton && (
        <div className="textButton" onClick={props.buttonFunc}>
          <span>{props.buttonText || "All"}</span>
          <img src="/imges/icons/arrow.svg" alt="arrow" />
        </div>
      )}
    </div>
  );
};

export default CardsContiner;
