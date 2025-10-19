import Header from '@/components/Header'
import MainButton from "@/components/buttons/main_button"
import Footer from "@/components/footer"
import TeamCarousel from "@/components/TeamCarousel"
import MainTitle from "@/components/MainTitle"
import Image from 'next/image'


export default function Home() {
  return (
    <div className="">
      <Header/>
      <main className="relative flex justify-center items-center h-screen overflow-hidden">
      <MainTitle
          text={"L'ASSOCIATION "}
          className="RedHat font-black text-[100px] text-black z-1 select-none"
          stagger={0.05}
          duration={3}
          fromY={24}
        />
      </main>
      <main className="flex flex-col justify-start items-start overflow-hidden py-[250px] px-[12vw]">
        <h3 className='pb-[50px]'>
            <span className='text-2xl font-extralight leading-none'>Nous croyons que</span><br />
            <span className='RedHat font-bold text-[50px] leading-none'>chaque rencontre <span className='text-[#98D8EF]'>compte</span></span><br />
            <span className='RedHat font-bold text-[50px] leading-none'>chaque rencontre <span className="text-[#98D8EF]">façonne l'avenir</span></span>
        </h3>
        <Image className='w-full' src="/image/Magnhetic_group.png" width={1920} height={1080} alt="Groupe Magn'Hetic" />

      </main>

    <div className='flex flex-col gap-[100px] px-[10vw]'>
      <div className="flex justify-around">

        <div className="flex flex-col items-start gap-[15px]">
          <h2 className="RedHat font-black text-[50px] uppercase">Qui sommes nous ?</h2>
          <p className='text-sm font-light leading-8 w-[33vw]'>Magn’Hetic est une association étudiante née au sein de l’école HETIC, créée par des étudiants passionnés et motivés. Nous partageons une conviction simple : les rencontres peuvent transformer un parcours et ouvrir des opportunités uniques.</p>
        </div>

        <div className="flex flex-col items-end gap-[15px] translate-y-1/2">
          <h2 className="RedHat text-right font-black text-[50px] uppercase">Notre mission</h2>
          <p className='text-sm text-right font-light leading-8 w-[29vw]'>Notre mission est de construire un pont entre le monde étudiant et celui de l’entreprise. En organisant des événements variés, nous favorisons l’échange, l’inspiration et la découverte, afin d’aider chaque étudiant à révéler son potentiel.</p>
        </div>

      </div>


      <div className="flex justify-around mb-50">
        <div className="flex flex-col gap-[15px] items-start">
          <h2 className="RedHat font-black text-[50px] uppercase">Nos Actions</h2>
          <p className='text-sm font-light leading-8 w-[33vw]'>Magn’Hetic organise tout au long de l’année des initiatives qui dynamisent la vie étudiante : Grands événements de networking pour connecter talents et professionnels. Animations sur le campus pour rassembler et créer du lien. Ateliers pratiques pour améliorer les profils professionnels en ligne et préparer l’avenir.</p>
          <MainButton variant="secondary" href="#" size="md">Voir nos événements</MainButton>
        </div>

        <div className="flex flex-col items-end gap-[15px] translate-y-1/3">
          <h2 className="RedHat text-right font-black text-[50px] uppercase">Notre impact</h2>
          <p className='text-sm text-right font-light leading-8 w-[33vw]'>Grâce à nos événements, des étudiants rencontrent des entreprises, développent leurs compétences et trouvent de nouvelles perspectives. Nous voulons inspirer, connecter et donner à chacun les moyens de transformer ses ambitions en opportunités concrètes.</p>
          <MainButton variant="primary" href="#" size="md">Nous contacter</MainButton>
        </div>
      </div>
    </div>

      <div className="w-full bg-[#98D8EF] flex justify-center items-start gap-[45px] mt-[px] pb-[50px]">
        <div className="w-full py-[80px]">
          <TeamCarousel />
        </div>
      </div>

      <Footer/>

    </div>
  );
}

