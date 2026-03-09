import { Book, Order } from "@/types";

export const GENRES = ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Biography", "History", "Self-Help", "Technology"];

export const mockBooks: Book[] = [
  {
    id: "1", title: "The Midnight Library", authors: ["Matt Haig"], genre: "Fiction",
    isbn: "978-0525559474", price: 14.99, description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    stockQuantity: 45, imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", rating: 4.5,
  },
  {
    id: "2", title: "Atomic Habits", authors: ["James Clear"], genre: "Self-Help",
    isbn: "978-0735211292", price: 16.99, description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.",
    stockQuantity: 120, imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", rating: 4.8,
  },
  {
    id: "3", title: "Project Hail Mary", authors: ["Andy Weir"], genre: "Science Fiction",
    isbn: "978-0593135204", price: 18.99, description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are finished.",
    stockQuantity: 32, imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", rating: 4.7,
  },
  {
    id: "4", title: "The Name of the Wind", authors: ["Patrick Rothfuss"], genre: "Fantasy",
    isbn: "978-0756404741", price: 15.99, description: "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life.",
    stockQuantity: 28, imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", rating: 4.6,
  },
  {
    id: "5", title: "Educated", authors: ["Tara Westover"], genre: "Biography",
    isbn: "978-0399590504", price: 13.99, description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    stockQuantity: 55, imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop", rating: 4.4,
  },
  {
    id: "6", title: "Dune", authors: ["Frank Herbert"], genre: "Science Fiction",
    isbn: "978-0441172719", price: 12.99, description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    stockQuantity: 67, imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop", rating: 4.6,
  },
  {
    id: "7", title: "The Silent Patient", authors: ["Alex Michaelides"], genre: "Mystery",
    isbn: "978-1250301697", price: 14.49, description: "Alicia Berenson's life is seemingly perfect until one evening her husband Gabriel returns home late and she shoots him five times in the face.",
    stockQuantity: 40, imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop", rating: 4.3,
  },
  {
    id: "8", title: "Clean Code", authors: ["Robert C. Martin"], genre: "Technology",
    isbn: "978-0132350884", price: 34.99, description: "A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    stockQuantity: 22, imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop", rating: 4.5,
  },
  {
    id: "9", title: "The Great Gatsby", authors: ["F. Scott Fitzgerald"], genre: "Fiction",
    isbn: "978-0743273565", price: 11.99, description: "A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation.",
    stockQuantity: 80, imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", rating: 4.4,
  },
  {
    id: "10", title: "Sapiens: A Brief History of Humankind", authors: ["Yuval Noah Harari"], genre: "History",
    isbn: "978-0062316097", price: 17.99, description: "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    stockQuantity: 60, imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", rating: 4.7,
  },
  {
    id: "11", title: "The Hobbit", authors: ["J.R.R. Tolkien"], genre: "Fantasy",
    isbn: "978-0547928227", price: 13.49, description: "Bilbo Baggins is a hobbit who enjoys a comfortable life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when Gandalf the wizard arrives.",
    stockQuantity: 95, imageUrl: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", rating: 4.8,
  },
  {
    id: "12", title: "Becoming", authors: ["Michelle Obama"], genre: "Biography",
    isbn: "978-1524763138", price: 16.49, description: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States.",
    stockQuantity: 70, imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop", rating: 4.6,
  },
  {
    id: "13", title: "The Alchemist", authors: ["Paulo Coelho"], genre: "Fiction",
    isbn: "978-0062315007", price: 12.49, description: "A magical fable about following your dream, from the bestselling author Paulo Coelho.",
    stockQuantity: 110, imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop", rating: 4.5,
  },
  {
    id: "14", title: "Deep Work", authors: ["Cal Newport"], genre: "Self-Help",
    isbn: "978-1455586691", price: 15.99, description: "Rules for focused success in a distracted world. Deep work is the ability to focus without distraction on a cognitively demanding task.",
    stockQuantity: 38, imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=600&fit=crop", rating: 4.6,
  },
  {
    id: "15", title: "Gone Girl", authors: ["Gillian Flynn"], genre: "Mystery",
    isbn: "978-0307588371", price: 13.99, description: "On a warm summer morning in Missouri, Nick Dunne's wife Amy suddenly disappears. As the investigation unfolds, the story takes dark twists.",
    stockQuantity: 50, imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop", rating: 4.3,
  },
  {
    id: "16", title: "The Pragmatic Programmer", authors: ["David Thomas", "Andrew Hunt"], genre: "Technology",
    isbn: "978-0135957059", price: 39.99, description: "Your journey to mastery. A classic guide to software development best practices, updated for the modern era.",
    stockQuantity: 18, imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=600&fit=crop", rating: 4.7,
  },
  {
    id: "17", title: "Pride and Prejudice", authors: ["Jane Austen"], genre: "Romance",
    isbn: "978-0141439518", price: 9.99, description: "A romantic novel of manners that depicts the emotional development of the protagonist Elizabeth Bennet.",
    stockQuantity: 85, imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=600&fit=crop", rating: 4.5,
  },
  {
    id: "18", title: "Thinking, Fast and Slow", authors: ["Daniel Kahneman"], genre: "Non-Fiction",
    isbn: "978-0374533557", price: 14.99, description: "A groundbreaking tour of the mind that explains the two systems that drive the way we think.",
    stockQuantity: 42, imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop", rating: 4.6,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001", userId: "u1", customerName: "Alice Johnson", customerEmail: "alice@email.com",
    items: [{ bookId: "1", bookTitle: "The Midnight Library", quantity: 1, price: 14.99 }, { bookId: "2", bookTitle: "Atomic Habits", quantity: 2, price: 16.99 }],
    totalPrice: 48.97, status: "delivered", paymentStatus: "paid", createdAt: "2026-02-28T10:30:00Z",
  },
  {
    id: "ORD-002", userId: "u2", customerName: "Bob Smith", customerEmail: "bob@email.com",
    items: [{ bookId: "3", bookTitle: "Project Hail Mary", quantity: 1, price: 18.99 }],
    totalPrice: 18.99, status: "shipped", paymentStatus: "paid", createdAt: "2026-03-01T14:00:00Z",
  },
  {
    id: "ORD-003", userId: "u3", customerName: "Carol White", customerEmail: "carol@email.com",
    items: [{ bookId: "4", bookTitle: "The Name of the Wind", quantity: 1, price: 15.99 }, { bookId: "6", bookTitle: "Dune", quantity: 1, price: 12.99 }],
    totalPrice: 28.98, status: "pending", paymentStatus: "unpaid", createdAt: "2026-03-04T09:15:00Z",
  },
  {
    id: "ORD-004", userId: "u1", customerName: "Alice Johnson", customerEmail: "alice@email.com",
    items: [{ bookId: "8", bookTitle: "Clean Code", quantity: 1, price: 34.99 }],
    totalPrice: 34.99, status: "pending", paymentStatus: "paid", createdAt: "2026-03-05T08:00:00Z",
  },
];
