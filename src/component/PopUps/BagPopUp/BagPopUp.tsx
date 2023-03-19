import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../data/store";
import OrderCardDish from "../../Cards/CardDish/orderCardDish/orderCardDish";
import { MainButton, SecondaryButton } from "../../Styled_Components/Buttons";
import { IUsers } from "../../Types/Interfaces/IUser";
import "./BagPopUp.css";
interface IBagPopUp {
  closingFunc: () => void;
  ButtonRef: React.RefObject<HTMLButtonElement>;
}
const BagPopUp: React.FC<IBagPopUp> = (props) => {
  const navigation: any = useNavigate();
  const [hasOrder, setHasOrder] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const needToClose = (event: MouseEvent) => {
    const target = event.target as Element | null;
    return (
      !(target?.parentElement === props.ButtonRef.current?.parentElement) &&
      modalRef.current &&
      !modalRef.current.contains(target)
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (needToClose(event)) {
      props.closingFunc();
      document.removeEventListener("click", handleClickOutside);
    }
  };
  let totalOrderPrice: number = 0;
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    if (orders.length > 0) {
      setHasOrder(true);
      setRestaurantName(
        restaurantList.find((e) => e._id === orders[0].restaurantId)?.name || ""
      );
    }
  }, []);
  const orders = useSelector((state: RootState) => state.order.value);
  const user: IUsers | null = JSON.parse(
    sessionStorage.getItem("user") ?? "null"
  );
  const restaurantList = useSelector(
    (state: RootState) => state.restaurants.restaurantsData
  );
  return (
    <div className="BagPopUp" ref={modalRef}>
      {orders.length === 0 ? (
        <img
          src="/imges/emptyBagMesseg.svg"
          alt="emptyBag"
          className="emptyBag"
        />
      ) : (
        <div className="orderBody">
          <h3>YOUR ORDER</h3>
          <h4>{restaurantName}</h4>
          <div className="dishCardContinuer">
            {orders.map((e) => {
              totalOrderPrice += e.price * e.amount;
              return <OrderCardDish value={e} />;
            })}
          </div>
          <div className="priceOrder">
            <hr />
            <span>₪{totalOrderPrice}</span>
            <hr />
          </div>
          <span>Add A Comment</span>
          <textarea
            className="p"
            placeholder="Special requests, allergies, detary restrictions, etc."
          />
          <MainButton
            isActive={true}
            onClick={() => {
              !user && navigation("/singIn");
            }}
          >
            Checkout
          </MainButton>
        </div>
      )}
      <SecondaryButton
        isActive={true}
        className={!hasOrder ? "emptyLIstButton" : ""}
        onClick={() => {
          !user && navigation("/singIn");
        }}
      >
        Order history
      </SecondaryButton>
    </div>
  );
};

export default BagPopUp;
