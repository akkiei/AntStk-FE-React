import React from "react";
import "../App.css";

function downloadCsv(filename = "test", json) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const tempJson = JSON.parse(JSON.stringify(json));
  const modJson = tempJson.map((emp) => {
    emp.Skills = emp.Skills.map((skill) => skill.val).join();
    if (emp.dob) {
      const date = new Date(emp.dob);
      const day = date.getDate();
      const month = date.getMonth();
      const monthName = months[month];
      const year = date.getFullYear();
      emp.dob = `${day}-${monthName}-${year}`;
    }
    return emp;
  });
  /* 
        For File Download     
        https://stackoverflow.com/questions/55127865/react-writing-form-data-to-file
        For MiMe
        https://www.freeformatter.com/mime-types-list.html#mime-types-list
 */
  console.log(modJson);
  const blob = new Blob([JSON.stringify(modJson)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

const ShowData = (props) => {
  const { empDetails } = props;
  return (
    <div className="showData">
      {empDetails.map((emp, index) => {
        const empContactMap = emp?.Contact.map((con) => {
          return (
            <h5 style={{textAlign: 'center'}}>
              {`${con?.type} - ${con?.number}`}
            </h5>
          );
        });
        return (
          <div className="eachEmp" key={`${emp}-${index}`}>
            <h3>{`Employee #${index + 1}`}</h3>
            <h4>{`Name: ${"     "} ${emp?.name}`}</h4>
            <h4>{`Designation:${"     "}${emp?.designation}`}</h4>
            <h4>{`Contact: ${"     "}`}{empContactMap.map((empCon) => empCon)}</h4>
            
            {/* <h4>{`Contact: ${"     "} ${empContactMap?.join()}`}</h4> */}

            <h4>{`Skills:${"     "}${
              Array.isArray(emp.Skills)
                ? emp.Skills.length === 1
                  ? emp?.Skills[0].val
                  : emp.Skills.map((skill) => skill.val).join()
                : ""
            }`}</h4>
            <h4>{`DOB:${"     "}${emp.dob}`}</h4>
          </div>
        );
      })}
      {empDetails?.length > 0 && (
        <button className="download" onClick={(e) => downloadCsv("", empDetails)}>
          Download Data
        </button>
      )}
    </div>
  );
};
export default ShowData;
