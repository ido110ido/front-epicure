import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDishes, updateDish } from "../../../data/dishSlicer";
import { addDishToOrder } from "../../../data/orderSlicer";
import { CleanButton, MainButton } from "../../Styled_Components/Buttons";
import {
  BackGroundWindows,
  DisplayPopUpWindow,
  InfoDisplayPopUpWindow,
} from "../../Styled_Components/PopUpWindows";
import { IDish, IDishOrder } from "../../Types/Interfaces/IDishCard";
interface IPopUpDish {
  dish: IDish;
  restaurantName: string;
  onSubmit: () => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const PopUpDish: React.FC<IPopUpDish> = (props) => {
  const dish: IDish = props.dish;
  const dispatch = useDispatch();
  //dish side handle
  const [selectedSides, setSelectedOption] = useState("");
  const handleSidesChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  //dish changes handle
  const [changes, setChanges] = useState<string[]>([]);
  const handleChanges = (event: any) => {
    const option = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setChanges([...changes, option]);
    } else {
      setChanges(changes.filter((changes) => changes !== option));
    }
  };
  // handle quantity of dishes
  const [quantity, setQuantity] = useState<number>(1);
  const quantityChange = (action: string) => {
    switch (action) {
      case "+":
        setQuantity(quantity + 1);
        break;
      case "-":
        quantity > 1 && setQuantity(quantity - 1);
        break;
    }
  };
  //create food type image arry to present
  const foodTypeIcons = dish.foodType.map((food: string) => (
    <img
      className="foodTypeLogo"
      src={"/imges/icons/foodTypes/" + food + ".svg"}
      alt={food}
    />
  ));
  //create the ordered dish
  const orderedDish = (): IDishOrder => {
    return {
      name: dish.name,
      _id: dish._id,
      restaurantId: dish.resturantId,
      img: dish.img,
      price: dish.price,
      amount: quantity,
      extraInfo: [selectedSides, ...changes],
    };
  };
  const delateDish = async () => {
    try {
      const dishesAfterDelete = await axios.delete(
        "http://localhost:8000/dishes",
        {
          data: {
            id: dish._id,
          },
        }
      );
      dispatch(updateDish(dishesAfterDelete.data.data));
      dispatch(setDishes({ resturantId: dish._id, DayPart: dish.DayPart }));
      props.onSubmit();
    } catch (error: any) {
      alert(error.response.data);
      return [];
    }
  };
  return (
    <BackGroundWindows ref={props.forwardRef} onClick={props.onClick}>
      <MainButton isActive={true} onClick={delateDish}>
        remove
      </MainButton>
      <DisplayPopUpWindow className="scroll">
        <img className="dishDetailImg" src={dish.img} alt={dish.name} />
        <InfoDisplayPopUpWindow>
          <div className="detailDish">
            <h3> {dish.name}</h3>
            <p>{dish.ingredients.join(",")}</p>
            <div className="foodTypes foodTypesDetailWindows">
              {foodTypeIcons}
            </div>
            <div className="price priceNotAbsolute">
              <hr />
              <span>{dish.price}</span>
              <hr />
            </div>
          </div>
          {/* sides, radio buttons */}
          <div className="choosingBlock">
            <span className="underlineTitle">Choose a side</span>
            {dish.sides.map((side, index: number) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    value={side}
                    checked={selectedSides === side}
                    onChange={handleSidesChange}
                  />
                  {side}
                </label>
              );
            })}
          </div>
          {/* changes , cheack box */}
          <div className="choosingBlock">
            <span className="underlineTitle">Changes</span>
            {dish.changes.map((change, index: number) => {
              return (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={change.changeName}
                    checked={changes.includes(change.changeName)}
                    onChange={handleChanges}
                  />
                  {change.changeName}
                </label>
              );
            })}
          </div>
          <div className="choosingBlock">
            <span className="underlineTitle">Quantity</span>
            <div className="Quantity">
              <CleanButton
                className="focusButton"
                onClick={() => {
                  quantityChange("-");
                }}
              >
                <img src="/imges/icons/substract.svg" alt="substract" />
              </CleanButton>
              <span>{quantity}</span>
              <CleanButton
                className="focusButton"
                onClick={() => {
                  quantityChange("+");
                }}
              >
                <img src="/imges/icons/add.svg" alt="add" />
              </CleanButton>
            </div>
          </div>
          <button
            onClick={() => {
              props.onSubmit();
              try {
                dispatch(addDishToOrder(orderedDish()));
              } catch {
                console.log("npoe");
              }
            }}
          >
            Add to bag
          </button>
        </InfoDisplayPopUpWindow>
      </DisplayPopUpWindow>
    </BackGroundWindows>
  );
};

export default PopUpDish;
