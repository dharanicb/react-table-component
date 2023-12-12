import React, { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import EditIcon from "../Icons";

const TableRows = ({ data, check, setData, setIncrease }) => {
  const [checked, setCheck] = useState(false);
  const [isEditable, SetEditable] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [count, SetCount] = useState(0);
  const [dataRows, setName] = useState([]);

  const handleChange = (event) => {
    setCheck(event.target.checked);
    SetCount(count + 1);
    setIncrease(count);
  };

  const handleEdit = (id, firstName, lastName, age) => {
    setFirstName(firstName);
    setAge(age);
    setLastName(lastName);
    setUserId(id);
    SetEditable(!isEditable);
  };

  const handleTick = (id) => {
    setUserId(id);
    SetEditable(!isEditable);
    const setData = data.map((eachId) => {
      if (eachId.id === id) {
        // return [
        let obj = {
          ...eachId,
          firstName: firstName,
          lastName: lastName,
          fullName : firstName + " " + lastName,
          age: age,
        };
        return obj;
        // ];
      }
      return eachId;
    });
    console.log("----", setData);
    setName(setData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setName(data);
    }
  }, [data]);

  return (
    <>
      {dataRows.length > 0 &&
        dataRows.map((eachData) =>
          eachData.id === userId ? (
            <tr onClick={() => setCheck(!checked)}>
              <td>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={check ? check : null}
                />
              </td>
              <td>{eachData.id}</td>
              <td>
                <input
                  type="text"
                  // value={eachData.firstName}
                  value={firstName}
                  onChange={(event) => {
                    // setName((prev) => [
                    //   { ...prev, firstName: event.target.value },
                    // ]);
                    setFirstName(event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  // value={eachData.lastName}
                  value={lastName}
                  onChange={(event) => {
                    // setName((prev) => [
                    //   { ...prev, lastName: event.target.value },
                    // ]);
                    setLastName(event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  // value={eachData.age}
                  value={age}
                  onChange={(event) => {
                    // setName((prev) => [{ ...prev, age: event.target.value }]);
                    setAge(event.target.value);
                  }}
                />
              </td>
              <td>{eachData.fullName}</td>
              <td>
                {isEditable ? (
                  <TiTickOutline
                    onClick={() => handleTick(eachData.id)}
                    className="m-5 "
                  />
                ) : (
                  <EditIcon
                    onClick={() =>
                      handleEdit(
                        eachData.id,
                        eachData.firstName,
                        eachData.lastName,
                        eachData.age
                      )
                    }
                    className="m-5 "
                  />
                )}
              </td>
            </tr>
          ) : (
            <tr onClick={() => setCheck(!checked)} key={eachData.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={check ? check : null}
                />
              </td>
              <td>{eachData.id}</td>
              <td>{eachData.firstName}</td>
              <td>{eachData.lastName}</td>
              <td>{eachData.age}</td>
              <td>{eachData.fullName}</td>
              <td>
                {/* {!isEditable && ( */}
                <EditIcon
                  onClick={() =>
                    handleEdit(
                      eachData.id,
                      eachData.firstName,
                      eachData.lastName,
                      eachData.age
                    )
                  }
                  className="m-5 "
                />
                {/* )} */}
              </td>
            </tr>
          )
        )}
      <tr className="text-white">{`'   `}</tr>
    </>
  );
};

export default TableRows;

// {
//   /* data.map((eachData) => (
//           <tr key={eachData.id}>
//             <td>
//             <input type={`checkbox`} onChange={handleChange} checked = {check ? check : null}/>
//             </td>
//             {Object.keys(eachData).map((each, index) => (
//               <td key = {index}>{eachData[each]}</td>
//             ))}
//           </tr>
//         ))} */
// }
