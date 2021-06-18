import React, { useState } from "react";
import "../App.css";
import Form from "./Form";
import ShowData from "./ShowData";
const Container = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [show, setShow] = useState(false);

  const addEmployeeData = (data) => {
    setEmployeeData([...employeeData, data]);
  };
  const showData = () => {
    if (employeeData.length === 0) {
      alert("There are no records");
    } else setShow(!show);
    // <ShowData empDetails={employeeData} />;
    console.log(employeeData);
  };
  return (
    <div className="topLayer">
      <div className="container">
        <Form addEmp={addEmployeeData} />
        <button className="viewBtn" onClick={showData}>{show ? "Hide Data" : "View Data"}</button>
      </div>
      <div className="containerBottom">
        {show && employeeData.length > 0 ? (
          <ShowData empDetails={employeeData} />
        ) : `There are ${employeeData.length} record(s). Click On View Data to see them.` }
      </div>
    </div>
  );
};
export default Container;
