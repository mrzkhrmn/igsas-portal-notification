import React, { useRef } from "react";
import ExcelIcon from "../../constants/icons/ExcelIcon";

const ExcelTypeForm = ({ setShowAddForm }) => {
  const fileRef = useRef();
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10">
        <div className="flex items-center">
          <input
            type="file"
            ref={fileRef}
            className="py-2 px-4 border border-gray-300 rounded-l-md text-gray-500"
          />
          <button
            onClick={() => fileRef.current.click()}
            className="bg-[#0E5239] text-white px-4 py-2 rounded-r-md cursor-pointer hover:bg-[#0E5239]/80"
          >
            Dosya Seç
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ExcelIcon />
          <p className="text-gray-400">Excel dosya õrneğini indir</p>
        </div>
      </div>
      <div className="flex  flex-col mt-6">
        <label htmlFor="description" className="text-gray-600">
          Başlık
        </label>
        <input
          type="text"
          id="description"
          className="border w-full py-1.5 px-2 border-gray-300 rounded-sm bg-white"
          placeholder="Başlık giriniz"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="description" className="text-gray-600">
          Mesaj
        </label>
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
          className="bg-white border border-gray-300 text-gray-500 px-4 py-2 rounded-md w-32  hover:bg-gray-100 cursor-pointer"
        >
          Iptal
        </button>
      </div>
    </div>
  );
};

export default ExcelTypeForm;
