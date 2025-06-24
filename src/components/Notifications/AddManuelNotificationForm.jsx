import React, { useState } from "react";
import CustomSwitchComponent from "../CustomSwitchComponent";
import ManuelTypeForm from "./ManuelTypeForm";
import ExcelTypeForm from "./ExcelTypeForm";

const AddManuelNotificationForm = ({ setShowAddForm }) => {
  const [sendingType, setSendingType] = useState("manuel");
  return (
    <div className=" max-w-5xl mt-8">
      <div className="flex items-center gap-4 mb-8">
        <CustomSwitchComponent
          label="Manuel Gönderim"
          checked={sendingType === "manuel" && sendingType !== "excel"}
          onChange={() => setSendingType("manuel")}
        />
        <CustomSwitchComponent
          label="Excel Listesi Gönderim"
          checked={sendingType === "excel" && sendingType !== "manuel"}
          onChange={() => setSendingType("excel")}
        />
      </div>
      {sendingType === "manuel" ? (
        <ManuelTypeForm setShowAddForm={setShowAddForm} />
      ) : (
        <ExcelTypeForm setShowAddForm={setShowAddForm} />
      )}
    </div>
  );
};

export default AddManuelNotificationForm;
