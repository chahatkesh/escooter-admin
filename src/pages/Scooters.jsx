// src/pages/Scooters.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScooterList from "../components/scooters/ScooterList";
import ScooterDetails from "../components/scooters/ScooterDetails";
import ScooterForm from "../components/scooters/ScooterForm";

const Scooters = () => {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scooterToEdit, setScooterToEdit] = useState(null);

  const handleScooterSelect = (scooter) => {
    setSelectedScooter(scooter);
  };

  const handleAddScooter = () => {
    setScooterToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditScooter = (scooter) => {
    setScooterToEdit(scooter);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (scooterData) => {
    // Handle form submission (add/edit scooter)
    console.log("Form submitted:", scooterData);
    setIsFormOpen(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setScooterToEdit(null);
  };

  return (
    <div className="space-y-6">
      {selectedScooter ? (
        <ScooterDetails
          scooter={selectedScooter}
          onBack={() => setSelectedScooter(null)}
        />
      ) : (
        <ScooterList
          onScooterSelect={handleScooterSelect}
          onAddScooter={handleAddScooter}
        />
      )}

      <AnimatePresence>
        {isFormOpen && (
          <ScooterForm
            scooter={scooterToEdit}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scooters;
