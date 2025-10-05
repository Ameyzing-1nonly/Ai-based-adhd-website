import { useState } from "react";
import { useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation } from "../../../redux/features/auth/authApi";

const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [gmailOnly, setGmailOnly] = useState(false);

  const { data, error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleSearch = (value) => setSearchTerm(value);
  const handleRoleFilter = (value) => setRoleFilter(value);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ userId }).unwrap();
        alert("User Deleted Successfully!");
        refetch();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    const confirmUpdate = window.confirm(`Are you sure you want to change the user's role to ${newRole}?`);
    if (confirmUpdate) {
      try {
        await updateUserRole({ userId, role: newRole }).unwrap();
        alert("User role updated successfully!");
        refetch();
      } catch (error) {
        console.error("Failed to update user role:", error);
        alert("Failed to update user role. Please try again.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredUsers = data?.users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === "" || user.role === roleFilter) &&
    (!gmailOnly || user.email.toLowerCase().endsWith('@gmail.com'))
  );

  return (
    <div>
      <section className="py-1 dark:text-gray-300 dark:bg-gray-800 mx-auto mr-8">
        <div className="w-full mb-12 xl:mb-0">
          <div className="relative flex flex-col min-w-0 break-words text-black dark:text-gray-300 w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <input
                    type="text"
                    placeholder="Search users..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border rounded px-2 py-1 mr-2 dark:text-gray-800"
                  />
                  <select
                    onChange={(e) => handleRoleFilter(e.target.value)}
                    className="border rounded px-2 py-1 mr-2 dark:text-gray-800"
                  >
                    <option value="">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit Role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers && filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {user.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {user.role}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                          className="border rounded px-2 py-1 dark:text-gray-800"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageUser;
