import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandThingiverse,
  IconBrandX,
  IconPalette,
} from '@tabler/icons-react';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

const links: SocialLink[] = [
  {
    name: 'X',
    icon: <IconBrandX className="w-12 h-12" />,
    url: 'https://x.com/1stMarsColonist',
    color: 'hover:text-blue-400',
  },
  {
    name: 'GitHub',
    icon: <IconBrandGithub className="w-12 h-12" />,
    url: 'https://github.com/AshMartian',
    color: 'hover:text-purple-400',
  },
  {
    name: 'LinkedIn',
    icon: <IconBrandLinkedin className="w-12 h-12" />,
    url: 'https://www.linkedin.com/in/ash-martian-5a7415130/',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Thingiverse',
    icon: <IconBrandThingiverse className="w-12 h-12" />,
    url: 'https://www.thingiverse.com/ashmartian/designs',
    color: 'hover:text-cyan-400',
  },
  {
    name: 'Instagram',
    icon: <IconBrandInstagram className="w-12 h-12" />,
    url: 'https://www.instagram.com/ashmartian420/',
    color: 'hover:text-pink-500',
  },
  {
    name: 'Civitai',
    icon: <IconPalette className="w-12 h-12" />,
    url: 'https://civitai.com/user/AshMartian',
    color: 'hover:text-green-400',
  },
];

export function SocialLinks() {
  return (
    <section className="py-20 min-h-[50vh] flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center [text-shadow:_0_3px_5px_rgb(0_0_0_/_80%)]">
          Connect With Me
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-lg 
                rounded-lg transition-all duration-300 hover:bg-gray-700/50 
                hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${link.color}`}
            >
              {link.icon}
              <span className="mt-2 text-sm">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
