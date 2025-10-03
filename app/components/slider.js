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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamData.length) % teamData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCodeforcesColor = (rating) => {
    if (rating === "Master") return "text-red-600";
    if (rating === "Candidate Master") return "text-purple-600";
    return "text-blue-600";
  };

  const getCodeforcesBgColor = (rating) => {
    if (rating === "Master") return "bg-red-50 border-red-100";
    if (rating === "Candidate Master") return "bg-purple-50 border-purple-100";
    return "bg-blue-50 border-blue-100";
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl">
      {/* Slider Container */}
      <div className="relative min-h-[500px] p-10 md:p-16">
        {teamData.map((member, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out p-10 md:p-16 ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-16 pointer-events-none'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl md:text-5xl font-extrabold shadow-lg transform transition-transform duration-300 hover:scale-105">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">{member.name}</h2>
                <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">{member.organization}</p>
                
                <div className="mb-8">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">Achievements</h3>
                  <ul className="space-y-4">
                    {member.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start text-base md:text-lg">
                        <span className="text-blue-500 mr-3 text-xl">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`inline-flex items-center space-x-4 px-6 py-3 rounded-xl border-2 ${getCodeforcesBgColor(member.codeforces)} shadow-sm transition-all duration-300 hover:shadow-md`}>
                  <span className="text-sm md:text-base font-medium text-gray-700">Codeforces:</span>
                  <span className={`font-bold text-base md:text-lg ${getCodeforcesColor(member.codeforces)}`}>
                    {member.codeforces}
                  </span>
                  {member.handle && (
                    <span className="text-sm md:text-base text-gray-600 bg-white px-4 py-2 rounded-lg shadow-inner">
                      {member.handle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-[-20px] md:left-[-30px] top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-[-20px] md:right-[-30px] top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {teamData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-600 scale-125 shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isAutoPlaying ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            )}
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
        {currentSlide + 1} / {teamData.length}
      </div>
    </div>
  );
};

export default Slider;