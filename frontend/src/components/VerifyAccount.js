import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define Zod schema for validation
const verificationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  otp: z.string().min(6, { message: "OTP must be 6 characters long" }),
});

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://assignment-pehc.onrender.com/api/auth/verify-otp",
        data
      );
      alert("Email verification successful!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(
          `Verification failed: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        alert("Verification failed: No response from server.");
      } else {
        alert(`Verification failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Verify Email
        </h2>
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

          {/* OTP Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="OTP"
              {...register("otp")}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.otp ? "border-red-500" : ""
              }`}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Verifying" : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
