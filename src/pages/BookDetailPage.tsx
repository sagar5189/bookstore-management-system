import { useParams, Link } from "react-router-dom";
import BookRecommendations from "@/components/BookRecommendations";
import { mockBooks } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const BookDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const book = mockBooks.find(b => b.id === id);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold">Book Not Found</h1>
        <p className="mt-2 text-muted-foreground">The book you're looking for doesn't exist.</p>
        <Link to="/books"><Button className="mt-4">Browse Books</Button></Link>
      </div>
    );
  }

  const handleReviewSubmit = () => {
    if (!reviewComment.trim()) { toast.error("Please write a comment"); return; }
    toast.success("Review submitted! (Demo)");
    setReviewComment("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/books" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Books
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[350px,1fr]">
        {/* Image */}
        <div className="overflow-hidden rounded-lg shadow-warm-lg">
          <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" />
        </div>

        {/* Details */}
        <div>
          <Badge variant="secondary" className="mb-3">{book.genre}</Badge>
          <h1 className="font-display text-3xl font-bold lg:text-4xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.authors.join(", ")}</p>

          {book.rating && (
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(book.rating!) ? "fill-warning text-warning" : "text-border"}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{book.rating} / 5</span>
            </div>
          )}

          <div className="mt-6 font-display text-3xl font-bold text-primary">${book.price.toFixed(2)}</div>

          <div className="mt-2 text-sm">
            {book.stockQuantity > 0 ? (
              <span className="text-success">✓ In Stock ({book.stockQuantity} available)</span>
            ) : (
              <span className="text-destructive">✗ Out of Stock</span>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Button size="lg" className="gap-2" onClick={() => addToCart(book)} disabled={book.stockQuantity === 0}>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold">About this book</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{book.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-secondary p-4 text-sm">
            <div><span className="text-muted-foreground">ISBN:</span> <span className="font-medium">{book.isbn}</span></div>
            <div><span className="text-muted-foreground">Genre:</span> <span className="font-medium">{book.genre}</span></div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10">
            <h3 className="font-display text-xl font-semibold">Reviews</h3>
            <div className="mt-4 rounded-lg border bg-card p-4">
              <p className="text-sm font-medium">Write a Review</p>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setReviewRating(n)}>
                    <Star className={`h-5 w-5 ${n <= reviewRating ? "fill-warning text-warning" : "text-border"}`} />
                  </button>
                ))}
              </div>
              <Textarea placeholder="Share your thoughts..." value={reviewComment} onChange={e => setReviewComment(e.target.value)} className="mt-3" />
              <Button size="sm" className="mt-3" onClick={handleReviewSubmit}>Submit Review</Button>
            </div>
          </div>
        </div>
      </div>

      <BookRecommendations currentBookId={book.id} genre={book.genre} />
    </div>
  );
};

export default BookDetailPage;
