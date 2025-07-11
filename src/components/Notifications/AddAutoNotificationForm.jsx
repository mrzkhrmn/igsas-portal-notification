import React from "react";
import Select from "react-select";

const AddAutoNotificationForm = ({ setShowAddForm }) => {
  return (
    <div className="max-w-5xl mt-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col  ">
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
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">Koşul</label>
          <Select
            placeholder="Koşul seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-10">
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">
            Görmeyenlere Tekrar Gönderim Süresi
          </label>
          <Select
            placeholder="Tekrar Gönderim Süresi seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">
            Görmeyenlere Tekrar Gönderim Tekrarı
          </label>
          <Select
            placeholder="Gönderim Tekrarı seçiniz"
            options={[
              { value: "Istanbul", label: "Istanbul" },
              { value: "Ankara", label: "Ankara" },
            ]}
          />
        </div>
      </div>
      <div className="mt-8">
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
          className="bg-white border border-[#0E5239] text-[#0E5239] px-4 py-2 rounded-md w-32 cursor-pointer"
        >
          Iptal
        </button>
      </div>
    </div>
  );
};

export default AddAutoNotificationForm;
