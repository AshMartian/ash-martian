import { Header, Hero, Mars, Projects } from '~/components';
import { useScrollPosition } from '~/hooks/useScrollPosition';

export function Home() {
  const scrollPosition = useScrollPosition();

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Mars scrollPosition={scrollPosition} />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Projects />
      </div>
    </main>
  );
}
