import { Card } from './ui/Card';

export function Projects() {
  const projects = [
    {
      title: 'Cybertruck Simulator',
      description: 'An interactive web-based Cybertruck simulator',
      image: '/cybertruck-preview.png',
      url: 'https://cybertruck.ashmartian.com/',
    },
    {
      title: 'ComfyUI DirGir',
      description: 'A workflow management tool for ComfyUI',
      image: '/comfyui-preview.png',
      url: 'https://github.com/AshMartian/ComfyUI-DirGir',
    },
    {
      title: '𝕏 Schedule Helper',
      description: 'A tool to help schedule posts on X (formerly Twitter)',
      image: '/x-schedule-preview.png',
      url: 'https://github.com/AshMartian/x-schedule-helper',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center [text-shadow:_0_3px_5px_rgb(0_0_0_/_80%)]">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
