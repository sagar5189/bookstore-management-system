import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const endpoints = [
  {
    category: "Books",
    items: [
      { method: "GET", path: "/api/books", desc: "Retrieve a list of all books with pagination", params: "?page=1&size=10&genre=Fiction&search=harry", response: '{ "data": [...], "total": 50, "page": 1 }' },
      { method: "GET", path: "/api/books/{id}", desc: "Retrieve details of a single book", params: "id: string (path)", response: '{ "id": "1", "title": "...", "authors": [...], ... }' },
      { method: "POST", path: "/api/books", desc: "Add a new book (Admin only)", params: '{ "title", "authors", "genre", "isbn", "price", "description", "stockQuantity", "imageUrl" }', response: '201 Created { "id": "new-id", ... }' },
      { method: "PUT", path: "/api/books/{id}", desc: "Update a book's details (Admin only)", params: '{ "price"?, "stockQuantity"?, "title"?, ... }', response: '200 OK { updated book }' },
      { method: "DELETE", path: "/api/books/{id}", desc: "Delete a book (Admin only)", params: "id: string (path)", response: "204 No Content" },
    ],
  },
  {
    category: "Authentication",
    items: [
      { method: "POST", path: "/api/register", desc: "Register a new user", params: '{ "name", "email", "password", "role": "customer"|"admin" }', response: '201 Created { "id", "name", "email", "role", "token" }' },
      { method: "POST", path: "/api/login", desc: "Authenticate user and return JWT", params: '{ "email", "password" }', response: '200 OK { "token": "jwt...", "user": { ... } }' },
    ],
  },
  {
    category: "Orders",
    items: [
      { method: "GET", path: "/api/orders", desc: "Retrieve all orders (Admin) or user's orders", params: "?page=1&size=10&status=pending", response: '{ "data": [...], "total": 20 }' },
      { method: "GET", path: "/api/orders/{id}", desc: "Retrieve details of a single order", params: "id: string (path)", response: '{ "id", "items", "status", "totalPrice", ... }' },
      { method: "POST", path: "/api/orders", desc: "Place a new order (Customer only)", params: '{ "items": [{ "bookId", "quantity" }], "paymentMethod": "..." }', response: '201 Created { order }' },
      { method: "PUT", path: "/api/orders/{id}/status", desc: "Update order status (Admin only)", params: '{ "status": "pending"|"shipped"|"delivered"|"cancelled" }', response: '200 OK { updated order }' },
    ],
  },
  {
    category: "Reviews",
    items: [
      { method: "GET", path: "/api/books/{id}/reviews", desc: "Get reviews for a book", params: "id: string (path)", response: '{ "data": [{ "rating", "comment", "userName", ... }] }' },
      { method: "POST", path: "/api/books/{id}/reviews", desc: "Add a review (Authenticated)", params: '{ "rating": 1-5, "comment": "..." }', response: '201 Created { review }' },
    ],
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-success/15 text-success border-success/30",
  POST: "bg-primary/15 text-primary border-primary/30",
  PUT: "bg-warning/15 text-warning-foreground border-warning/30",
  DELETE: "bg-destructive/15 text-destructive border-destructive/30",
};

const errorCodes = [
  { code: "200 OK", desc: "Request succeeded" },
  { code: "201 Created", desc: "Resource created successfully" },
  { code: "204 No Content", desc: "Resource deleted successfully" },
  { code: "400 Bad Request", desc: "Invalid request parameters or body" },
  { code: "401 Unauthorized", desc: "Missing or invalid JWT token" },
  { code: "403 Forbidden", desc: "Insufficient permissions (e.g., customer accessing admin endpoint)" },
  { code: "404 Not Found", desc: "Resource not found" },
  { code: "409 Conflict", desc: "Resource already exists (e.g., duplicate ISBN)" },
  { code: "422 Unprocessable", desc: "Validation error in request body" },
  { code: "500 Internal Server Error", desc: "Unexpected server error" },
];

const ApiDocsPage = () => (
  <div className="container mx-auto px-4 py-8">
    <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
      <ArrowLeft className="h-4 w-4" /> Back to Home
    </Link>

    <h1 className="mt-4 font-display text-3xl font-bold">API Documentation</h1>
    <p className="mt-1 text-muted-foreground">RESTful API reference for the PageTurner Bookstore Management System</p>

    <div className="mt-2 rounded-lg bg-secondary p-3 text-sm">
      <strong>Base URL:</strong> <code className="rounded bg-muted px-1.5 py-0.5">https://api.pageturner.com/api</code> &nbsp;|&nbsp;
      <strong>Auth:</strong> Bearer JWT Token &nbsp;|&nbsp;
      <strong>Format:</strong> JSON
    </div>

    <Tabs defaultValue="endpoints" className="mt-6">
      <TabsList>
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="errors">Error Codes</TabsTrigger>
        <TabsTrigger value="auth">Authentication</TabsTrigger>
      </TabsList>

      <TabsContent value="endpoints" className="mt-4 space-y-8">
        {endpoints.map(cat => (
          <div key={cat.category}>
            <h2 className="font-display text-xl font-semibold">{cat.category}</h2>
            <div className="mt-3 space-y-3">
              {cat.items.map((ep, i) => (
                <div key={i} className="rounded-lg border bg-card p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={methodColor[ep.method]}>{ep.method}</Badge>
                    <code className="text-sm font-semibold">{ep.path}</code>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{ep.desc}</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Parameters / Body</span>
                      <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-xs">{ep.params}</pre>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Response</span>
                      <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-xs">{ep.response}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="errors" className="mt-4">
        <h2 className="font-display text-xl font-semibold">HTTP Status Codes</h2>
        <div className="mt-3 rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {errorCodes.map(e => (
                <tr key={e.code} className="border-t">
                  <td className="px-4 py-2.5"><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">{e.code}</code></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="auth" className="mt-4">
        <h2 className="font-display text-xl font-semibold">JWT Authentication</h2>
        <div className="mt-3 space-y-4 text-sm">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">How it works</h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-muted-foreground">
              <li>Register via <code className="rounded bg-muted px-1 text-xs">POST /api/register</code> or login via <code className="rounded bg-muted px-1 text-xs">POST /api/login</code></li>
              <li>Receive a JWT token in the response</li>
              <li>Include the token in subsequent requests: <code className="rounded bg-muted px-1 text-xs">Authorization: Bearer &lt;token&gt;</code></li>
              <li>Token expires after 24 hours; re-authenticate to get a new one</li>
            </ol>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Role-Based Access</h3>
            <div className="mt-2 space-y-1 text-muted-foreground">
              <p><Badge variant="secondary">Customer</Badge> Can browse books, place orders, write reviews, view own orders</p>
              <p><Badge variant="secondary">Admin</Badge> Full access: manage books, view all orders, update order status, manage users</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Example Request</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`curl -X POST https://api.pageturner.com/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "secret123"}'

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "u1", "name": "John", "role": "customer" }
}`}</pre>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default ApiDocsPage;
