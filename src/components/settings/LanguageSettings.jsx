// src/components/settings/LanguageSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  {
    code: "ar",
    name: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
  },
];

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDirty, setIsDirty] = useState(false);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setIsDirty(true);
  };

  const handleSave = () => {
    // Save language settings
    setIsDirty(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Language Settings
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Choose your preferred language and display settings
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Language
            </label>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <motion.div
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer ${
                    selectedLanguage === lang.code
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{lang.flag}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{lang.name}</h3>
                      <p className="text-sm text-gray-500">
                        {lang.direction === "rtl"
                          ? "Right to Left"
                          : "Left to Right"}
                      </p>
                    </div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-5 h-5 text-teal-500" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Display Settings */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Display Settings
            </label>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dateFormat"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="dateFormat"
                  className="ml-3 text-sm text-gray-700">
                  Use locale-specific date format
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="numberFormat"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="numberFormat"
                  className="ml-3 text-sm text-gray-700">
                  Use locale-specific number format
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isDirty && (
          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Save Changes
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSettings;
