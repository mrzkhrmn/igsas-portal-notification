import React, { useEffect } from "react";
import {
  useAssignRoleMutation,
  useGetUsersMutation,
} from "../features/api/user/userApi";
import CustomSwitchComponent from "../components/CustomSwitchComponent";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/global/globalSlice";

const Users = () => {
  const [getUsers, { data: userData, isLoading }] = useGetUsersMutation();
  const [assignRole] = useAssignRoleMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers({
      name: "",
      surname: "",
      email: "",
      page: 0,
      pageSize: 10,
    }).unwrap();
  }, [getUsers]);

  const handleUserAccessChange = (userId, roleStatus) => {
    dispatch(setIsLoading(true));
    try {
      assignRole({
        userId: userId,
        roleStatus: !roleStatus,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
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
                    <button
                      onClick={() =>
                        handleUserAccessChange(user.id, user.hasAccess)
                      }
                    >
                      <CustomSwitchComponent checked={user.hasAccess} />
                    </button>
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
