import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

let idCounter = 0;

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 40) return;
      lastTime = now;
      const id = ++idCounter;
      setParticles(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 600);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute h-3 w-3 rounded-full bg-primary/30"
            style={{ left: p.x - 6, top: p.y - 6 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
