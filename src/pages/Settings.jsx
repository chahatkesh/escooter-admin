// src/pages/Settings.jsx
import React from "react";
import LanguageSettings from "../components/settings/LanguageSettings";
import NotificationSettings from "../components/settings/NotificationSettings";

const Settings = () => {
  return (
    <div className="space-y-6">
      <LanguageSettings />
      <NotificationSettings />
    </div>
  );
};

export default Settings;
