import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

      
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div
      className="
        mx-auto
        my-10
        max-w-[1200px]
        rounded-xl
        border border-white/[0.05]
        bg-zinc-900
        p-[30px]
        text-zinc-50
      "
    >
      {/* Heading */}
      <h2 className="mb-5 text-[2.2rem] font-bold text-orange-500">
        User Directory
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          
          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-[15px] text-left text-[0.9rem] font-semibold text-zinc-400">
                ID
              </th>

              <th className="p-[15px] text-left text-[0.9rem] font-semibold text-zinc-400">
                NAME
              </th>

              <th className="p-[15px] text-left text-[0.9rem] font-semibold text-zinc-400">
                EMAIL
              </th>

              <th className="p-[15px] text-left text-[0.9rem] font-semibold text-zinc-400">
                ROLE
              </th>

              <th className="p-[15px] text-left text-[0.9rem] font-semibold text-zinc-400">
                JOINED
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="
                  border-b border-white/10
                  transition-colors
                  hover:bg-white/[0.03]
                "
              >
                {/* ID */}
                <td className="p-[15px] text-left">
                  {u._id.substring(0, 8)}...
                </td>

                {/* Name */}
                <td className="p-[15px] text-left">
                  {u.name}
                </td>

                {/* Email */}
                <td className="p-[15px] text-left">
                  {u.email}
                </td>

                {/* Role */}
                <td className="p-[15px] text-left">
                  <span
                    className={`
                      inline-block
                      rounded
                      px-2 py-1
                      text-[0.85rem]
                      font-bold
                      ${
                        u.role === 'admin'
                          ? 'bg-orange-600/20 text-orange-500'
                          : 'bg-emerald-500/20 text-emerald-500'
                      }
                    `}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                {/* Joined */}
                <td className="p-[15px] text-left">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* No Users */}
      {users.length === 0 && (
        <p className="py-10 text-center text-zinc-400">
          No users found.
        </p>
      )}
    </div>
  );
};

export default AdminUsers;