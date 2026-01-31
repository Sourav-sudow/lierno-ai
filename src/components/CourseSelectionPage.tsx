import React from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../ui/sparkles";
import { coursesData, Course } from "../data/coursesData";
import UserMenu from "./UserMenu";

export default function CourseSelectionPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("selectedCourse");
    localStorage.removeItem("selectedYear");
    localStorage.removeItem("selectedSubject");
    localStorage.removeItem("selectedTopic");
    navigate("/login");
  };

  const handleCourseSelect = (course: Course) => {
    localStorage.setItem("selectedCourse", course);
    navigate("/years");
  };

  return (
    <div className="min-h-screen relative w-full bg-black overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticles-courses"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-bold text-white">Select Your Course</h1>
          <UserMenu onLogout={handleLogout} />
        </div>

        {/* Courses Grid */}
        <div className="px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(coursesData).map(([courseKey, courseData]) => {
              const subjectCount = Object.values(courseData.years).reduce(
                (acc, yearData) => acc + Object.keys(yearData.subjects).length,
                0
              );
              return (
              <button
                key={courseKey}
                onClick={() => handleCourseSelect(courseKey as Course)}
                className="group h-64 bg-gradient-to-br from-blue-900/40 to-purple-900/40 hover:from-blue-800/60 hover:to-purple-800/60 border border-blue-700/50 hover:border-purple-500/50 rounded-xl p-8 transition duration-300 flex flex-col justify-between"
              >
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">
                    {courseKey}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300">
                    {courseData.name}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 group-hover:text-blue-400">
                    {subjectCount} Subjects
                  </p>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
