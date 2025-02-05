"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

function RegisterForm() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name = "", email = "", password = "" } = userState || {}; // Ensure fields are empty by default
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);

  // Validate fields before submitting
  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      registerUser(e);
    }
  };

  return (
    <form
      className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]"
      onSubmit={handleSubmit}
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Create an account.{" "}
          <span className="whitespace-nowrap">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
            >
              Login here
            </a>
          </span>
        </p>

        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#999]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name="name"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="johndoe@gmail.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="***************"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
            onClick={togglePassword}
          >
            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex">
          <button
            type="submit"
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
          >
            Register Now
          </button>
        </div>
      </div>
      <img src="/flurry.png" alt="Decorative Image" />
    </form>
  );
}

export default RegisterForm;
