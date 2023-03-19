import ReactSlider from "react-slider";
import { useState } from "react";
import "./DistanceFilter.css";
const DistanceFilter = () => {
  const [distance, setDistance] = useState<number>(4);

  return (
    <div className="distanceRenege  ">
      <h4>Distance</h4>
      <div className="SliderContainer">
        <div className="SliderValues">
          <span>My location</span>
          <span>{distance} km</span>
        </div>
        <div className="sliderDiv">
          <div className="locationPoint" />
          <ReactSlider
            defaultValue={distance}
            className="slider"
            trackClassName="tracker"
            min={1}
            max={50}
            withTracks={true}
            renderThumb={(props) => {
              return <div {...props} className="thumb"></div>;
            }}
            renderTrack={(props) => {
              return <div {...props} className="track"></div>;
            }}
            onChange={(value: number) => {
              setDistance(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DistanceFilter;
