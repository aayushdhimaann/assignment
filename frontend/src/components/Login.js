import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema), // Integrate Zod schema
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //   handle login
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://assignment-pehc.onrender.com/api/auth/login",
        data
      );
      const token = response.data.token;
      sessionStorage.setItem("token", token);

      // Set a timeout to clear the session after 2 hours
      setTimeout(() => {
        sessionStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/"); // Redirect user to login page after session expires
      }, 2 * 60 * 60 * 1000);
      alert("Logged In Successfully");
      navigate("/jobs");
      reset();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError("Invalid credentials. Please check your email or password.");
        } else if (err.response.status === 401) {
          setError("Unauthorized. Please verify your account.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (err.request) {
        setError("No response from the server. Please check your network.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Logging....." : "Login"}
          </button>
        </form>
        <h2 className="text-xl text-center mt-6 text-blue-600 hover:underline">
          <Link to="/sign-up">Create New Acount</Link>
        </h2>
        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
