import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/get").then((response) => {
      console.log(response);
      console.log(response.data);
      setEmployeeList(response.data);
    });
  }, []);

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        console.log("success");
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  const updateEmployee = (id) => {
    axios
      .put("http://localhost:3001/update", { wage: newWage, id: id })
      .then((response) => {
        setEmployeeList(
          employeeList.map((employee) => {
            return employee.id === id
              ? {
                  id: employee.id,
                  name: employee.name,
                  age: employee.age,
                  country: employee.country,
                  position: employee.position,
                  wage: newWage,
                }
              : employee;
          })
        );
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((employee) => {
          return employee.id !== id;
        })
      );
    });
  };

  return (
    <div className="app">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage: (Year)</label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />

        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div className="employees">
        {employeeList.map((employee, i) => (
          <div key={i} className="employee">
            <div>
              <h3>Name: {employee.name}</h3>
              <h3>Age: {employee.age}</h3>
              <h3>Country: {employee.country}</h3>
              <h3>Position: {employee.position}</h3>
              <h3>Wage: {employee.wage}</h3>
            </div>
            <div className="right">
              <input
                type="number"
                placeholder="Enter New Wage"
                onChange={(e) => {
                  setNewWage(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  updateEmployee(employee.id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteEmployee(employee.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
