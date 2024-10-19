import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define Zod schema for validation
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  employeeSize: z.string().regex(/^\d+$/, "Employee size must be a number").min(1, { message: "Employee size is required" }),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema), // Integrate Zod schema
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      if (response.status === 201) {
        alert("Registration successful, and an email is sent to you for verification");
        reset();
        navigate("/verify-account");
      } else {
        alert("Failed to register");
      }
    } catch (error) {
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Registration failed: No response from server.");
      } else {
        console.error("Error message:", error.message);
        alert(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone no."
              {...register("phone")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Company Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Company Name"
              {...register("companyName")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.companyName ? "border-red-500" : ""}`}
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
          </div>

          {/* Employee Size Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Employee Size"
              {...register("employeeSize")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.employeeSize ? "border-red-500" : ""}`}
            />
            {errors.employeeSize && <p className="text-red-500 text-sm mt-1">{errors.employeeSize.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Submitting...." : "Sign Up"}
          </button>
        </form>
        <h2 className="text-xl text-center mt-6">
          <Link to="/" className="text-blue-600 hover:underline">Click here</Link> to Login
        </h2>
      </div>
    </div>
  );
};

export default Signup;
