export function SpaceEssay() {
  return (
    <section className="py-20 min-h-[90vh] relative flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-12 text-center [text-shadow:_0_3px_5px_rgb(0_0_0_/_80%)]">
        My Vision for Human Spaceflight
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <img src="/images/new-shepard.jpg" alt="Mars" className="w-full rounded-lg" />
          <p className="text-lg leading-relaxed">
            For as long as I can remember, I have been captivated by the universe and the mechanics
            behind how things work. This fascination began at age six, taking apart toys to
            understand their inner workings, laying the foundation for my lifelong passion in
            engineering and innovation.
          </p>
          <p className="text-lg leading-relaxed">
            The game "Spore" marked a turning point in my understanding of life's purpose. At 14,
            the Space Stage deeply resonated with me - the concept of terraforming planets and
            spreading consciousness throughout the cosmos became my guiding principle.
          </p>
          <p className="text-lg leading-relaxed">
            SpaceX's successful Falcon 9 landing in 2015 reignited hope for affordable space
            exploration. This achievement, alongside Blue Origin's efforts, made it clear that
            humanity will colonize the solar system and beyond.
          </p>
          <div className="my-8 border-l-4 border-blue-500 pl-6">
            <p className="text-xl italic">
              "Space flight represents the ultimate frontier for scientific progress, offering
              unparalleled opportunities for new discoveries."
            </p>
          </div>
          <p className="text-lg leading-relaxed">
            My commitment to contributing to humanity's return to the Moon and beyond has only grown
            stronger. My identity, symbolized by changing my name to Martian, reflects my dedication
            to ensuring trillions more humans can thrive in space.
          </p>
          <p className="text-lg leading-relaxed">
            The ethical imperative to spread life beyond Earth is clear; possessing the capability
            to do so and choosing not to would be a disservice to our evolutionary potential and a
            neglect of our responsibility as stewards of life.
          </p>
        </div>
      </div>
    </section>
  );
}
