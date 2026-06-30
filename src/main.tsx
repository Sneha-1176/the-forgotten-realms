import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Disable browser's automatic scroll restoration so the page always
// opens at the top, not at the user's last scroll position.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
// Belt-and-braces: jump to top before React mounts.
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
