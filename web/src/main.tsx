import { ChatWindow } from "@/components/chat/chat-window.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatWindow />
  </StrictMode>,
);
