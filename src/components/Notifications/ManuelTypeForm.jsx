import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  useGetNotificationCustomerGroupQuery,
  useGetNotificationCustomerInfoQuery,
  useGetCityListMutation,
  useSendManuelNotificationMutation,
} from "../../features/api/notification/notificationApi";

const ManuelTypeForm = ({ setShowAddForm }) => {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [selectedMusGrupId, setSelectedMusGrupId] = useState(null);
  const [selectedMusSinif, setSelectedMusSinif] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBayi, setSelectedBayi] = useState(null);
  const {
    data: custemerGroups,
    isLoading,
    error,
  } = useGetNotificationCustomerGroupQuery();

  const { data: customerInfo } = useGetNotificationCustomerInfoQuery(
    selectedMusGrupId,
    { skip: !selectedMusGrupId }
  );

  const [getCityList, { data: cityList }] = useGetCityListMutation();
  const [sendManuelNotification, { isLoading: isSending }] =
    useSendManuelNotificationMutation();

  useEffect(() => {
    getCityList({ id: 0, search: "" });
  }, [getCityList]);

  const filteredMusSinifiList = customerInfo?.data?.MusSinifiList?.filter(
    (musSinifi) => {
      if (!selectedCity) return true;
      return musSinifi.REGIO == selectedCity;
    }
  );

  const uniqueMusSinifiList = filteredMusSinifiList?.reduce((unique, item) => {
    const exists = unique.find((u) => u.REGIO === item.REGIO);
    if (!exists) {
      unique.push(item);
    }
    return unique;
  }, []);

  const handleSendNotification = async () => {
    try {
      const response = await sendManuelNotification({
        title: notificationTitle,
        message: notificationContent,
        customerClass: selectedMusSinif.toString(),
        customerGroup: selectedMusGrupId.toString(),
        dealer: selectedBayi.toString(),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setNotificationTitle("");
    setNotificationContent("");
    setSelectedMusGrupId(null);
    setSelectedMusSinif(null);
    setSelectedCity(null);
  };

  console.log("selectedMusGrupId", selectedMusGrupId);
  console.log("selectedMusSinif", selectedMusSinif);
  console.log("selectedBayi", selectedBayi);

  return isSending ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="flex md:items-center gap-4 flex-col flex-1 md:flex-row">
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">Müşteri grubu</label>
          <Select
            placeholder="Müşteri grubu seçiniz"
            options={custemerGroups?.data?.CustomerGroupList?.map((group) => ({
              value: group.Id,
              label: group.Value,
            }))}
            onChange={(e) => setSelectedMusGrupId(e.value)}
            isLoading={isLoading}
            isDisabled={isLoading || error}
          />
        </div>
        <div className=" flex-col flex-1 hidden md:flex"></div>
      </div>
      <div className="flex  md:items-center gap-4 mt-6 flex-col flex-1 md:flex-row">
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">İl</label>
          <Select
            placeholder="İl Seçiniz"
            options={[
              { value: "", label: "Tümü" },
              ...(cityList?.data?.map((city) => ({
                value: city.value,
                label: city.label,
              })) || []),
            ]}
            onChange={(e) => setSelectedCity(e.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">Müşteri sınıfı</label>

          <Select
            placeholder="Müşteri sınıfı seçiniz"
            onChange={(e) => setSelectedMusSinif(e.value)}
            options={[
              { value: "", label: "Tümü" },
              ...(uniqueMusSinifiList?.map((musSinifi) => ({
                value: musSinifi.KUKLA,
                label: musSinifi.VTEXT + " - " + musSinifi.REGIO,
              })) || []),
            ]}
            isLoading={isLoading}
            isDisabled={isLoading || error}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-gray-600">Bayi</label>
          <Select
            onChange={(e) => setSelectedBayi(e.value)}
            placeholder="Bayi seçiniz"
            options={[
              { value: "", label: "Tümü" },
              ...(customerInfo?.data?.MusteriList?.map((bayi) => ({
                value: bayi.REGIO,
                label: bayi.NAME1 + " - " + bayi.REGIO,
              })) || []),
            ]}
          />
        </div>
      </div>
      <div className="flex mt-6 gap-4">
        <div className="flex flex-1 flex-col  ">
          <label htmlFor="description" className="text-gray-600">
            Başlık
          </label>
          <input
            type="text"
            id="description"
            className="border w-full py-1.5 px-2 border-gray-300 rounded-sm bg-white"
            placeholder="Başlık giriniz"
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1"></div>
      </div>
      <div className="mt-6">
        <label htmlFor="description" className="text-gray-600">
          Mesaj
        </label>
        <textarea
          onChange={(e) => setNotificationContent(e.target.value)}
          placeholder="Bildirim mesajınızı giriniz"
          id="description"
          className="border w-full py-1.5 px-2 border-gray-300 rounded-md  bg-white resize-none h-32"
        ></textarea>
      </div>
      <div className="mt-8 flex items-center  justify-center gap-10">
        <button
          onClick={handleSendNotification}
          className="bg-[#0E5239] border border-[#0E5239] text-white px-4 py-2 rounded-md w-32  hover:bg-[#0E5239]/80 cursor-pointer"
        >
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

export default ManuelTypeForm;
