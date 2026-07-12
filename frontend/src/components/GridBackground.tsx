// A faint, slowly-drifting grid pattern that sits behind the particle field.
// Adds structure/depth to the background without competing with content.
export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 grid-fade" />
    </div>
  );
}
