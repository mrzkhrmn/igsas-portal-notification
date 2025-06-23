import React from "react";

const ManuelNotificationsTable = ({ setShowAddForm }) => {
  const notifications = [
    {
      id: "#91716",
      title: "Myra Foster",
      sender: "10000/4598",
      date: "09 Feb 2020",
      status: "Aktif",
    },
    {
      id: "#56695",
      title: "Sweden",
      sender: "6224",
      date: "14 Jun 2020",
      status: "Pasif",
    },
    {
      id: "#53972",
      title: "Matilda Robertson",
      sender: "634",
      date: "13 Oct 2020",
      status: "Aktif",
    },
    {
      id: "#30307",
      title: "French Southern",
      sender: "88020",
      date: "25 Nov 2020",
      status: "Aktif",
    },
    {
      id: "#34894",
      title: "Martha Barnes",
      sender: "125",
      date: "20 Jan 2020",
      status: "Pasif",
    },
  ];

  const handleAddNotification = () => {
    setShowAddForm(true);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm mt-4">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Göster 10</option>
              <option>Göster 25</option>
              <option>Göster 50</option>
            </select>
            <button
              onClick={handleAddNotification}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
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

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
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
            {notifications.map((notification, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {notification.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {notification.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{notification.sender}</div>
                  <div>{notification.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      notification.status === "Aktif"
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Sayfalama */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to 7 of 100 entries
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm">
              ‹
            </button>
            <button className="px-3 py-1 text-sm">1</button>
            <button className="px-3 py-1 text-sm">2</button>
            <button className="px-3 py-1 text-sm">3</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
              4
            </button>
            <button className="px-3 py-1 text-sm">5</button>
            <button className="px-3 py-1 text-sm">6</button>
            <button className="px-3 py-1 text-sm">7</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuelNotificationsTable;
