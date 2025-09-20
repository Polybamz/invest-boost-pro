import React, { useState } from "react";
// Assuming you have a component library like shadcn/ui or similar setup
// These imports are for illustration; you'll need to define or import these components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ExternalLink, Edit, Trash } from "lucide-react"; // lucide-react for icons
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Testimonial {
  id: number;
  user: string;
  platform: "telegram" | "facebook" | "instagram" | "whatsapp";
  amount: number;
  date: string;
  message: string;
  link: string;
  avatar: string;
}

const initialFeedback: Testimonial[] = [
  {
    id: 1,
    user: "John Doe",
    platform: "telegram",
    amount: 500,
    date: "2025-09-20",
    message: "Great site!",
    link: "https://t.me/johndoe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 2,
    user: "Jane Roe",
    platform: "facebook",
    amount: 1500,
    date: "2025-09-19",
    message: "Needs more features.",
    link: "https://facebook.com/janeroe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
  },
];

// Helper functions for dynamic styling and icons
const getPlatformColor = (platform: Testimonial['platform']) => {
  switch (platform) {
    case 'telegram': return 'bg-blue-500';
    case 'facebook': return 'bg-blue-700';
    case 'instagram': return 'bg-pink-500';
    case 'whatsapp': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getPlatformIcon = (platform: Testimonial['platform']) => {
  // You would import and use actual SVG components here
  switch (platform) {
    case 'telegram': return '✈️'; // Placeholder for Telegram icon
    case 'facebook': return '👍'; // Placeholder for Facebook icon
    case 'instagram': return '📸'; // Placeholder for Instagram icon
    case 'whatsapp': return '💬'; // Placeholder for WhatsApp icon
    default: return '❓';
  }
};

const AdminFeedbackManager: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>(initialFeedback);
  const [activeTab, setActiveTab] = useState<'view' | 'add'>('view');
  
  // State for adding new feedback
  const [newFeedback, setNewFeedback] = useState<Omit<Testimonial, 'id'>>({
    user: "",
    platform: "telegram",
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    message: "",
    link: "",
    avatar: ""
  });

  // State for editing feedback
  const [editId, setEditId] = useState<number | null>(null);
  const [editFeedback, setEditFeedback] = useState<Omit<Testimonial, 'id' | 'date'>>({
    user: "",
    platform: "telegram",
    amount: 0,
    message: "",
    link: "",
    avatar: ""
  });

  // Handle changes for add form
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFeedback(prev => ({
      ...prev,
      [name]: (name === 'amount') ? Number(value) : value,
    }));
  };

  const handleAddPlatformChange = (value: Testimonial['platform']) => {
    setNewFeedback(prev => ({
      ...prev,
      platform: value,
    }));
  };

  const handleAdd = () => {
    if (!newFeedback.user || !newFeedback.message) return;
    setFeedbacks([
      ...feedbacks,
      { 
        id: Date.now(), 
        ...newFeedback,
        amount: Number(newFeedback.amount)
      },
    ]);
    setNewFeedback({
      user: "",
      platform: "telegram",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      message: "",
      link: "",
      avatar: ""
    });
    setActiveTab('view');
  };

  const handleDelete = (id: number) => {
    setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
  };

  const startEdit = (fb: Testimonial) => {
    setEditId(fb.id);
    setEditFeedback({
      user: fb.user,
      platform: fb.platform,
      amount: fb.amount,
      message: fb.message,
      link: fb.link,
      avatar: fb.avatar
    });
  };

  // Handle changes for edit form
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFeedback(prev => ({
      ...prev,
      [name]: (name === 'amount') ? Number(value) : value,
    }));
  };

  const handleEditPlatformChange = (value: Testimonial['platform']) => {
    setEditFeedback(prev => ({
      ...prev,
      platform: value,
    }));
  };

  const handleUpdate = () => {
    if (editId === null || !editFeedback.user || !editFeedback.message) return;
    setFeedbacks(feedbacks.map(fb => fb.id === editId ? { ...fb, ...editFeedback } : fb));
    setEditId(null);
  };

  const resetEdit = () => {
    setEditId(null);
  };

  return (
    <div className="p-4 bg-background mt-16 min-h-screen">
      <h3 className="text-2xl font-bold mb-4">Manage Feedback</h3>
      
      {/* Tab Navigation */}
      <div className="flex mb-4 border-b border-gray-300">
        <button
          onClick={() => { setActiveTab('view'); resetEdit(); }}
          className={`py-2 px-4 font-semibold text-lg transition-colors duration-300 ${
            activeTab === 'view' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-400'
          }`}
        >
          View/Edit Feedback
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`py-2 px-4 font-semibold text-lg transition-colors duration-300 ${
            activeTab === 'add' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-400'
          }`}
        >
          Add Feedback
        </button>
      </div>

      {/* View/Edit Tab Content */}
      {activeTab === 'view' && (
        <div className="mt-4">
          {editId !== null ? (
            // Edit Form
            <div className="p-4 bg-muted border border-gray-300 rounded shadow-md mt-4">
              <h4 className="font-semibold text-xl mb-2">Edit Feedback</h4>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="user"
                  placeholder="User"
                  value={editFeedback.user}
                  onChange={handleEditChange}
                />
                <Select value={editFeedback.platform} onValueChange={(value: Testimonial['platform']) => handleEditPlatformChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={editFeedback.amount}
                  onChange={handleEditChange}
                />
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={editFeedback.message}
                  onChange={handleEditChange}
                />
                <Input
                  type="text"
                  name="link"
                  placeholder="Link"
                  value={editFeedback.link}
                  onChange={handleEditChange}
                />
                <Input
                  type="text"
                  name="avatar"
                  placeholder="Avatar URL"
                  value={editFeedback.avatar}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleUpdate}>Update</Button>
                <Button variant="outline" onClick={resetEdit}>Cancel</Button>
              </div>
            </div>
          ) : (
            // Card Display Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map(testimonial => (
                <Card key={testimonial.id} className="bg-muted border-gray-200 shadow-md p-4 space-y-4">
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.user} />
                          <AvatarFallback>{testimonial.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{testimonial.user}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getPlatformColor(testimonial.platform)} text-white text-xs`}>
                              {getPlatformIcon(testimonial.platform)}
                              <span className="ml-1">{testimonial.platform}</span>
                            </Badge>
                            <span className="text-sm text-gray-500">{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(testimonial)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <p className="text-gray-600 italic">"{testimonial.message}"</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">${testimonial.amount} received</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={testimonial.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            See Feedback
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Tab Content */}
      {activeTab === 'add' && (
        <div className="p-4 bg-muted border border-gray-300 rounded shadow-md">
          <h4 className="font-semibold text-xl mb-2">Add New Feedback</h4>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="user"
              placeholder="User"
              value={newFeedback.user}
              onChange={handleAddChange}
            />
            <Select onValueChange={(value: Testimonial['platform']) => handleAddPlatformChange(value)} value={newFeedback.platform}>
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newFeedback.amount}
              onChange={handleAddChange}
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={newFeedback.message}
              onChange={handleAddChange}
            />
            <Input
              type="text"
              name="link"
              placeholder="Link"
              value={newFeedback.link}
              onChange={handleAddChange}
            />
            <Input
              type="text"
              name="avatar"
              placeholder="Avatar URL"
              value={newFeedback.avatar}
              onChange={handleAddChange}
            />
          </div>
          <Button onClick={handleAdd} className="mt-4">Add Feedback</Button>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackManager;