import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ShoppingBag, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";
import BookCard from "@/components/BookCard";
import { motion } from "framer-motion";

const Index = () => {
  const featuredBooks = mockBooks.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl font-bold text-primary-foreground md:text-6xl lg:text-7xl"
          >
            Discover Your Next
            <br />
            <span className="italic">Great Read</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80"
          >
            Browse thousands of books across every genre. From bestsellers to hidden gems, find the perfect book for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/books">
              <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                Create Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b py-12">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Vast Collection", desc: "Thousands of books across every genre" },
            { icon: ShoppingBag, title: "Easy Ordering", desc: "Simple checkout and fast delivery" },
            { icon: Shield, title: "Secure Payments", desc: "Your transactions are always safe" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="rounded-lg bg-primary/10 p-3"><f.icon className="h-6 w-6 text-primary" /></div>
              <div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Books</h2>
              <p className="mt-1 text-muted-foreground">Hand-picked recommendations just for you</p>
            </div>
            <Link to="/books" className="text-sm font-medium text-primary hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold">Ready to Start Reading?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Join thousands of book lovers. Create an account to track orders, write reviews, and get personalized recommendations.
          </p>
          <Link to="/register">
            <Button size="lg" className="mt-6">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
