import { useEffect } from 'react';

export interface WorkHistoryItem {
  company: string;
  title: string;
  image?: string;
  period: string;
  startYear: number;
  endYear: number;
  description: string[];
}

const history: WorkHistoryItem[] = [
  {
    company: 'Peninsula School District',
    title: 'Data Integration Analyst',
    image: '/psd-logo.png',
    period: '2011 - 2018',
    startYear: 2011,
    endYear: 2018,
    description: [
      'Managed 5,000+ devices serving 50k requests daily',
      'Top 10 AWS education sector user in US',
      'Developed in-house solutions serving 100k+ monthly requests',
      'Engineered KGHP-FM radio station digital AutoDJ infrastructure',
    ],
  },
  {
    company: 'Boston Consulting Group',
    title: 'Sr. Software Engineer',
    image: '/bcg-logo.png',
    period: '2018 - 2021',
    startYear: 2018,
    endYear: 2021,
    description: [
      'Engineered automated Kubernetes/Cloud infrastructures',
      'Led DevOps practices for North America Digital Ventures',
      'Deployed ML products processing 500k data points/minute',
      'Orchestrated hundreds of production deployments',
    ],
  },
  {
    company: 'CharacterStrong',
    title: 'Sr. Platform Architect',
    image: '/cs-logo.png',
    period: '2021 - 2024',
    startYear: 2021,
    endYear: 2024,
    description: [
      'Scaled from 16k to 200k+ monthly user sessions',
      'Led growth from 1 to 18 engineers',
      'Implemented comprehensive Backend Serverless API',
      'Created data-driven curriculum CMS',
    ],
  },
  {
    company: 'Blue Origin',
    title: 'Lead Software Engineer',
    image: '/blue-logo.png',
    period: '2024 - Present',
    startYear: 2024,
    endYear: new Date().getFullYear(),
    description: [
      'Developing software for Engines Department',
      'Serving as Tech lead for 10+ engineers',
      'Deploying design-critical software systems',
      'Optimizing for performance and reliability',
    ],
  },
];
export function WorkHistory() {
  // Calculate year range
  const startYear = Math.min(...history.map((item) => item.startYear));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  const totalYears = years.length;

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.work-history-section') as HTMLElement;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate progress through the section (0 to 1)
      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - sectionTop) / (viewportHeight * 1.5))
      );

      // Update timeline position
      const currentYearIndex = Math.floor(progress * totalYears);
      section.style.setProperty(
        '--timeline-progress',
        `${(currentYearIndex / (totalYears - 1)) * 100}%`
      );

      // Update each history item's visibility
      history.reverse().forEach((_, index) => {
        const itemProgress = progress * 1.5 * history.length - index;
        const opacity = Math.max(0, Math.min(1, itemProgress));
        const translate = Math.max(0, 50 * (1 - itemProgress));

        section.style.setProperty(`--opacity-${index}`, opacity.toString());
        section.style.setProperty(`--translate-${index}`, `${translate}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalYears]);

  return (
    <section className="py-20 min-h-screen work-history-section">
      <div className="min-h-[min-content] md:container md:mx-auto md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center [text-shadow:_0_3px_5px_rgb(0_0_0_/_80%)]">
          Work History
        </h2>

        <div className="relative flex min-h-[min-content]">
          {/* Vertical Timeline */}
          <div
            className="relative w-12 md:w-24 md:w-32 md:mr-8 z-50"
            style={{ height: `${years.length * 6}rem` }}
          >
            <div className="absolute w-0.5 bg-white/30 top-0 bottom-0 left-4" />

            {/* Timeline years */}
            {years.map((year, i) => (
              <div
                key={year}
                className="absolute left-0 w-8 flex items-center text-xs md:text-sm"
                style={{ top: `${(i / (totalYears - 1)) * 100}%` }}
              >
                <div className="w-2 md:w-3 h-[1px] bg-white/30 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm font-medium text-white/70 ml-3 md:ml-5">
                  {year}
                </span>
              </div>
            ))}

            {/* Current year marker */}
            <div
              className="absolute w-4 h-4 bg-white rounded-full left-2.5 -ml-1.5 z-10 transition-all duration-300"
              style={{ top: `var(--timeline-progress, 0%)` }}
            />
          </div>

          {/* Content cards */}
          <div
            className="flex-1 relative"
            style={{
              minHeight: 'min-content',
              height: `${years.length * 6}rem`,
              marginBottom: '5rem',
            }}
          >
            {history.map((item, index) => (
              <div
                key={index}
                className="absolute w-full transition-all duration-500 min-h-[min-content]"
                style={{
                  top: `${((item.startYear - startYear) / (totalYears - 1)) * 100}%`,
                  height: `${((item.endYear - item.startYear) / (totalYears - 1)) * 100}%`,
                  minHeight: 'min-content',
                  opacity: `var(--opacity-${index}, 1)`,
                  display: 'flex',
                  alignItems: item.endYear - item.startYear < 3 ? 'flex-start' : 'center',
                }}
              >
                {/* Position indicator bar */}
                <div
                  className="absolute left-[-1rem] md:left-[-4rem] top-0 w-16 md:w-40 bg-black/30 rounded-r-[2rem]"
                  style={{
                    height: '100%',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                    borderRight: '2px solid white',
                    borderTop: '1px solid white',
                    borderBottom: '1px solid white',
                  }}
                />

                {/* Content card */}
                <div
                  className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 md:p-6 ml-4 w-full transition-all duration-500"
                  style={{
                    transform: `translateY(var(--translate-${index}, 0px))`,
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  {item.image && (
                    <div className="hidden md:block w-24 h-24 flex-shrink-0 rounded-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.company}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold mb-2 flex flex-col md:flex-row md:space-x-1 md:justify-between">
                      <span>{item.company}</span>{' '}
                      <span className="text-gray-400">{item.period}</span>
                    </h3>
                    <h4 className="text-xl mb-4 text-gray-300">{item.title}</h4>
                    <ul className="hidden md:block list-disc list-inside space-y-2">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
