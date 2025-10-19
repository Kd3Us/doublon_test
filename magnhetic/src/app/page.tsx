import Header from '@/components/Header'
import CircularText from "@/components/CircularText"
import MainTitle from "@/components/MainTitle"
import MainButton from "@/components/buttons/main_button"
import Footer from "@/components/footer"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      <Header/>
      <main className="relative flex justify-center items-center h-[100vh] md:h-screen overflow-hidden px-4 sm:px-6">
        <MainTitle
          text={"MAGN'HETIC"}
          className="RedHat font-black text-[48px] sm:text-[64px] md:text-[90px] lg:text-[110px] xl:text-[125px] text-black z-1 select-none text-center"
          stagger={0.05}
          duration={3}
          fromY={24}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block">
          <CircularText
            text={"· Inspiration · Avenir · Communauté · Rencontres · Opportunité · Connexion · Talents & entreprises . "}
            radius={220}
            fontSize={12}
            animate={true}
            animationDelay={1}
            animationDuration={500}
            startAnimation={true}
            rotate={true}
            rotationSpeed={200}
          />
        </div>
      </main>

      <div className="px-10 sm:px-6 md:px-20 lg:px-50 xl:px-20">
        {/* Section: Qui sommes nous */}
        <div className="flex flex-col xl:flex-row xl:justify-center xl:items-end gap-8 xl:gap-[100px] mt-[80px] px-5 xl:mt-[140px] pb-[60px] xl:pb-[100px]">

          <div className="flex flex-col items-center md:items-start gap-6 md:gap-[50px] xl-p-0">
            <h2 className="RedHat font-black uppercase text-[6.5vw] md:text-[7vw] lg:text-[5vw] xl:text-[4vw] text-center md:text-left">Qui sommes nous ?</h2>
            <Image className="w-full xl-full" src="/image/cherif_and_denis.png" width={800} height={600} alt="cherif_and_denis"/>
          </div>

          <div className="xl:max-w-[420px]">
              <p className="text-[10px] sm:text-xs xl:text-[0.8vw] xl:text-[0.73vw] leading-7 sm:leading-9 xl:leading-10 font-light text-justify lg:text-left"><span className="font-medium">Magn’Hetic</span> est une <span className="font-medium">association étudiante</span> fondée au sein de l’école <span className="font-medium">HETIC</span>. Notre <span className="font-medium">objectif</span> est simple : <span className="font-medium">créer des passerelles</span> entre le monde <span className="font-medium">étudiant</span> et celui de <span className="font-medium">l’entreprise</span> à travers des <span className="font-medium">événements</span> conviviaux et inspirants. Nous croyons que chaque rencontre peut devenir une <span className="font-medium">opportunité</span>, et nous mettons toute notre énergie à imaginer des formats qui favorisent <span className="font-medium">l’échange, la découverte et la collaboration.</span></p>
              <div className="flex sm:flex-row gap-3 sm:gap-[25px] mt-6 sm:items-center">
                <MainButton variant="primary" href="/about" size="sm" className="xl:h-11 xl:px-7 xl:text-base">Voir plus</MainButton>
                <MainButton variant="secondary" href="#" size="sm" className="xl:h-11 xl:px-7 xl:text-base">Nous rejoindre</MainButton>
              </div>
          </div>
        </div>

        {/* Section: Nos événements */}
        <div className="flex flex-col-reverse xl:flex-row xl:justify-center xl:items-end gap-8 xl:gap-[100px] mt-[80px] px-5 xl:mt-[140px] pb-[60px] xl:pb-[100px]">
          <div className="xl:max-w-[420px]">
              <p className="text-[10px] sm:text-xs xl:text-[0.8vw] xl:text-[0.73vw] leading-7 sm:leading-9 xl:leading-10  font-light text-justify xl:text-left"><span className="font-medium">Magn’Hetic</span> organise tout au long de l’année des <span className="font-medium">événements</span> variés pour <span className="font-medium">dynamiser la vie étudiante</span> et favoriser les échanges. Grands rendez-vous de <span className="font-medium">networking</span>, animations sur le campus ou encore ateliers dédiés à <span className="font-medium">l’amélioration</span> profils professionnels en ligne <span className="font-medium">étudiant</span> , chaque initiative a pour but de rapprocher les étudiants des entreprises et de leur offrir des <span className="font-medium">opportunités concrètes</span> pour préparer leur avenir.</p>
              <div className="flex gap-3 sm:gap-[25px] mt-6">
                <MainButton variant="primary" href="#" size="sm" className="xl:h-11 xl:px-7 xl:text-base">Voir plus</MainButton>
              </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6 md:gap-[50px] order-1 lg:order-2">
            <h2 className="RedHat font-black uppercase text-[7vw] md:text-[7vw] lg:text-[4.5vw] text-center md:text-left">Nos événements</h2>
            <Image className="w-full max-w-[800px] h-auto" src="/image/event.png" width={800} height={600} alt="event"/>
          </div>
        </div>

        {/* Section: Partenaires */}
        <div className="flex flex-col-reverse xl:flex-row xl:justify-center xl:items-end gap-8 xl:gap-[125px] mt-[80px] px-5 xl:mt-[140px] pb-[60px] xl:pb-[100px]">
          <div className="flex flex-col gap-5 md:gap-7 pt-0 md:pt-3 order-2 md:order-1 xl:max-w-[625px]">
              <h2 className="RedHat font-black uppercase text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] md:w-[720px]">Magn’hetic cherche toujours de nouveaux partenaires</h2>
              <p className="text-[10px] sm:text-xs xl:text-[0.8vw] xl:text-[0.73vw] leading-7 sm:leading-9 xl:leading-10 font-light text-justify xl:text-left"> Chez Magn’hetic, nous croyons que les plus belles réussites naissent de la rencontre entre <span className="font-medium">ambition et créativité.</span> Toujours à la recherche de <span className="font-medium">nouveaux partenaires</span>, nous collaborons avec des entreprises désireuses de gagner en visibilité et de s’entourer de jeunes talents. Nos profils passionnés apportent <span className="font-medium">fraîcheur, énergie et innovation</span> pour <span className="font-medium">renforcer vos équipes</span> et <span className="font-medium">insuffler une nouvelle dynamique à vos projets</span>. Ensemble, explorons des idées, construisons des synergies et donnons vie à des initiatives qui feront rayonner votre entreprise tout en valorisant <span className="font-medium">l’audace</span> et la <span className="font-medium">créativité</span> de la <span className="font-medium">nouvelle génération.</span></p>
              <div className="flex gap-3 sm:gap-[25px] mt-6">
                <MainButton variant="primary" href="#" size="sm" className="xl:h-11 xl:px-7 xl:text-base">Nous Contacter</MainButton>
              </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6 md:gap-[50px] order-1 md:order-2">
            <Image className="w-[0px] xl:w-[30vw] max-w-[500px]" src="/image/photographe.png" width={500} height={500} alt="photographe" />
          </div>
        </div>
      </div>

      <Footer/>

    </div>
  );
}