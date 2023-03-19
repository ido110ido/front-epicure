import ReactSlider from "react-slider";
import { useState } from "react";
import "./PriceRangFilter.css";
const PriceRangFilter = () => {
  const [min, setMin] = useState<number>(12);
  const [max, setMax] = useState<number>(357);

  return (
    <div className="priceRenege">
      <h4>Price Range Selected</h4>
      <span>
        <img src="\imges\icons\shekel.svg" alt="₪" />
        {min} - <img src="\imges\icons\shekel.svg" alt="₪" />
        {max}
      </span>
      <div className="SliderContainer">
        <div className="SliderValues">
          <span>
            <img src="\imges\icons\shekel.svg" alt="₪" />
            {min}
          </span>
          <span>
            <img src="\imges\icons\shekel.svg" alt="₪" />
            {max}
          </span>
        </div>
        <ReactSlider
          defaultValue={[min, max]}
          className="slider"
          trackClassName="tracker"
          min={12}
          max={357}
          minDistance={10}
          withTracks={true}
          pearling={true}
          renderThumb={(props) => {
            return <div {...props} className="thumb"></div>;
          }}
          renderTrack={(props) => {
            return <div {...props} className="track"></div>;
          }}
          onChange={([min, max]) => {
            setMin(min);
            setMax(max);
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangFilter;
