export function Hero() {
  return (
    <section
      className="flex items-center justify-center hero"
      style={{
        minHeight: 'calc(100vh - 10rem)',
      }}
    >
      <div className="text-center py-[20vh] md:py-0">
        <img
          src="/images/cyber.jpg"
          alt="Ash Martian"
          className="w-[60%] md:w-[20%] h-auto mx-auto rounded-full mb-8 shadow-2xl border-4 border-white"
        />
        <h1 className="text-5xl font-bold mb-4">Ash Martian</h1>
        <h2 className="text-2xl mb-8">Tech Enthusiast & Blue Origin Engineer</h2>
        <p className="max-w-2xl mx-auto font-medium">
          Passionate about space travel and pushing the boundaries of what's possible. Currently
          working on cutting-edge projects at Blue Origin to make space more accessible for{' '}
          <span
            className="font-normal text-3xl inline-block"
            style={{
              background:
                'linear-gradient(to right, #ff0000, #ff8000, #aeae00, #008400, #0000ff, #4b0082)',
              textShadow: 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter:
                'drop-shadow(1px 1px 1px rgba(255, 255, 255, 40%)) drop-shadow(-1px 1px 1px rgba(255, 255, 255, 40%)) drop-shadow(1px -1px 1px rgba(255, 255, 255, 40%)) drop-shadow(-1px -1px 1px rgba(255, 255, 255, 40%))',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            everyone.
          </span>
        </p>
      </div>
    </section>
  );
}
