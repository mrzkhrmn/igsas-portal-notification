import React from "react";

const CustomSwitchComponent = ({
  label = "Manuel Gönderim",
  checked = false,
  onChange = () => {},
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
          ${
            checked
              ? "bg-[#0E5239] hover:bg-[#0E5239]/80"
              : "bg-gray-200 hover:bg-gray-300"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
      <span
        className={`text-base  ${disabled ? "text-gray-400" : "text-gray-700"}`}
      >
        {label}
      </span>
    </div>
  );
};

export default CustomSwitchComponent;
