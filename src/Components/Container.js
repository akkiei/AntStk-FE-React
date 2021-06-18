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
    setShow(!show);
    // <ShowData empDetails={employeeData} />;
    console.log(employeeData);
  };
  return (
    <div>
      <div className="container">
        <Form addEmp={addEmployeeData} />
        <button onClick={showData}>{ show && employeeData.length> 0 ? "Hide Data" : "View Data"}</button>
      </div>
      <div className="container">
        {show && <ShowData empDetails={employeeData} />}
      </div>
    </div>
  );
};
export default Container;
