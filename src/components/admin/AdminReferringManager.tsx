import React, { useState } from "react";

type ReferringUser = {
  id: number;
  name: string;
  referredCount: number;
};

const initialUsers: ReferringUser[] = [
  { id: 1, name: "Sam", referredCount: 3 },
  { id: 2, name: "Alex", referredCount: 5 },
];

const AdminReferringManager: React.FC = () => {
  const [users, setUsers] = useState<ReferringUser[]>(initialUsers);
  const [newName, setNewName] = useState("");
  const [newCount, setNewCount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCount, setEditCount] = useState("");

  // Create
  const handleAdd = () => {
    if (!newName || !newCount) return;
    setUsers([
      ...users,
      { id: Date.now(), name: newName, referredCount: Number(newCount) },
    ]);
    setNewName("");
    setNewCount("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit
  const startEdit = (user: ReferringUser) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditCount(user.referredCount.toString());
  };
  const handleUpdate = () => {
    if (editId === null || !editName || !editCount) return;
    setUsers(users.map(user => user.id === editId ? { ...user, name: editName, referredCount: Number(editCount) } : user));
    setEditId(null);
    setEditName("");
    setEditCount("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Referring Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Referring User</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Referred Count"
          value={newCount}
          onChange={e => setNewCount(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Referring Users</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Referred Count</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.referredCount}</td>
              <td className="p-2">
                <button onClick={() => startEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Referring User</h4>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={editCount}
            onChange={e => setEditCount(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminReferringManager;
