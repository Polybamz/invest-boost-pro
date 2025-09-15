import React, { useState } from "react";

type ShopItem = {
  id: number;
  name: string;
  price: number;
};

const initialItems: ShopItem[] = [
  { id: 1, name: "Premium Plan", price: 99 },
  { id: 2, name: "Basic Plan", price: 29 },
];

const AdminShopManager: React.FC = () => {
  const [items, setItems] = useState<ShopItem[]>(initialItems);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Create
  const handleAdd = () => {
    if (!newName || !newPrice) return;
    setItems([
      ...items,
      { id: Date.now(), name: newName, price: Number(newPrice) },
    ]);
    setNewName("");
    setNewPrice("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Edit
  const startEdit = (item: ShopItem) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditPrice(item.price.toString());
  };
  const handleUpdate = () => {
    if (editId === null || !editName || !editPrice) return;
    setItems(items.map(item => item.id === editId ? { ...item, name: editName, price: Number(editPrice) } : item));
    setEditId(null);
    setEditName("");
    setEditPrice("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Shop Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Shop Item</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Shop Items</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.price}</td>
              <td className="p-2">
                <button onClick={() => startEdit(item)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Shop Item</h4>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={editPrice}
            onChange={e => setEditPrice(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminShopManager;
