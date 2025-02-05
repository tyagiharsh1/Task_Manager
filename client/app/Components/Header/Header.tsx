"use client";
import { useTasks } from "@/context/taskContext"; // Corrected import
import { useUserContext } from "@/context/userContext"; // Corrected import
import { github, moon, profile } from "@/utils/Icons"; // Corrected import
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Header() {
  const { user, logoutUser, openProfileModal } = useUserContext(); // Added openProfileModal
  const { openModalForAdd, activeTasks } = useTasks();
  const router = useRouter();
  const { name } = user;
  const userId = user?._id;

  // State for theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check saved theme in local storage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <header className="px-6 my-4 w-full flex flex-col sm:flex-row items-center justify-between bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text shadow-md p-4 rounded-lg">
      <div className="flex-1">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">👋</span>
          {userId ? ` Welcome, ${name}!` : "Welcome to Task-Manager"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have <span className="font-bold text-[#3aafae]">{activeTasks.length}</span> active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-8">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-full hover:bg-[#00A1F1] transition-all duration-200"
          onClick={() => (userId ? openModalForAdd() : router.push("/login"))}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        {userId && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-blue-600" // Updated hover color to blue
            onClick={async () => {
              await logoutUser();
              router.push("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
