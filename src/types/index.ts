export interface Book {
  id: string;
  title: string;
  authors: string[];
  genre: string;
  isbn: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageUrl: string;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface OrderItem {
  bookId: string;
  bookTitle: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  createdAt: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
