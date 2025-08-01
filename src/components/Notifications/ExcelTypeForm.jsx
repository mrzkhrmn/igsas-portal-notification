import React, { useRef, useState } from "react";
import ExcelIcon from "../../constants/icons/ExcelIcon";
import { useSendManuelNotificationWithExcelMutation } from "../../features/api/notification/notificationApi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../features/global/globalSlice";
import { toast } from "react-toastify";

const ExcelTypeForm = ({ setShowAddForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnIndex, setColumnIndex] = useState(1);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef();

  const notify = (message) => toast.success(message);
  const dispatch = useDispatch();

  const [sendManuelNotificationWithExcel, { isLoading }] =
    useSendManuelNotificationWithExcelMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("File", file);
    formData.append("Title", title);
    formData.append("Content", description);
    formData.append("ColumnIndex", columnIndex);
    dispatch(setIsLoading(true));
    try {
      await sendManuelNotificationWithExcel(formData).unwrap();
      notify("Bildirim başarıyla gönderildi");
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setColumnIndex(0);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10">
        <div className="flex items-center">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept=".xlsx,.xls"
            ref={fileRef}
            required
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
        <label htmlFor="columnIndex" className="text-gray-600">
          Sütun Numarası
        </label>
        <input
          value={columnIndex}
          onChange={(e) => setColumnIndex(e.target.value)}
          type="text"
          id="columnIndex"
          className="border w-full py-1.5 px-2 border-gray-300 rounded-sm bg-white"
          placeholder="Sütun numarası giriniz"
        />
      </div>
      <div className="flex  flex-col mt-6">
        <label htmlFor="title" className="text-gray-600">
          Başlık
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          className="border w-full py-1.5 px-2 border-gray-300 rounded-sm bg-white"
          placeholder="Başlık giriniz"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="content" className="text-gray-600">
          Mesaj
        </label>
        <textarea
          placeholder="Bildirim mesajınızı giriniz"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full py-1.5 px-2 border-gray-300 rounded-md  bg-white resize-none h-32"
        ></textarea>
      </div>
      <div className="mt-8 flex items-center  justify-center gap-10">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-[#0E5239] border border-[#0E5239] text-white px-4 py-2 rounded-md w-32  hover:bg-[#0E5239]/80 cursor-pointer"
        >
          {isLoading ? "Gönderiliyor..." : "Kaydet"}
        </button>
        <button
          onClick={() => setShowAddForm(false)}
          className="bg-white border border-gray-300 text-gray-500 px-4 py-2 rounded-md w-32  hover:bg-gray-100 cursor-pointer"
        >
          Iptal
        </button>
      </div>
    </form>
  );
};

export default ExcelTypeForm;
