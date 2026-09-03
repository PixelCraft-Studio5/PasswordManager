import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F7F7F8] text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white md:flex-row">
      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-md dark:border-gray-700 dark:bg-[#1f2b3c] dark:text-gray-200 md:hidden"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={sidebarOpen}
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          aria-label="Close menu"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 h-full w-72 border-r border-gray-200 bg-white p-8 shadow-xl transition-transform duration-300 dark:border-gray-800 dark:bg-[#101827] md:static md:block md:w-72 md:translate-x-0 md:shadow-sm ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <main className="min-h-0 h-full flex-1 overflow-y-auto bg-transparent p-4 pt-20 transition-colors duration-300 dark:bg-[#030712] sm:p-6 sm:pt-20 md:p-10 md:pt-10">
        <Outlet />
      </main>
    </div>
  );
}