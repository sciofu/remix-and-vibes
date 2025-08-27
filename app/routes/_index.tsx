const View = () => {
  return (
    <div className="relative min-h-[95.5vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <DotGrid />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
            Welcome to Vibes and Remix
          </h1>
          <p className="text-lg text-gray-300 animate-fade-in">
            Select a category from the navigation to get started.
          </p>
        </div>
      </div>
    </div>
  );
  function DotGrid() {
    const rows = 32,
      cols = 64;
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "0px",
          opacity: 0.2,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "0.25rem",
              height: "0.25rem",
              borderRadius: "9999px",
              background: "#374151",
            }}
          />
        ))}
      </div>
    );
  }
};

export default View;
