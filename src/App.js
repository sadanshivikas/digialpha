import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [classes, setClasses] = useState([
    {
      students: [
        { firstName: "", lastName: "", gender: "" },
        { firstName: "", lastName: "", gender: "" },
      ],
    },
    {
      students: [{ firstName: "", lastName: "", gender: "" }],
    },
  ]);

  const [saveData, setSaveData] = useState([]);

  const addClass = () => {
    setClasses([...classes, { students: [] }]);
  };

  const addStudent = (classIndex) => {
    const updatedClasses = [...classes];
    updatedClasses[classIndex].students.push({
      firstName: "",
      lastName: "",
      gender: "",
    });
    setClasses(updatedClasses);
  };

  const handleInputChange = (e, classIndex, studentIndex, field) => {
    const updatedClasses = [...classes];
    updatedClasses[classIndex].students[studentIndex][field] = e.target.value;
    setClasses(updatedClasses);
  };

  const handleSubmit = () => {
    let isValid = true;
    for (const classItem of classes) {
      for (const student of classItem.students) {
        if (
          student.firstName.trim() === "" ||
          student.lastName.trim() === "" ||
          student.gender.trim() === ""
        ) {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      localStorage.setItem("studentData", JSON.stringify(classes));
      // console.log("Data stored in local storage:", classes);
    } else {
      console.log("Validation failed. Please fill in all the required fields.");
    }
  };

  return (
    <div className="main">
      <div className="add-class-button">
        <button type="button" onClick={addClass}>
          + Add Class
        </button>
      </div>
      {classes.map((classItem, classIndex) => (
        <div className="main-class-box" key={classIndex}>
          <h2>Class - {classIndex + 1}</h2>
          <div className="class-box">
            {classItem.students.map((student, studentIndex) => (
              <div className="student-box" key={studentIndex}>
                <h3>Student - {studentIndex + 1}</h3>
                <div className="class-box-content">
                  <div className="form-input">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={student.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          classIndex,
                          studentIndex,
                          "firstName"
                        )
                      }
                    />
                    {student.firstName.trim() === "" && (
                      <small>Required *</small>
                    )}
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={student.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          classIndex,
                          studentIndex,
                          "lastName"
                        )
                      }
                    />
                    {student.lastName.trim() === "" && (
                      <small>Required *</small>
                    )}
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Gender</label>
                    <div className="radio-input">
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          value="male"
                          checked={student.gender === "male"}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              classIndex,
                              studentIndex,
                              "gender"
                            )
                          }
                        />
                        <label>Male</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          value="female"
                          checked={student.gender === "female"}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              classIndex,
                              studentIndex,
                              "gender"
                            )
                          }
                        />
                        <label>Female</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          value="other"
                          checked={student.gender === "other"}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              classIndex,
                              studentIndex,
                              "gender"
                            )
                          }
                        />
                        <label>Other</label>
                      </div>
                    </div>
                    {student.gender.trim() === "" && <small>Required *</small>}
                  </div>
                </div>
              </div>
            ))}
            <div className="add-student-button">
              <button type="button" onClick={() => addStudent(classIndex)}>
                + Add Student
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="submit-btn">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
