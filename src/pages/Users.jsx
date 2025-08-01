import React, { useEffect } from "react";
import {
  useAssignRoleMutation,
  useGetUsersQuery,
} from "../features/api/user/userApi";
import CustomSwitchComponent from "../components/CustomSwitchComponent";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/global/globalSlice";

const Users = () => {
  const { data: userData, isLoading } = useGetUsersQuery({
    name: "",
    surname: "",
    email: "",
    page: 0,
    pageSize: 10,
  });
  const [assignRole] = useAssignRoleMutation();

  const dispatch = useDispatch();

  const handleUserAccessChange = (userId, roleStatus) => {
    dispatch(setIsLoading(true));
    try {
      assignRole({
        userId: userId,
        hasAccess: !roleStatus,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  console.log(userData?.data.items);

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
            <button className="bg-[#0E5239] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
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
                  Kullanıcı Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tam Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HasAccess
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData?.data.items.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleUserAccessChange(user.id, user.hasAccess)
                        }
                        disabled={isLoading}
                        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
          ${
            user.hasAccess
              ? "bg-[#0E5239] hover:bg-[#0E5239]/80"
              : "bg-gray-200 hover:bg-gray-300"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
                      >
                        <span
                          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
            ${user.hasAccess ? "translate-x-6" : "translate-x-1"}
          `}
                        />
                      </button>
                      <span
                        className={`text-base  ${
                          isLoading ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {user.hasAccess ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default Users;
