"use client";


import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        textAlign: "center",
      }}>
      <div>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          404 - Page Not Found
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          style={{ color: "#0070f3", textDecoration: "underline" }}>
          Go back home
        </Link>
      </div>
    </div>
  );
}
