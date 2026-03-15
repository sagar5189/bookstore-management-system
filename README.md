# 📚 Shelf Sorter — Bookstore Frontend

A modern, responsive bookstore web application built with React and TypeScript. Customers can browse books, manage a cart, place orders, and write reviews — while admins manage inventory through a dedicated dashboard.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible component library |
| Radix UI | Headless UI primitives |
| React Router v6 | Client-side routing |
| TanStack Query | Server state management |
| React Hook Form | Form handling |
| Zod | Schema validation |
| Framer Motion | Animations |
| Recharts | Data visualisation |
| Vitest | Unit testing |

---

## 🗂 Project Structure

```
shelf-sorter-service/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              shadcn/ui component library
│   │   ├── BookCard.tsx     Book display card
│   │   ├── BookRecommendations.tsx
│   │   ├── CursorTrail.tsx  Interactive cursor effect
│   │   ├── Footer.tsx
│   │   ├── NavLink.tsx
│   │   └── Navbar.tsx
│   ├── context/
│   │   └── StoreContext.tsx  Global state (cart, auth)
│   ├── data/
│   │   └── mockData.ts       Sample book data
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx         Home / Landing page
│   │   ├── BooksPage.tsx     Browse all books
│   │   ├── BookDetailPage.tsx Single book view
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── OrdersPage.tsx    Order history
│   │   ├── AdminPage.tsx     Admin dashboard
│   │   ├── ApiDocsPage.tsx   API documentation viewer
│   │   └── NotFound.tsx
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── types/
│   │   └── index.ts          TypeScript interfaces
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Prerequisites

- Node.js 18+
- npm or bun

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shelf-sorter-service.git
cd shelf-sorter-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open in Browser

```
http://localhost:8080
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |

---

## 📡 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home / Landing | Public |
| `/books` | Browse all books | Public |
| `/books/:id` | Book detail | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/cart` | Shopping cart | Customer |
| `/orders` | Order history | Customer |
| `/admin` | Admin dashboard | Admin |
| `/api-docs` | API documentation | Public |

---

## 🔑 Key Features

- **Browse Books** — Search, filter by genre, sort by price or rating
- **Book Details** — Full description, stock status, reviews and ratings
- **Shopping Cart** — Add/remove items, adjust quantity, view total
- **User Auth** — Register, login, role-based access (Customer / Admin)
- **Order Management** — Place orders, track order history and status
- **Admin Dashboard** — Manage books, view all orders, update status
- **Responsive Design** — Works on mobile, tablet and desktop
- **Animations** — Smooth transitions and cursor trail effect

---

## 🧩 Data Types

```typescript
Book         → id, title, authors, genre, isbn, price,
               description, stockQuantity, imageUrl, rating, reviews

User         → id, name, email, role (customer | admin)

Order        → id, userId, items, totalPrice,
               status (pending | shipped | delivered | cancelled),
               paymentStatus (paid | unpaid | refunded)

CartItem     → book, quantity
Review       → id, userId, userName, rating, comment, createdAt
```

---

## 🔗 Backend Integration

This frontend is designed to connect to the **Bookstore Management REST API** (Spring Boot).

Update the API base URL in your environment configuration:

```env
VITE_API_BASE_URL=http://localhost:8080
```

**Backend API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get book by ID |
| POST | `/api/orders` | Place new order |
| GET | `/api/orders/my-orders` | Get order history |

---

## 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch
```

---

## 🏗 Building for Production

```bash
npm run build
```

Output files will be in the `dist/` folder. Deploy to any static hosting platform such as Vercel, Netlify, or AWS S3.

---

## 📄 License

This project is licensed under the MIT License.
