import { Routes, Route, Navigate } from "react-router-dom";

import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";

export function AppRoutes() {
  const user = localStorage.getItem("user");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />
      {!user && <Route path="*" element={<Navigate to={"/"} />} />}
    </Routes>
  );
}
