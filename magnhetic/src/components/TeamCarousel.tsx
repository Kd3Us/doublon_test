'use client';

import React, { useState } from 'react';
import Image from 'next/image'

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

const TeamCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const team: TeamMember[] = [
    { name: "Cherif Kamel", role: "Co-founder", img: "/members_photo/cherif.JPG" },
    { name: "Feres Mamoun", role: "Co-founder", img: "/members_photo/feres.JPG" },
    { name: "William Amani Nguetta", role: "dev back, responsable communication", img: "/members_photo/amani.JPG" },
    { name: "Jules Sorentino", role: "Designer", img: "/members_photo/jules.JPG" },
    { name: "Noa Miramont", role: "Marketing Director", img: "/members_photo/noa.JPG" },
    { name: "Imen Khlifi", role: "Developer", img: "/members_photo/imen.JPG" },
    { name: "Loai Elatar", role: "Product Manager", img: "/members_photo/loai.JPG" },
    { name: "Nermine Khadhraoui", role: "Sales Director", img: "/members_photo/nermine.JPG" },
    { name: "Precilia Kouassi", role: "HR Manager", img: "/members_photo/precilia.JPG" }
  ];

  const getVisibleMembers = () => {
    const visible = [];
    // Afficher 5 membres: 2 à gauche, 1 au centre, 2 à droite
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + team.length) % team.length;
      visible.push({
        ...team[index],
        position: i,
        key: `${index}-${i}` // Clé unique pour éviter les bugs d'animation
      });
    }
    return visible;
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % team.length);
  };

  const handlePrev = (): void => {
    setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  const visibleMembers = getVisibleMembers();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#98D8EF] p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-6xl font-bold text-center mb-16 tracking-tight">
          NOTRE ÉQUIPE
        </h1>
        
        <div className="relative h-96 flex items-center justify-center">
          {/* Team members carousel */}
          <div className="relative w-full h-full flex items-center justify-center">
            {visibleMembers.map((member) => {
              const pos = member.position;
              let scale: number, opacity: number, zIndex: number, translateX: number, translateY: number;
              
              if (pos === 0) {
                // Centre
                scale = 1.4;
                opacity = 1;
                zIndex = 30;
                translateX = 0;
                translateY = -20;
              } else if (pos === -1) {
                // Gauche proche
                scale = 0.8;
                opacity = 0.8;
                zIndex = 20;
                translateX = -280;
                translateY = 40;
              } else if (pos === 1) {
                // Droite proche
                scale = 0.8;
                opacity = 0.8;
                zIndex = 20;
                translateX = 280;
                translateY = 40;
              } else if (pos === -2) {
                // Gauche éloignée
                scale = 0.6;
                opacity = 0.5;
                zIndex = 10;
                translateX = -480;
                translateY = 60;
              } else {
                // Droite éloignée (pos === 2)
                scale = 0.6;
                opacity = 0.5;
                zIndex = 10;
                translateX = 480;
                translateY = 60;
              }

              return (
                <div
                  key={member.key}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex
                  }}
                >
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={member.img || "/image/photographe.png"}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="object-cover"
                      priority={pos === 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-8 z-40 w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Précédent"
          >
            <Image 
              src="/icons/chevron.svg" 
              alt="Précédent"
              width={24}
              height={24}
              className="w-6 h-6 transition-transform duration-300"
              style={{ transform: 'scaleX(-1)' }}
            />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-8 z-40 w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Suivant"
          >
            <Image 
              src="/icons/chevron.svg" 
              alt="Suivant"
              width={24}
              height={24}
              className="w-6 h-6 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Member info */}
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold mb-2 transition-all duration-500">
            {team[currentIndex].name}
          </h2>
          <p className="text-xl text-gray-700 transition-all duration-500">
            {team[currentIndex].role}
          </p>
        </div>

        {/* Navigation hint */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          Click or scroll
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;