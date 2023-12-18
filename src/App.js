import "./App.css";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import TicketPage from "./pages/TicketPage";
import Balance from "./pages/Balance";
import TicketListPage from "./pages/TicketListPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/tickets" element={<TicketListPage />} />
        <Route path="/movies/:id" element={<DetailPage />} />
        <Route path="/tickets/:id" element={<TicketPage />} />
      </Routes>
    </>
  );
}

export default App;
