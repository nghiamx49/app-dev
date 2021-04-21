import React from "react";
const containerStyle = {
  margin: "100px",
};

const searchStyle = {
  paddingBottom: "10px",
};

const Table = (props) => {
  return (
    <>
      <div style={containerStyle}>
        {props.role === "staff" ? (
          <div className="input-group" style={searchStyle}>
            <div>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="search"
              />
            </div>
            &nbsp;
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        ) : null}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.list
              ? props.list.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>
                        <button className="btn btn-info">
                          <i className="fas fa-info"></i>&nbsp;Detail
                        </button>
                        &nbsp;
                        <button className="btn btn-success">
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </button>
                        &nbsp;
                        <button className="btn btn-danger">
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
