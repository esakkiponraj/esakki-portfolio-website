import { useEffect, useRef } from 'react';

// A soft, blurred light that follows the cursor around the page.
// Desktop / fine-pointer devices only — skipped entirely on touch screens.
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 3 };

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    const animate = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-[1] pointer-events-none w-[480px] h-[480px] -ml-[240px] -mt-[240px] rounded-full blur-[90px] will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(37,99,235,0.30) 0%, rgba(56,189,248,0.12) 45%, transparent 70%)',
      }}
    />
  );
}
