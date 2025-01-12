import { Header, Hero, Mars, Projects } from '~/components';

export function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Mars />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Projects />
      </div>
    </main>
  );
}
