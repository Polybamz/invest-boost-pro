import React, { useState } from "react";

type Feedback = {
  id: number;
  user: string;
  message: string;
};

const initialFeedback: Feedback[] = [
  { id: 1, user: "John Doe", message: "Great site!" },
  { id: 2, user: "Jane Roe", message: "Needs more features." },
];

const AdminFeedbackManager: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback);
  const [newUser, setNewUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState("");
  const [editMessage, setEditMessage] = useState("");

  // Create
  const handleAdd = () => {
    if (!newUser || !newMessage) return;
    setFeedbacks([
      ...feedbacks,
      { id: Date.now(), user: newUser, message: newMessage },
    ]);
    setNewUser("");
    setNewMessage("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
  };

  // Edit
  const startEdit = (fb: Feedback) => {
    setEditId(fb.id);
    setEditUser(fb.user);
    setEditMessage(fb.message);
  };
  const handleUpdate = () => {
    if (editId === null || !editUser || !editMessage) return;
    setFeedbacks(feedbacks.map(fb => fb.id === editId ? { ...fb, user: editUser, message: editMessage } : fb));
    setEditId(null);
    setEditUser("");
    setEditMessage("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Feedback Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Feedback</h4>
        <input
          type="text"
          placeholder="User"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Feedbacks</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User</th>
            <th className="p-2">Message</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(fb => (
            <tr key={fb.id}>
              <td className="p-2">{fb.user}</td>
              <td className="p-2">{fb.message}</td>
              <td className="p-2">
                <button onClick={() => startEdit(fb)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(fb.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Feedback</h4>
          <input
            type="text"
            value={editUser}
            onChange={e => setEditUser(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editMessage}
            onChange={e => setEditMessage(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackManager;
