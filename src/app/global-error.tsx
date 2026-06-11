"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
        }}>
        <div style={{ textAlign: "center" }}>
          <h2>Something went wrong globally!</h2>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
