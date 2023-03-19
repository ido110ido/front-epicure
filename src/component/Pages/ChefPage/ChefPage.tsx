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
const ChafPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allChefs());
  }, []);

  // handle adding chef
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: React.MouseEvent) => {
    modalRef.current === event.target && setIsOpen(false);
  };
  const chefs = useSelector((state: RootState) => state.chefs.value);
  const [withFilter, setFilter] = useState("all");
  return (
    <PageCenterStyle>
      <FilterButtonLine>
        <SwitchButton
          name="all"
          bold={withFilter === "all"}
          onClick={(value: any) => {
            setFilter(value.target.name);
            dispatch(allChefs());
          }}
        >
          All
        </SwitchButton>
        <SwitchButton
          name="New"
          bold={withFilter === "New"}
          onClick={(value: any) => {
            setFilter(value.target.name);
            dispatch(newChefs());
          }}
        >
          New
        </SwitchButton>
        <SwitchButton
          name="MostViewed"
          bold={withFilter === "MostViewed"}
          onClick={(value: any) => {
            setFilter(value.target.name);
            dispatch(popularChefs());
          }}
        >
          Most Viewed
        </SwitchButton>
        <CleanButton onClick={() => setIsOpen(true)}>Add Chef</CleanButton>
      </FilterButtonLine>
      <GridCards cellSize={478}>
        {chefs.map((chef, index: number) => {
          return <ChefCard key={index} chefData={chef} />;
        })}
      </GridCards>
      {isOpen && (
        <PopUpChefAdding
          onSubmit={() => {
            setIsOpen(false);
          }}
          onClick={handleClickOutside}
          forwardRef={modalRef}
        />
      )}
    </PageCenterStyle>
  );
};
export default ChafPage;
