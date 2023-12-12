import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const TableCols = ({onSort, cols,setCheck}) => {
  function handleChange(event) {
    setCheck(event.target.checked)
  }

const onAscendingOrder = (name,order) => {
  onSort(name,order)
}
const onDescendingOrder = (name,order) => {
  onSort(name,order)
}

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={handleChange}/>
      </td>
      {cols &&
        cols.map((each) => (
          <th key={each.id}>
            <div className="flex justify-center">
              <p className="self-center">{each.headName}</p>
              <div className="flex flex-col self-center">
                <button
                  type="button"
                  className="ml-[15px] font-light text-[25px] hover:text-[#000000]"
                >
                  <MdOutlineKeyboardArrowUp onClick={()=>onAscendingOrder(each.name, "asc")}/>
                </button>
                <button
                  type="button"
                  className="ml-[15px] font-light text-[25px] hover:text-[#000000]"
                >
                  <MdOutlineKeyboardArrowDown onClick={()=>onDescendingOrder(each.name,"desc")}/>
                </button>
              </div>
            </div>
          </th>
        ))}
    </tr>
  );
};

export default TableCols;
