import { CleanButton, SwitchButton } from "../../Styled_Components/Buttons";
import { FilterButtonLine } from "../../Styled_Components/filterButtonLine";
import {
  GridCards,
  PageCenterStyle,
} from "../../Styled_Components/gridPagesStyles";
import data from "../../../data/resturants.json";
import ChefCard from "../../Cards/ChefCard/ChefCard";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../data/store";
import { allChefs, newChefs, popularChefs } from "../../../data/chefSlicer";
import PopUpChefAdding from "../../PopUps/chefAddPopUp/chefAddPopUp";
import ChefTable from "./chefTable/chefTable";
const AdminPage = () => {
  const dispatch = useDispatch();
  const [withFilter, setFilter] = useState("chefs");

  useEffect(() => {
    dispatch(allChefs());
  }, []);

  // handle adding chef
  const chefs = useSelector((state: RootState) => state.chefs.value);
  return (
    <PageCenterStyle>
      <h1>ADMIN PAGE</h1>
      <br />
      <FilterButtonLine>
        <SwitchButton
          name="chefs"
          bold={withFilter === "chefs"}
          onClick={(value: any) => {
            setFilter(value.target.name);
          }}
        >
          chefs
        </SwitchButton>
        <SwitchButton
          name="restaurants"
          bold={withFilter === "restaurants"}
          onClick={(value: any) => {
            setFilter(value.target.name);
          }}
        >
          restaurants
        </SwitchButton>
        <SwitchButton
          name="dishes"
          bold={withFilter === "dishes"}
          onClick={(value: any) => {
            setFilter(value.target.name);
          }}
        >
          dishes
        </SwitchButton>
      </FilterButtonLine>
      <ChefTable />
    </PageCenterStyle>
  );
};
export default AdminPage;
