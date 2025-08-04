import React, { useState } from "react";
import {
  useAssignRoleMutation,
  useGetUsersQuery,
} from "../features/api/user/userApi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/global/globalSlice";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState("10");

  const { data: userData, isLoading } = useGetUsersQuery({
    name: "",
    surname: "",
    email: "",
    page: currentPage,
    pageSize: parseInt(pageSize),
  });

  const [assignRole, { isLoading: isAssignRoleLoading }] =
    useAssignRoleMutation();

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (userData?.data?.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (userData?.data?.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    const buttons = [];
    const totalPages = userData?.data?.pages || 0;
    const current = userData?.data?.index || 0;

    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm cursor-pointer ${
            i === current
              ? "bg-[#0E5239] text-white rounded"
              : "text-gray-700 hover:text-[#0E5239]"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  const getShowingText = () => {
    const data = userData?.data;
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
              {userData?.data?.items?.map((user, index) => (
                <tr key={user.id || index} className="hover:bg-gray-50">
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
                        disabled={isAssignRoleLoading}
                        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
          ${
            user.hasAccess
              ? "bg-[#0E5239] hover:bg-[#0E5239]/80"
              : "bg-gray-200 hover:bg-gray-300"
          }
          ${
            isAssignRoleLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
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
                          isAssignRoleLoading
                            ? "text-gray-400"
                            : "text-gray-700"
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
          <div className="text-sm text-gray-500">{getShowingText()}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={!userData?.data?.hasPrevious}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                !userData?.data?.hasPrevious
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ‹
            </button>
            {getPageButtons()}
            <button
              onClick={handleNext}
              disabled={!userData?.data?.hasNext}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                !userData?.data?.hasNext
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

export default Users;
