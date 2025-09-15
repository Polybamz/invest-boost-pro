import React, { useState } from "react";

type Ticket = {
  id: number;
  subject: string;
  status: string;
};

const initialTickets: Ticket[] = [
  { id: 1, subject: "Login Issue", status: "Open" },
  { id: 2, subject: "Payment Failed", status: "Closed" },
];

const AdminSupportManager: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [newSubject, setNewSubject] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Create
  const handleAdd = () => {
    if (!newSubject || !newStatus) return;
    setTickets([
      ...tickets,
      { id: Date.now(), subject: newSubject, status: newStatus },
    ]);
    setNewSubject("");
    setNewStatus("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  // Edit
  const startEdit = (ticket: Ticket) => {
    setEditId(ticket.id);
    setEditSubject(ticket.subject);
    setEditStatus(ticket.status);
  };
  const handleUpdate = () => {
    if (editId === null || !editSubject || !editStatus) return;
    setTickets(tickets.map(ticket => ticket.id === editId ? { ...ticket, subject: editSubject, status: editStatus } : ticket));
    setEditId(null);
    setEditSubject("");
    setEditStatus("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Support Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Ticket</h4>
        <input
          type="text"
          placeholder="Subject"
          value={newSubject}
          onChange={e => setNewSubject(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Status"
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Support Tickets</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Subject</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="p-2">{ticket.subject}</td>
              <td className="p-2">{ticket.status}</td>
              <td className="p-2">
                <button onClick={() => startEdit(ticket)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Ticket</h4>
          <input
            type="text"
            value={editSubject}
            onChange={e => setEditSubject(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminSupportManager;
