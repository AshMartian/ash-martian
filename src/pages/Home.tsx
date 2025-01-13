import { Header, Hero, Hobbies, Mars, Projects, WorkHistory } from '~/components';

export function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Mars />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Hobbies />
        <Projects />
        <WorkHistory />
      </div>
    </main>
  );
}
