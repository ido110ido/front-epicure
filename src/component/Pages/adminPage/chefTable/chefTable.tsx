import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allChefs } from "../../../../data/chefSlicer";
import { RootState } from "../../../../data/store";
import "./chefTable.css";
const ChefTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allChefs());
  }, []);
  // handle adding chef
  const chefs = useSelector((state: RootState) => state.chefs.value);
  return (
    <div className="table body">
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Visited</th>
          <th>img</th>
          <th>Start Date</th>
          <th>About</th>
        </tr>
        {chefs.map((chef) => (
          <tr className="line">
            <td>{chef.firstName}</td>
            <td>{chef.lastName}</td>
            <td>{chef.visited}</td>
            <td>{chef.img}</td>
            <td>{chef.startDate}</td>
            <td>{chef.about}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default ChefTable;
