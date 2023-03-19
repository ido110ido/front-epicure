import React, { useEffect, useState, useRef } from "react";
import {
  FilterButtonLine,
  FilterRengeLine as FilterRenegeLine,
} from "../../Styled_Components/filterButtonLine";
import {
  GridCards,
  PageCenterStyle,
} from "../../Styled_Components/gridPagesStyles";
import data from "../../../data/resturants.json";
import CardResturant from "../../Cards/CardResturant/CardResturant";
import { CleanButton, SwitchButton } from "../../Styled_Components/Buttons";
import FilterButtom from "../../Styled_Components/FilterButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../data/store";
import {
  all,
  newRestaurants,
  openRestaurants,
  popularRestaurants,
} from "../../../data/resturantSlicer";
import { IRestaurant } from "../../Types/Interfaces/IRestaurantCard";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getChefName } from "../../../data/chefSlicer";
import PriceRangFilter from "../../filtersCards/PriceRangFilter/PriceRangeFilter";
import DistanceFilter from "../../filtersCards/DistanceFilter/DistanceFilter";
import RatingFilter from "../../filtersCards/RatingFilter/RatingFilter";
// import MapComponent from "../../Map/GoogleMap";
import "./ResturantsPage.css";
import RestaurantAddPopUp from "../../PopUps/restaurantAddPopUp/restaurantAddPopUp";
const ResturantsPage = () => {
  const navigation: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  // handle adding Restaurants
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: React.MouseEvent) => {
    modalRef.current === event.target && setIsOpen(false);
  };
  useEffect(() => {
    dispatch(all());
  }, []);
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const handleMapView = (name: string) => {
    name === "MapView" ? setMapView(true) : setMapView(false);
  };
  const [withFilter, setFilter] = useState<string>("all");
  const [mapView, setMapView] = useState<boolean>(false);
  return (
    <PageCenterStyle>
      <FilterButtonLine>
        <SwitchButton
          name="all"
          bold={withFilter === "all"}
          onClick={(value: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(all());
            setFilter(value.currentTarget.name);
            handleMapView(value.currentTarget.name);
          }}
        >
          All
        </SwitchButton>
        <SwitchButton
          name="New"
          bold={withFilter === "New"}
          onClick={(value: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(newRestaurants());
            setFilter(value.currentTarget.name);
            handleMapView(value.currentTarget.name);
          }}
        >
          New
        </SwitchButton>
        <SwitchButton
          name="MostPopular"
          bold={withFilter === "MostPopular"}
          onClick={(value: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(popularRestaurants());
            setFilter(value.currentTarget.name);
            handleMapView(value.currentTarget.name);
          }}
        >
          Most Popular
        </SwitchButton>
        <SwitchButton
          name="OpenNow"
          bold={withFilter === "OpenNow"}
          onClick={(value: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(openRestaurants());
            setFilter(value.currentTarget.name);
            handleMapView(value.currentTarget.name);
          }}
        >
          Open Now
        </SwitchButton>
        <SwitchButton
          name="MapView"
          bold={withFilter === "MapView"}
          onClick={(value: React.MouseEvent<HTMLButtonElement>) => {
            setFilter(value.currentTarget.name);
            handleMapView(value.currentTarget.name);
          }}
        >
          Map View
        </SwitchButton>
        <CleanButton onClick={() => setIsOpen(true)}>Add Resturant</CleanButton>
      </FilterButtonLine>
      <FilterRenegeLine>
        <FilterButtom text={"Price Range"} children={<PriceRangFilter />} />
        <FilterButtom text={"Distance"} children={<DistanceFilter />} />
        <FilterButtom text={"Rating"} children={<RatingFilter />} />
      </FilterRenegeLine>
      {!mapView ? (
        <GridCards cellSize={380}>
          {restaurants.map((restaurant: IRestaurant, index: number) => {
            let chef = data.chef.find((chef) => chef._id === restaurant.chefId);
            let name: string = chef?.firstName + " " + chef?.lastName;
            return (
              <CardResturant
                key={index}
                resturantData={restaurant}
                chef={name}
                onClick={() => {
                  dispatch(getChefName(restaurant.chefId));
                  navigation(`${restaurant._id}`);
                }}
              />
            );
          })}
        </GridCards>
      ) : (
        <div className="mapDiv">{/* <MapComponent /> */}</div>
      )}
      {isOpen && (
        <RestaurantAddPopUp
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
export default ResturantsPage;

//  AIzaSyDMnu3kPUVDvMjDpLjAbdOvuzx6pHaZPXg
