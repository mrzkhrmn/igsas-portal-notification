import React, { useEffect, useState } from "react";
import { useGetManuelNotificationsMutation } from "../../features/api/notification/notificationApi";
import { formatToDayMonthYear } from "../../utils/formatDate";

const ManuelNotificationsTable = ({ setShowAddForm }) => {
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(0);
  const [getManuelNotifications, { data: manuelNotificationsData, isLoading }] =
    useGetManuelNotificationsMutation({
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    getManuelNotifications({
      page: currentPage.toString(),
      pageSize: pageSize,
      content: "",
      title: "",
    });
  }, [getManuelNotifications, pageSize, currentPage]);

  const handleAddNotification = () => {
    setShowAddForm(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (manuelNotificationsData?.data?.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (manuelNotificationsData?.data?.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    const buttons = [];
    const totalPages = manuelNotificationsData?.data?.pages || 0;
    const current = manuelNotificationsData?.data?.index || 0;

    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm cursor-pointer ${
            i === current
              ? "bg-[#0E5239] text-white rounded"
              : "text-gray-700 hover:text-[#0E5239] "
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  const getShowingText = () => {
    const data = manuelNotificationsData?.data;
    if (!data) return "Veri yükleniyor...";

    const startItem = data.index * data.size + 1;
    const endItem = Math.min((data.index + 1) * data.size, data.count);

    return `${startItem} - ${endItem} arası gösteriliyor, toplam ${data.count} kayıt`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm my-4">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(e.target.value);
                setCurrentPage(0);
              }}
            >
              <option value={"10"}>Göster 10</option>
              <option value={"25"}>Göster 25</option>
              <option value={"50"}>Göster 50</option>
            </select>
            <button
              onClick={handleAddNotification}
              className="bg-[#0E5239] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Bildirim Ekle
            </button>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Arama"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Durum Seç</option>
              <option>Aktif</option>
              <option>Pasif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BAŞLIK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GÖNDERİM/GÖSTERİM GÖNDERİM T.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DURUM
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İŞLEMLER
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {manuelNotificationsData?.data?.items?.map(
                (notification, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {notification.notificationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {notification.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{notification.userId}</div>
                      <div>{formatToDayMonthYear(notification.sendAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          notification.status === "InProgress"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Sayfalama */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">{getShowingText()}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={!manuelNotificationsData?.data?.hasPrevious}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                !manuelNotificationsData?.data?.hasPrevious
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ‹
            </button>
            {getPageButtons()}
            <button
              onClick={handleNext}
              disabled={!manuelNotificationsData?.data?.hasNext}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                !manuelNotificationsData?.data?.hasNext
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuelNotificationsTable;
