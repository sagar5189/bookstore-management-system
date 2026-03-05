import { useState, useMemo } from "react";
import { mockBooks, GENRES } from "@/data/mockData";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const BOOKS_PER_PAGE = 8;

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(searchParams.get("genre") || "all");
  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let books = [...mockBooks];
    if (search) {
      const q = search.toLowerCase();
      books = books.filter(b => b.title.toLowerCase().includes(q) || b.authors.some(a => a.toLowerCase().includes(q)));
    }
    if (genre !== "all") books = books.filter(b => b.genre === genre);
    books.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      return a.title.localeCompare(b.title);
    });
    return books;
  }, [search, genre, sort]);

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE);
  const paged = filtered.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Browse Books</h1>
      <p className="mt-1 text-muted-foreground">Explore our full collection</p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by title or author..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={genre} onValueChange={v => { setGenre(v); setPage(1); }}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Genre" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="price-asc">Price: Low-High</SelectItem>
            <SelectItem value="price-desc">Price: High-Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="mt-4 text-sm text-muted-foreground">{filtered.length} book{filtered.length !== 1 ? "s" : ""} found</div>

      {paged.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paged.map((book, i) => <BookCard key={book.id} book={book} index={i} />)}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted-foreground">No books found. Try adjusting your filters.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
