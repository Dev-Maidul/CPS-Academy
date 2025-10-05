"use client";

import { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const teamData = [
    {
      name: "Sayeef Mahmud",
      organization: "Cefalo",
      achievements: [
        "5th in ICPC West continent finals, 2021",
        "ICPC World Finalist, 2022",
        "Codeforces Master"
      ],
      codeforces: "Master"
    },
    {
      name: "Md. Rakib Hossain",
      organization: "Inverse AI",
      achievements: [
        "4th ICPC Dinaka Regional, 2024",
        "Asia West Continent Finalist, 2025",
        "Codeforces Master"
      ],
      codeforces: "Master"
    },
    {
      name: "Naiful Islam",
      organization: "BUET, CSE",
      achievements: [
        "5th in ICPC Preliminary, 2022",
        "4th in BUET ICPC",
        "Codeforces Candidate Master"
      ],
      codeforces: "Candidate Master",
      handle: "Ami_Nafi (2034)"
    },
    {
      name: "Sajjad Sadi",
      organization: "AppsCode",
      achievements: [
        "3 Times ICPC West Finalist",
        "8th Dhaka Regional, 2023",
        "Codeforces Candidate Master"
      ],
      codeforces: "Candidate Master",
      handle: "Sadi_74 (1994)"
    },
    {
      name: "Muhammad Shahriar",
      organization: "Enoils",
      achievements: [
        "17th in Dhaka Regional, ICPC 2020",
        "Codeforces: Muhammad (max: 1830)",
        "Senior Software Engineer experience"
      ],
      codeforces: "1830",
      handle: "_Muhammad (1830)"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamData.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCodeforcesColor = (rating) => {
    if (rating === "Master") return "text-red-500";
    if (rating === "Candidate Master") return "text-purple-500";
    return "text-blue-500";
  };

  const getCodeforcesBgColor = (rating) => {
    if (rating === "Master") return "bg-red-50 border-red-200";
    if (rating === "Candidate Master") return "bg-purple-50 border-purple-200";
    return "bg-blue-50 border-blue-200";
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-xl">
      {/* Slider Container */}
      <div className="relative min-h-[450px] sm:min-h-[500px] p-4 sm:p-6 md:p-8 lg:p-10">
        {teamData.map((member, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out p-4 sm:p-6 md:p-8 lg:p-10 ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10 pointer-events-none'
            }`}
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold shadow-md transform transition-transform duration-300 hover:scale-105">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 tracking-tight">{member.name}</h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600 font-medium mb-4 sm:mb-6">{member.organization}</p>
                
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-3 border-b-2 border-blue-100 pb-2">Achievements</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {member.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start text-sm sm:text-base md:text-lg">
                        <span className="text-blue-500 mr-2 text-lg sm:text-xl">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`inline-flex items-center space-x-3 sm:space-x-4 px-4 sm:px-5 py-2 sm:py-3 rounded-lg border-2 ${getCodeforcesBgColor(member.codeforces)} shadow-sm transition-all duration-300 hover:shadow-md`}>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Codeforces:</span>
                  <span className={`font-bold text-sm sm:text-base md:text-lg ${getCodeforcesColor(member.codeforces)}`}>
                    {member.codeforces}
                  </span>
                  {member.handle && (
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-inner">
                      {member.handle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {teamData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-600 scale-125 shadow-md' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 sm:p-3 shadow-md transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isAutoPlaying ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            )}
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium shadow-md">
        {currentSlide + 1} / {teamData.length}
      </div>
    </div>
  );
};

export default Slider;