// src/pages/Promotions.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PromotionsList from "../components/promotions/PromotionsList";
import PromotionForm from "../components/promotions/PromotionForm";

const Promotions = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [promotionToEdit, setPromotionToEdit] = useState(null);

  const handleAdd = () => {
    setPromotionToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (promotion) => {
    setPromotionToEdit(promotion);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setPromotionToEdit(null);
  };

  const handleFormSubmit = (promotionData) => {
    // Handle form submission (add/edit promotion)
    console.log("Form submitted:", promotionData);
    setIsFormOpen(false);
    setPromotionToEdit(null);
  };

  return (
    <div>
      <PromotionsList onAdd={handleAdd} onEdit={handleEdit} />

      <AnimatePresence>
        {isFormOpen && (
          <PromotionForm
            promotion={promotionToEdit}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Promotions;
