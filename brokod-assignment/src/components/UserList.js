import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h2>User List </h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px auto",
                width: "300px",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.company.name}</p>

              <button
                onClick={() => setSelectedUser(user)}
                style={{
                  marginTop: "5px",
                  padding: "8px 12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default UserList;
