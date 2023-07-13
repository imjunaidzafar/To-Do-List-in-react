import { useState } from "react";

const Todo = () => {
  const [inputs, setInputs] = useState({ name: "" });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleChange = (e) => {
    setInputs({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTabledata = tableData;
      Object.assign(tempTabledata[editIndex], inputs);
      setTableData([...tempTabledata]);
      setInputs({ name: "" });
      setEditClick(false);
    } else {
      if(inputs.name){
        setTableData(prev => [...prev, inputs]);
        setInputs({ name: "" });
      }
    }
  };
  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({
      name: tempData.name,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">
            <h2>To-Do List</h2>
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {editClick ? "Update" : "Add"}
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>To-Do List</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
