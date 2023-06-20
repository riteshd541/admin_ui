import React from "react";
import "./UserTable.css";

function UserTable({
  users,
  selectedRows,
  handleRowSelect,
  handleDeleteUser,
  handleEditUser,
  editUser,
  handleSaveEdit,
  handleCancelEdit,
  handleInputChange,
}) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === users.length}
              onChange={() =>
                handleRowSelect(
                  selectedRows.length === users.length
                    ? []
                    : users.map((user) => user.id)
                )
              }
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={selectedRows.includes(user.id) ? "selected" : ""}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleRowSelect(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>
              {editUser && editUser.id === user.id ? (
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editUser && editUser.id === user.id ? (
                <input
                  type="text"
                  value={editUser.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editUser && editUser.id === user.id ? (
                <input
                  type="text"
                  value={editUser.role}
                  onChange={(e) => handleInputChange(e, "role")}
                />
              ) : (
                user.role
              )}
            </td>
            <td>
              {editUser && editUser.id === user.id ? (
                <>
                  <button className="save-button" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
