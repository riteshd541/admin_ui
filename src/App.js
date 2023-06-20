import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import "./App.css";
import "./components/pagination.css";
import SearchBar from "./components/SearchBar";
import DeleteButton from "./components/DeleteButton";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowSelect = (userId) => {
    const selected = [...selectedRows];
    if (selected.includes(userId)) {
      const index = selected.indexOf(userId);
      selected.splice(index, 1);
    } else {
      selected.push(userId);
    }
    setSelectedRows(selected);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = () => {
    setEditUser(null);
    const updatedUsers = users.map((user) => {
      if (user.id === editUser.id) {
        return {
          ...user,
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const handleInputChange = (e, property) => {
    const { value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [property]: value,
    }));
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / 10);

  return (
    <div className="container">
      <h1>User Management by Ritesh</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <UserTable
        users={paginatedUsers}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleDeleteUser={handleDeleteUser}
        handleEditUser={handleEditUser}
        editUser={editUser}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleInputChange={handleInputChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <DeleteButton
        handleDeleteSelected={handleDeleteSelected}
        selectedRows={selectedRows}
      />
    </div>
  );
}

export default App;
