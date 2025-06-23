import React, { useState } from "react";
import Select from "react-select";
import CustomSwitchComponent from "../CustomSwitchComponent";

const AddManuelNotificationForm = ({ setShowAddForm }) => {
  const [sendingType, setSendingType] = useState("manuel");
  console.log(sendingType);
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
      <div className="flex items-center gap-4">
        <div className="flex flex-col flex-1">
          <label>İl</label>
          <Select
            placeholder="İl Seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Bayi</label>
          <Select
            placeholder="Bayi seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-10">
        <div className="flex flex-col flex-1">
          <label>Müşteri sınıfı</label>

          <Select
            placeholder="Müşteri sınıfı seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Müşteri grubu</label>
          <Select
            placeholder="Müşteri grubu seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
      </div>
      <div className="flex mt-8 gap-4">
        <div className="flex flex-1 flex-col  ">
          <label htmlFor="description">Başlık</label>
          <input
            type="text"
            id="description"
            className="border w-full py-1.5 px-2 border-gray-300 rounded-sm bg-white"
            placeholder="Başlık giriniz"
          />
        </div>
        <div className="flex flex-col flex-1"></div>
      </div>
      <div className="mt-8">
        <label htmlFor="description">Mesaj</label>
        <textarea
          placeholder="Bildirim mesajınızı giriniz"
          id="description"
          className="border w-full py-1.5 px-2 border-gray-300 rounded-md  bg-white resize-none h-32"
        ></textarea>
      </div>
      <div className="mt-8 flex items-center  justify-center gap-10">
        <button className="bg-[#0E5239] border border-[#0E5239] text-white px-4 py-2 rounded-md w-32  hover:bg-[#0E5239]/80 cursor-pointer">
          Kaydet
        </button>
        <button
          onClick={() => setShowAddForm(false)}
          className="bg-white border border-[#0E5239] text-[#0E5239] px-4 py-2 rounded-md w-32 cursor-pointer"
        >
          Iptal
        </button>
      </div>
    </div>
  );
};

export default AddManuelNotificationForm;
