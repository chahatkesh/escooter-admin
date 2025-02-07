// src/pages/Users.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserList from "../components/users/UserList";
import UserDetails from "../components/users/UserDetails";
import UserForm from "../components/users/UserForm";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleAddUser = () => {
    setUserToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (userData) => {
    // Handle form submission (add/edit user)
    console.log("Form submitted:", userData);
    setIsFormOpen(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setUserToEdit(null);
  };

  return (
    <div className="space-y-6">
      {selectedUser ? (
        <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <UserList
          onUserSelect={handleUserSelect}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
        />
      )}

      <AnimatePresence>
        {isFormOpen && (
          <UserForm
            user={userToEdit}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
