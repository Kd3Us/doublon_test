"use client";

import Header from '@/components/Header'
import Footer from "@/components/footer"
import EventCard from "@/components/Event_card"
import MainTitle from "@/components/MainTitle"


export default function Home() {
  return (
    <div className="">
      <Header/>
      <main className="relative flex justify-center items-center h-screen overflow-hidden">
      <MainTitle
          text={"NOS ÉVÉNEMENTS "}
          className="RedHat font-black text-[100px] text-black z-1 select-none"
          stagger={0.05}
          duration={3}
          fromY={24}
        />
      </main>

      <div className="flex justify-center items-start gap-[50px] mt-[140px] pb-[100px] flex-wrap px-4">
        {/* Exemple d'utilisation - card qui s'agrandit */}
        <EventCard
          image="/image/event.png"
          title="Photoshoot des premières années"
          description="Magn’Hetic organise un photoshoot dédié aux étudiants de première année, pour vous offrir des portraits de qualité à utiliser sur vos profils en ligne et candidatures. Une occasion idéale de soigner votre présence professionnelle et de valoriser votre futur."
          details={{
            time: "14:00 - 17:00",
            date: "15 Mars 2024",
            location: "Campus Central"
          }}
          onRegister={(formData) => {
            if (formData) {
              console.log("Données d'inscription:", formData);
              alert(`Inscription réussie pour ${formData.firstName} ${formData.lastName} (${formData.role === 'student' ? 'Étudiant' : 'Entreprise'})`);
            } else {
              console.log("Début du processus d'inscription");
            }
          }}
        />

        {/* Deuxième exemple */}
        <EventCard
          image="/image/event.png"
          title="Conférence Tech"
          description="Magn’Hetic organise un workshop dédié au networking, pensé pour aider les étudiants à développer leur aisance relationnelle, élargir leur réseau et saisir de nouvelles opportunités. Un moment privilégié pour échanger avec des des professionnels."
          details={{
            time: "09:00 - 12:00",
            date: "22 Mars 2024",
            location: "Auditorium Principal"
          }}
          onRegister={(formData) => {
            if (formData) {
              console.log("Données d'inscription:", formData);
              alert(`Inscription réussie pour ${formData.firstName} ${formData.lastName} (${formData.role === 'student' ? 'Étudiant' : 'Entreprise'})`);
            } else {
              console.log("Début du processus d'inscription");
            }
          }}
        />
      </div>

      <Footer/>

    </div>
  );
}
