"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Pause, Play, Users, Cpu } from 'lucide-react';

// --- Team Data 
const teamData = [
   {
    name: "Muhammad Shahriar",
    organization: "Enosis",
    achievements: [
      "17th in Dhaka Regional, ICPC 2020",
      "Codeforces: Muhammad (max: 1830)",
      "Senior Software Engineer experience"
    ],
    codeforces: "Expert", 
    handle: "_Muhammad (1830)"
  },
   {
    name: "Md Maruf Sarker",
    organization: "CPS Academy",
    achievements: [
      "Senior Social Media Manager"
    ],
    
  },
  
  {
    name: "Sayeef Mahmud",
    organization: "Cefalo",
    achievements: [
      "5th in ICPC West Continent Finals, 2021",
      "ICPC World Finalist, 2022",
      "Codeforces Master"
    ],
    codeforces: "Master",
    handle: "sayeef_m (2100+)"
  },
  {
    name: "Md. Rakib Hossain",
    organization: "Inverse AI",
    achievements: [
      "4th ICPC Dinaka Regional, 2024",
      "Asia West Continent Finalist, 2025",
      "Codeforces Master"
    ],
    codeforces: "Master",
    handle: "rakib_h (2100+)"
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
 
];


const getCodeforcesColor = (rating) => {
  switch (rating) {
    case "Master":
      return { text: "text-red-600", bg: "bg-red-50/70 border-red-300" };
    case "Candidate Master":
      return { text: "text-purple-600", bg: "bg-purple-50/70 border-purple-300" };
    case "Expert":
      return { text: "text-blue-600", bg: "bg-blue-50/70 border-blue-300" };
    default:
      return { text: "text-gray-600", bg: "bg-gray-100 border-gray-300" };
  }
};


const cardVariants = {

  initial: { opacity: 0, y: 30, scale: 0.95 }, 

  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      delay: 0.1,
      ease: [0.17, 0.67, 0.83, 0.9] 
    } 
  },
  
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98, 
    transition: { 
      duration: 0.3 
    } 
  },
};

// --- Main Slider Component ---
const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamData.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isAutoPlaying, ]);

  // Handler for dot navigation
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause on manual interaction
  }, []);

  const currentMember = teamData[currentSlide];
  const ratingStyles = getCodeforcesColor(currentMember.codeforces);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500">
        
        {/* Header/Title Area */}
        <div className="p-6 md:p-8 text-center bg-blue-600/10 backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            Our Competitive Programming Team
          </h1>
          <p className="text-sm text-gray-500 mt-1">Meet the high achievers and Codeforces heroes.</p>
        </div>

        {/* Slider Body Container */}
        <div className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] p-6 sm:p-8 md:p-10">
          <AnimatePresence initial={false} mode="wait">
            {/* The motion.div only renders the current slide, and AnimatePresence handles transitions when the key (currentSlide) changes */}
            <motion.div
              key={currentSlide}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center"
            >
              
              {/* Profile Header and Image Placeholder */}
              <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
                
                {/* Profile Placeholder */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold shadow-lg transform transition-transform duration-300 hover:scale-105 ring-4 ring-blue-100">
                  {currentMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none">
                  {currentMember.name}
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-blue-600 font-medium -mt-2">
                  {currentMember.organization}
                </p>
              </div>

              {/* Codeforces Rating Badge */}
              <div className={`mt-4 mb-6 inline-flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-2 rounded-xl border ${ratingStyles.bg} shadow-md transition-all duration-300`}>
                <Cpu className={`w-5 h-5 ${ratingStyles.text}`} />
                <span className="text-sm sm:text-base font-semibold text-gray-700">Codeforces:</span>
                <span className={`font-extrabold text-base sm:text-lg ${ratingStyles.text}`}>
                  {currentMember.codeforces}
                </span>
                {currentMember.handle && (
                  <span className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-1 rounded-lg shadow-inner border border-gray-200">
                    {currentMember.handle}
                  </span>
                )}
              </div>

              {/* Achievements List */}
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto mt-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 border-b border-blue-200 pb-2 flex items-center justify-center gap-2">
                  Key Achievements
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-left">
                  {currentMember.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start text-sm sm:text-base md:text-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mr-3 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="relative p-4 sm:p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            
          {/* Auto-play Toggle Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-full px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline">Auto-play</span>
              </>
            )}
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2 sm:space-x-3">
            {teamData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-inner ${
                  index === currentSlide
                    ? 'bg-blue-600 w-4 h-4 scale-105 shadow-md'
                    : 'bg-gray-300 hover:bg-blue-300'
                }`}
                aria-label={`Go to slide ${index + 1}: ${teamData[index].name}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold shadow-md">
            {currentSlide + 1} / {teamData.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
