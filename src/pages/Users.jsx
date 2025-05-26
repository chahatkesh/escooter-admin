// src/pages/Users.jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import UserList from "../components/users/UserList";
import UserDetails from "../components/users/UserDetails";
import UserForm from "../components/users/UserForm";
import { authService } from "../services/api";

const Users = () => {
  const queryClient = useQueryClient();
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

  const handleFormSubmit = async (userData) => {
    try {
      if (userToEdit) {
        // Update existing user
        await authService.updateUser(userToEdit._id, userData);
      } else {
        // Create new user
        await authService.createUser(userData);
      }

      // Invalidate and refetch users
      queryClient.invalidateQueries("users");
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting user form:", error);
      // Handle error (you could set an error state here to show a message)
    }
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
