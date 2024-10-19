import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import Dashboard from "./Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the schema using Zod
const schema = z.object({
  jobTitle: z.string().nonempty({ message: "Job title is required" }),
  jobDescription: z
    .string()
    .nonempty({ message: "Job description is required" }),
  experienceLevel: z
    .string()
    .nonempty({ message: "Experience level is required" }),
  candidateEmails: z
    .array(z.any())
    .min(1, { message: "At least one email is required" }),
  endDate: z.string().nonempty({ message: "End date is required" }),
});

const CreateInterview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Form submission
  const onSubmit = async (data) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://assignment-pehc.onrender.com/api/jobs/post",
          {
            ...data,
            candidateEmails: data.candidateEmails.map((email) => email.value), // Extract email addresses
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201 ||response.status === 200) {
          alert(response.data.message);
          reset();
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/");
    }
  };

  // select Options
  const options = [
    { value: "alice@yopmail.com", label: "Alice Johnson" },
    { value: "bob@yopmail.com", label: "Bob Smith" },
    { value: "charlie@yopmail.com", label: "Charlie Brown" },
    { value: "david@yopmail.com", label: "David Williams" },
    { value: "eve@example.com", label: "Eve Davis" },
  ];

  return (
    <Dashboard>
      <div className="mt-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md"
        >
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Job Title</label>
            <input
              type="text"
              {...register("jobTitle")}
              placeholder="Enter Job Title"
              className={`w-full px-4 py-2 mt-2 border ${
                errors.jobTitle ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Job Description</label>
            <textarea
              {...register("jobDescription")}
              placeholder="Enter Job Description"
              className={`w-full px-4 py-2 mt-2 border ${
                errors.jobDescription ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
            ></textarea>
            {errors.jobDescription && (
              <p className="text-red-500 text-sm">
                {errors.jobDescription.message}
              </p>
            )}
          </div>

          {/* Experience Level */}
          <div className="mb-4">
            <label className="block text-gray-700">Experience Level</label>
            <select
              {...register("experienceLevel")}
              className={`w-full px-4 py-2 mt-2 border ${
                errors.experienceLevel ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
            {errors.experienceLevel && (
              <p className="text-red-500 text-sm">
                {errors.experienceLevel.message}
              </p>
            )}
          </div>

          {/* Add Candidates */}
          <div className="mb-4">
            <label className="block text-gray-700">Add Candidates</label>
            <Select
              isMulti
              name="candidateEmails"
              options={options}
              onChange={(selected) => {
                setValue("candidateEmails", selected || []);
              }}
              classNamePrefix="select"
              placeholder="Enter candidate emails..."
            />
            {errors.candidateEmails && (
              <p className="text-red-500 text-sm">
                {errors.candidateEmails.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className={`w-full px-4 py-2 mt-2 border ${
                errors.endDate ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            {isLoading ? "Sending....." : "Send"}
          </button>
        </form>
      </div>
    </Dashboard>
  );
};

export default CreateInterview;
