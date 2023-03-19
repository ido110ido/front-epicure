import React, { useState, useRef, useEffect, ReactElement } from "react";
import { CleanButton, IPopDiv } from "./Buttons";

interface IFilterButtom {
  text: string;
  children: ReactElement;
}

const FilterButtom: React.FC<IFilterButtom> = (props) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const popDivRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const needToClose = (event: MouseEvent) => {
    return !(
      popDivRef.current === event.target ||
      buttonRef.current === event.target ||
      popDivRef.current?.contains(event.target as Node)
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (needToClose(event)) {
      setShowWindow(false);
      document.removeEventListener("click", handleClickOutside);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  });

  return (
    <div style={{ position: "relative" }}>
      <CleanButton ref={buttonRef} onClick={() => setShowWindow(!showWindow)}>
        {props.text} <img src="\imges\icons\downArrow.svg" alt="downArrow" />
      </CleanButton>
      {showWindow && (
        <IPopDiv ref={popDivRef}>
          <>{props.children}</>
        </IPopDiv>
      )}
    </div>
  );
};

export default FilterButtom;
