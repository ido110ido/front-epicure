import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import InputFiled from "../../inputFiled/inputFiled";
import "./restaurantAddPopUp.css";
import { CleanButton, MainButton } from "../../Styled_Components/Buttons";
import "react-datepicker/dist/react-datepicker.css";
import {
  BackGroundWindows,
  DisplayPopUpWindow,
} from "../../Styled_Components/PopUpWindows";
import { RootState } from "../../../data/store";
import { updatedRestaurant } from "../../../data/resturantSlicer";
interface IPopUpRestaurantAdding {
  onSubmit: () => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const RestaurantAddPopUp: React.FC<IPopUpRestaurantAdding> = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const chefs = useSelector((state: RootState) => state.chefs.chefsList);
  const options = chefs.map((chef) => {
    return {
      value: chef._id,
      label: chef.firstName + " " + chef.lastName,
    };
  });

  const [formData, setFormData] = useState({
    chefId: "",
    img: "",
    name: "",
    startDate: date.toLocaleDateString(),
    about: "",
    openHour: 12,
    closeHour: 12,
    longitude: 32.070167,
    latitude: 34.770316,
    rating: 3,
  });
  const addingRestaurant = async () => {
    try {
      const updatedRestaurantsList = await axios.post(
        "http://localhost:8000/restaurants/add",
        {
          data: formData,
        }
      );
      dispatch(updatedRestaurant(updatedRestaurantsList.data.data));
      props.onSubmit();
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
      return [];
    }
  };
  const handleInputChange = (value: any, keyFiled: string) => {
    setFormData({
      ...formData,
      [keyFiled]: value,
    });
  };

  return (
    <BackGroundWindows ref={props.forwardRef} onClick={props.onClick}>
      <DisplayPopUpWindow className="scroll">
        <h1 className="titleAdd">add restaurant</h1>
        <InputFiled
          label={"name"}
          onChange={(value) => handleInputChange(value, "name")}
        />
        <InputFiled
          label={"image url"}
          onChange={(value) => handleInputChange(value, "img")}
        />
        <div className="selectHours">
          <InputFiled
            extraClassName="hours"
            label={"open Hour"}
            type="number"
            onChange={(value) => handleInputChange(value, "openHour")}
          />
          <span>-</span>
          <InputFiled
            extraClassName="hours"
            label={"close Hour"}
            type="number"
            onChange={(value) => handleInputChange(value, "closeHour")}
          />
        </div>
        <InputFiled
          extraClassName="hours"
          label={"rating"}
          type="number"
          onChange={(value) => handleInputChange(value, "rating")}
        />
        <InputFiled
          label={"about"}
          onChange={(value) => handleInputChange(value, "about")}
        />
        <label>Start Date</label>
        <DatePicker
          selected={date}
          className="datePicker"
          onChange={(date) => {
            date && setDate(date);
            handleInputChange(date?.toLocaleDateString(), "startDate");
          }}
        />
        <Select
          options={options}
          onChange={(value) => handleInputChange(value?.value, "chefId")}
        />
        <MainButton isActive={true} onClick={addingRestaurant}>
          Create Restaurants
        </MainButton>
      </DisplayPopUpWindow>
    </BackGroundWindows>
  );
};

export default RestaurantAddPopUp;
