import React, { useState } from "react";
import "../App.css";
const Form = (props) => {
  const addEmployee = props.addEmp;
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  //   const [contact, setContact] = useState("");
  const [phoneArr, setPhoneArr] = useState([{ number: "", type: "primary" }]);
  const [dob, setDob] = useState("");
  const [skillsArr, setSkillsArr] = useState([{ val: "" }]);

  const addPhoneNo = (e) => {
    if (phoneArr.length >= 4) return;
    const currPhnNo = [...phoneArr];
    currPhnNo.push({ number: "", type: "primary" });
    setPhoneArr(currPhnNo);
  };

  const addSkills = (e) => {
    // if (skillsArr.length >= 4) return;
    const currskillsArr = [...skillsArr];
    currskillsArr.push({ val: "" });
    setSkillsArr(currskillsArr);
  };
  const removePhoneNo = (e, index) => {
    const values = [...phoneArr];
    if (values.length === 1) {
      values[index].number = "";
      values[index].type = "";

      setPhoneArr(values);
    } else {
      values.splice(index, 1);
      setPhoneArr(values);
    }
  };

  const removeSkill = (e, index) => {
    const values = [...skillsArr];
    if (values.length === 1) {
      values[index].val = "";
      setSkillsArr(values);
    } else {
      values.splice(index, 1);
      setSkillsArr(values);
    }
  };
  const changePhoneNo = (index, e) => {
    const phnNumbers = [...phoneArr];
    phnNumbers[index].number = e.target.value;
    setPhoneArr(phnNumbers);
  };
  const changeContactType = (index, e) => {
    const phnNumbers = [...phoneArr];
    phnNumbers[index].type = e.target.value;
    setPhoneArr(phnNumbers);
  };

  const changeSkill = (index, e) => {
    const currSkillsArr = [...skillsArr];
    currSkillsArr[index].val = e.target.value;
    setSkillsArr(currSkillsArr);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { Name, Designation, dob } = e.target.elements;
    const newPhoneArr = phoneArr.filter((phn) => phn.number !== "");
    if (phoneArr.length < 1) {
      alert("Enter atlest one phone number");
      // add css to phn no
    } else
      addEmployee({
        name: Name.value,
        designation: Designation.value,
        Contact: newPhoneArr,
        Skills: skillsArr,
        dob: dob.value,
      });
    // alert("Employee added successfully!");
    setName("");
    setDesignation("");
    setPhoneArr([{ number: "", type: "primary" }]);
    setSkillsArr([{ val: "" }]);
    setDob("");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="row">
        <label>Name</label>
        <input
          pattern="[A-Za-z ]{3,}"
          required
          type="text"
          id="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Designation</label>
        <input
          required
          pattern="[A-Za-z ]{3,}"
          type="text"
          placeholder="Designation"
          id="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>
      <div className=" row">
        <label>Contact Details</label>
        <input
          required
          type="button"
          //   className="crossButton"
          value="+"
          onClick={() => addPhoneNo()}
        />
        {phoneArr.map((phn, key) => (
          <div className="" key={`${phn}-${key}`}>
            <select
              placeholder="Contact"
              id="Contact"
              value={phn.type}
              defaultValue="select an option"
              onChange={(e) => changeContactType(key, e)}
            >
              <option value="primary">primary</option>
              <option value="emergency">emergency</option>
            </select>
            {key === 0 ? (
              <input
                required
                key={key}
                type="tel"
                placeholder="phone no"
                value={phn.number}
                onChange={(e) => {
                  changePhoneNo(key, e);
                }}
                pattern="[0-9]{10}"
              />
            ) : (
              <input
                key={key}
                type="tel"
                placeholder="phone no"
                value={phn.number}
                onChange={(e) => {
                  changePhoneNo(key, e);
                }}
                pattern="[0-9]{10}"
              />
            )}

            <input
              type="button"
              className="crossButton"
              value="x"
              onClick={(e) => removePhoneNo(e, key)}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <label className=" ">Skills</label>
        <input type="button" value="+" onClick={addSkills} />
        {skillsArr.map((skill, key) => (
          <div key={`${skill}-${key}`}>
            <input
              className="skills"
              key={key}
              type="text"
              placeholder="Skills"
              value={skill.val}
              onChange={(e) => {
                changeSkill(key, e);
              }}
            />
            <input
              type="button"
              value="x"
              className="crossButton"
              onClick={(e) => removeSkill(e, key)}
            />
          </div>
        ))}
      </div>
      <label className=" row">Date Of Birth</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        max={(new Date().toISOString()).split("T")[0]}
      />
      <input className="row" type="submit" value="Submit" />
    </form>
  );
};
export default Form;
