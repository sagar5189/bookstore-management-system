import { mockBooks } from "@/data/mockData";
import BookCard from "@/components/BookCard";

interface BookRecommendationsProps {
  currentBookId: string;
  genre: string;
}

const BookRecommendations = ({ currentBookId, genre }: BookRecommendationsProps) => {
  const recommendations = mockBooks
    .filter(b => b.id !== currentBookId && b.genre === genre)
    .slice(0, 4);

  const fallback = recommendations.length < 2
    ? mockBooks.filter(b => b.id !== currentBookId && !recommendations.find(r => r.id === b.id)).slice(0, 4 - recommendations.length)
    : [];

  const allRecs = [...recommendations, ...fallback];

  if (allRecs.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold">You May Also Like</h2>
      <p className="mt-1 text-sm text-muted-foreground">Based on genre: {genre}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allRecs.map((book, i) => (
          <BookCard key={book.id} book={book} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BookRecommendations;
