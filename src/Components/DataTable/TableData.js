import React, { useEffect, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import TableCols from "./Table/TableCols";
import TableRows from "./Table/tableRows";
import { data } from "./DummyData";
import { useDispatch } from "react-redux";
import { getData } from "./Reducers";

const Table = () => {
  const [rows, setRows] = useState(data.tableRows);
  const [cols, setCols] = useState(data.tableCols);
  const [searchInput, setSearchInput] = useState("");
  const [countNo, setCount] = useState(rows.length);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [check, setChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(rows.length / rowsPerPage)
  );
  const [userData, setUserData] = useState([]);
  const [userInput, setUserInput] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setUserData(rows.slice(startIndex, endIndex));
    dispatch(getData(userData));

    setTotalPages(Math.ceil(rows.length / rowsPerPage));
  }, [rows, currentPage, rowsPerPage, dispatch]);

  const onPagenate = (action) => {
    if (action === "pre" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (action === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    const filteredData = rows.filter((item) =>
      item.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setUserData(filteredData);
    setSearchInput("");
  };

  const setCheck = (value) => {
    setChecked(value);
  };

let count = 0;

  const setIncrease = (count) => {
   count = count
   console.log(count)
  };

  const onSort = (name, order) => {
    const sortedData = [...userData].sort((a, b) => {
      const valA = a[name];
      const valB = b[name];

      if (order === "asc") {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });

    setUserData(sortedData);
  };

  const handleSelect = (event) => {
    const value = parseInt(event.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleCreate = () => {
    setUserInput(!userInput);
    setCount(prev => prev+ 1)
    const data = userData;
    const obj = {
      id: countNo + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      fullName : firstName + " " + lastName,
      isEditable: false,
    };
    setUserData([...data, obj]);
    setFirstName("")
    setLastName("")
    setAge("")
  };

  return (
    <div className="flex flex-col justify-center w-[90%]">
      <div className="mt-10">
        <div className="flex border border-purple-200 rounded">
          <input
            type="search"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search full name..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button
            className="px-4 text-white bg-purple-600 border-l rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          <div>
            <span>
              <input
                type="text"
                className="border input-div w-[25%]"
                placeholder="Enter your first Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="Enter your last Name"
                className="border input-div1 w-[25%]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </span>
            <span>
              <input
                type="number"
                placeholder="Enter your age"
                className="border input-div1 w-[25%]"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </span>

            <button
              className="px-4 text-white bg-purple-600 border-l rounded create_btn py-4"
              disabled={!firstName && !lastName && !age}
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <table className="border-[2px] border-solid border-[gray]">
        <thead colSpan="6">
          <TableCols onSort={onSort} cols={cols} setCheck={setCheck} />
        </thead>
        <tbody>
          <TableRows
            data={userData}
            check={check}
            cols = {cols}
            setData={setUserData}
            setIncrease={setIncrease}
          />
        </tbody>
        <tfoot className="p-[20px] m-[10px] rows bg-red-50">
          <tr>
            <td className="border-[0px]">
              {check ? `${userData.length} rows selected` : count > 0 ? `${count} rows selected` : " "}
            </td>
            <td className="border-[0px]">{""}</td>
            <td className="border-[0px]">{""}</td>
            <td className="border-[0px]">
              <span className="mr-[15px]">Rows per page</span>
              <select value={rowsPerPage} onChange={handleSelect}>
                {[5, 10].map((option) => (
                  <option key={option} className="border-[0px]">
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td className="border-[0px]">
              {`${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(
                currentPage * rowsPerPage,
                userData.length
              )} `}
              of {rows.length}
            </td>
            <td className="border-[0px]">
              <button
                type="button"
                className="m-[10px]"
                onClick={() => onPagenate("pre")}
                disabled={currentPage === 1}
              >
                <BsFillArrowLeftCircleFill />
              </button>
              <button
                type="button"
                className="m-[10px]"
                onClick={() => onPagenate("next")}
                disabled={currentPage === totalPages}
              >
                <BsFillArrowRightCircleFill />
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
