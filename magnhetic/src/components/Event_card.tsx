"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Types pour les props du composant
interface EventDetails {
  time: string;
  date: string;
  location: string;
}

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  details: EventDetails;
  onRegister?: (formData?: RegistrationFormData) => void;
}

interface RegistrationFormData {
  role: 'student' | 'company';
  lastName: string;
  firstName: string;
  email: string;
}

// Icônes SVG simples
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TicketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" stroke="currentColor" strokeWidth="2"/>
    <path d="M13 5v2M13 11v2M13 17v2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  description,
  details,
  onRegister
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    role: 'student',
    lastName: '',
    firstName: '',
    email: ''
  });

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (!isExpanded) {
      // Première étape : agrandir la card pour montrer le formulaire
      setIsExpanded(true);
    } else {
      // Deuxième étape : confirmer l'inscription
      if (onRegister) {
        onRegister(formData);
      }
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div className={`w-full max-w-[450px] bg-white rounded-[20px] shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
      isExpanded ? 'transform scale-105 shadow-2xl' : ''
    }`}>
      {/* Image de l'événement */}
      <div className="relative bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={275}
          sizes="(max-width: 768px) 100vw, 450px"
          className="w-full h-[275px] object-cover"
        />
      </div>

      {/* Contenu de la card */}
      <div className="p-6">
        {/* Titre */}
        <h3 className="text-xl font-bold text-black mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-xs">
          {description}
        </p>

        {/* Détails de l'événement */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <img src="./icons/schedule.svg"/>
            <span className="text-black text-xs font-light">{details.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="./icons/event.svg"/>
          <span className="text-black text-xs font-light">{details.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="./icons/distance.svg"/>
          <span className="text-black text-xs font-light">{details.location}</span>
          </div>
        </div>

        {/* Formulaire d'inscription - affiché seulement quand la card est agrandie */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mb-6">
            <label className="block text-black mb-3">
              Je m'inscris en temps que :
            </label>
            
            {/* Sélection du rôle */}
            <div className="flex space-x-3 mb-4">
              <button
                type="button"
                onClick={() => handleInputChange('role', 'student')}
                className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                  formData.role === 'student'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-500 bg-white'
                }`}
              >
                Étudiant
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('role', 'company')}
                className={`w-full text px-4 py-2 rounded-xl border-2 transition-colors ${
                  formData.role === 'company'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-500 bg-white'
                }`}
              >
                Entreprise
              </button>
            </div>

            {/* Champs de saisie */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full border-b-1 rounded-[2px] text-sm border-black focus:border-blue-500 outline-none py-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full border-b-1 rounded-[2px] text-sm border-black focus:border-blue-500 outline-none py-2"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Mail"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border-b-1 rounded-[2px] text-sm border-black focus:border-blue-500 outline-none py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        {!isExpanded ? (
          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-linear-to-br from-[#98D8EF] via-[#98D8EF] to-[#D6F0EA] rounded-xl text-[#41585F] text-base font-medium flex items-center justify-center space-x-2 transition-all duration-500 hover:scale-105"
          >
            <TicketIcon />
            <span className="transition-all duration-300">M'inscrire</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleRegister}
              className="flex-1 py-2 px-4 bg-linear-to-br from-[#98D8EF] via-[#98D8EF] to-[#D6F0EA] rounded-xl text-[#41585F] text-base font-medium flex items-center justify-center space-x-2 transition-all duration-500 hover:scale-105"
            >
              <TicketIcon />
              <span className="transition-all duration-300">Réserver ma place</span>
            </button>
            
            {/* Bouton de réduction */}
            <button
              onClick={handleCollapse}
              className="py-2 px-3 border-2 border-gray-300 rounded-xl text-gray-600 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:border-gray-400 hover:bg-gray-50"
              aria-label="Réduire la card"
            >
              <ChevronUpIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
