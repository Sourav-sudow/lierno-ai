import React from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../ui/sparkles";
import { coursesData, Course } from "../data/coursesData";
import UserMenu from "./UserMenu";

export default function SubjectSelectionPage() {
  const navigate = useNavigate();
  const selectedCourse = localStorage.getItem("selectedCourse") as Course;
  const selectedYear = localStorage.getItem("selectedYear");
  const courseData = coursesData[selectedCourse];

  if (!courseData || !selectedYear) {
    navigate("/courses");
    return null;
  }

  const yearData = courseData.years[selectedYear as keyof typeof courseData.years];
  if (!yearData) {
    navigate("/years");
    return null;
  }

  const subjects = yearData.subjects;

  const handleSubjectSelect = (subject: string) => {
    localStorage.setItem("selectedSubject", subject);
    navigate("/topics");
  };

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

  const handleBack = () => {
    navigate("/years");
  };

  return (
    <div className="min-h-screen relative w-full bg-black overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticles-subjects"
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
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition duration-300"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {selectedCourse} - {selectedYear}
              </h1>
              <p className="text-gray-400 mt-1">Select Subject</p>
            </div>
          </div>
          <UserMenu onLogout={handleLogout} />
        </div>

        {/* Subjects Grid */}
        <div className="px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(subjects).map(
              ([subjectKey, subjectData]) => (
                <button
                  key={subjectKey}
                  onClick={() => handleSubjectSelect(subjectKey)}
                  className="group h-56 bg-gradient-to-br from-green-900/40 to-teal-900/40 hover:from-green-800/60 hover:to-teal-800/60 border border-green-700/50 hover:border-teal-500/50 rounded-xl p-8 transition duration-300 flex flex-col justify-between"
                >
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-teal-400">
                      {subjectKey}
                    </h2>
                    <p className="text-gray-400 group-hover:text-gray-300 text-sm">
                      {subjectData.name}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 group-hover:text-green-400">
                      {subjectData.topics.length} Topics
                    </p>
                  </div>
                </button>
              )
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
