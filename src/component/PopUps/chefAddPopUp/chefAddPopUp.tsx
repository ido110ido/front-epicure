import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { updatedChefs } from "../../../data/chefSlicer";
import InputFiled from "../../inputFiled/inputFiled";
import "./chefAddPopUp.css";
import { CleanButton, MainButton } from "../../Styled_Components/Buttons";
import "react-datepicker/dist/react-datepicker.css";
import {
  BackGroundWindows,
  DisplayPopUpWindow,
} from "../../Styled_Components/PopUpWindows";
import { IChef } from "../../Types/Interfaces/IChef";
interface IPopUpChefAdding {
  onSubmit: () => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const PopUpChefAdding: React.FC<IPopUpChefAdding> = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    img: "",
    firstName: "",
    lastName: "",
    startDate: date.toLocaleDateString(),
    about: "",
  });
  const addingChef = async () => {
    try {
      const updatedChefsList = await axios.post(
        "http://localhost:8000/chefs/add",
        {
          data: formData,
        }
      );
      dispatch(updatedChefs(updatedChefsList.data.data));
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
        <InputFiled
          label={"first Name"}
          onChange={(value) => handleInputChange(value, "firstName")}
        />
        <InputFiled
          label={"last Name"}
          onChange={(value) => handleInputChange(value, "lastName")}
        />
        <InputFiled
          label={"image url"}
          onChange={(value) => handleInputChange(value, "img")}
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
        <MainButton isActive={true} onClick={addingChef}>
          Create Chef
        </MainButton>
      </DisplayPopUpWindow>
    </BackGroundWindows>
  );
};

export default PopUpChefAdding;
