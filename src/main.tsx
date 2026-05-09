import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hydrate the server-rendered HTML for better LCP performance
const rootElement = document.getElementById("root");
if (rootElement) {
  hydrateRoot(rootElement, <App />);
}
