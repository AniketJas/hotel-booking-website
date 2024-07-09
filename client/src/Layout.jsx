import React from "react";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="p-4 flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
