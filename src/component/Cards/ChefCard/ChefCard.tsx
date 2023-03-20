import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatedChefs } from "../../../data/chefSlicer";
import { CleanButton } from "../../Styled_Components/Buttons";
import { IChefCard } from "../../Types/Interfaces/IChef";
import "./ChefCard.css";
const ChefCard: React.FC<IChefCard> = (props) => {
  const dispatch = useDispatch();
  const chef = props.chefData;
  const user = JSON.parse(sessionStorage.getItem("user") ?? "null");
  const [cardHeight, setCardHeight] = useState<string>("372px");
  const [cardOpacity, setCardOpacity] = useState<string>("1");
  const delateChef = async () => {
    try {
      const chefsAfterDelete = await axios.delete(
        "http://localhost:8000/chefs",
        {
          data: {
            id: chef._id,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCardHeight("0");
      setCardOpacity("0");
      dispatch(updatedChefs(chefsAfterDelete.data.data));
    } catch (error: any) {
      alert(error.response.data.message);
      return [];
    }
  };
  return (
    <div
      className="cardChef"
      style={{ height: cardHeight, opacity: cardOpacity }}
    >
      <img className="chefImg" src={chef.img} alt={chef.firstName} />
      {user != null && (
        <CleanButton id="chefRemoveButton" onClick={delateChef}>
          X
        </CleanButton>
      )}
      <div className="buttomCard">
        <h3>{chef.firstName + " " + chef.lastName}</h3>
      </div>
    </div>
  );
};
export default ChefCard;
