import { useState } from "react";
import { mockBooks, mockOrders, GENRES } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book as BookIcon, Package, Users, Plus, Pencil, Trash2, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Book } from "@/types";

const AdminPage = () => {
  const { user } = useStore();
  const [books, setBooks] = useState(mockBooks);
  const [orders, setOrders] = useState(mockOrders);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formGenre, setFormGenre] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formIsbn, setFormIsbn] = useState("");
  const [formDesc, setFormDesc] = useState("");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const resetForm = () => {
    setFormTitle(""); setFormAuthor(""); setFormGenre(""); setFormPrice(""); setFormStock(""); setFormIsbn(""); setFormDesc("");
    setEditingBook(null);
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setFormTitle(book.title); setFormAuthor(book.authors.join(", ")); setFormGenre(book.genre);
    setFormPrice(book.price.toString()); setFormStock(book.stockQuantity.toString());
    setFormIsbn(book.isbn); setFormDesc(book.description);
    setBookDialogOpen(true);
  };

  const handleSaveBook = () => {
    if (!formTitle || !formAuthor || !formPrice) { toast.error("Fill required fields"); return; }
    const bookData: Book = {
      id: editingBook?.id || `new-${Date.now()}`,
      title: formTitle, authors: formAuthor.split(",").map(a => a.trim()), genre: formGenre || "Fiction",
      isbn: formIsbn, price: parseFloat(formPrice), description: formDesc,
      stockQuantity: parseInt(formStock) || 0, imageUrl: editingBook?.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    };
    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? bookData : b));
      toast.success("Book updated!");
    } else {
      setBooks(prev => [...prev, bookData]);
      toast.success("Book added!");
    }
    setBookDialogOpen(false);
    resetForm();
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
    toast.success("Book deleted");
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as any } : o));
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  const stats = {
    totalBooks: books.length,
    totalOrders: orders.length,
    revenue: orders.filter(o => o.paymentStatus === "paid").reduce((s, o) => s + o.totalPrice, 0),
    lowStock: books.filter(b => b.stockQuantity < 10).length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Manage your bookstore</p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Books", value: stats.totalBooks, icon: BookIcon, color: "text-primary" },
          { label: "Total Orders", value: stats.totalOrders, icon: Package, color: "text-accent" },
          { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: BarChart3, color: "text-success" },
          { label: "Low Stock", value: stats.lowStock, icon: Users, color: "text-warning" },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-4 shadow-warm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="books" className="mt-8">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Books Tab */}
        <TabsContent value="books">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Inventory</h2>
            <Dialog open={bookDialogOpen} onOpenChange={v => { setBookDialogOpen(v); if (!v) resetForm(); }}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Book</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-3">
                  <div><Label>Title *</Label><Input value={formTitle} onChange={e => setFormTitle(e.target.value)} /></div>
                  <div><Label>Author(s) *</Label><Input value={formAuthor} onChange={e => setFormAuthor(e.target.value)} placeholder="Comma separated" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Genre</Label>
                      <Select value={formGenre} onValueChange={setFormGenre}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label>ISBN</Label><Input value={formIsbn} onChange={e => setFormIsbn(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Price *</Label><Input type="number" step="0.01" value={formPrice} onChange={e => setFormPrice(e.target.value)} /></div>
                    <div><Label>Stock</Label><Input type="number" value={formStock} onChange={e => setFormStock(e.target.value)} /></div>
                  </div>
                  <div><Label>Description</Label><textarea className="w-full rounded-md border bg-background px-3 py-2 text-sm" rows={3} value={formDesc} onChange={e => setFormDesc(e.target.value)} /></div>
                  <Button className="w-full" onClick={handleSaveBook}>{editingBook ? "Update" : "Add"} Book</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Genre</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium">{book.title}</div>
                      <div className="text-xs text-muted-foreground">{book.authors.join(", ")}</div>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell"><Badge variant="secondary">{book.genre}</Badge></td>
                    <td className="px-4 py-3 text-right font-medium">${book.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={book.stockQuantity < 10 ? "font-semibold text-destructive" : ""}>{book.stockQuantity}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(book)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteBook(book.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <h2 className="mb-4 font-display text-xl font-semibold">All Orders</h2>
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-display font-semibold">{order.id}</span>
                    <p className="text-xs text-muted-foreground">{order.customerName} • {order.customerEmail}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={order.status} onValueChange={v => updateOrderStatus(order.id, v)}>
                      <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  {order.items.map((item, i) => (
                    <span key={i} className="text-muted-foreground">{item.bookTitle} ×{item.quantity}{i < order.items.length - 1 ? ", " : ""}</span>
                  ))}
                </div>
                <div className="mt-2 text-right font-display font-bold text-primary">${order.totalPrice.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
