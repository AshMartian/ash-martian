import {
  Card,
  CardProps,
} from './ui/Card';

const projects: CardProps[] = [
  {
    title: 'Cybertruck Simulator',
    description: 'Drive the cybertruck anywhere on Mars',
    image: '/images/cybertruck-preview.png',
    url: 'https://cybertruck.ashmartian.com/',
  },
  {
    title: 'Voice Feedback',
    description: 'Realtime machine learned feedback for voice training',
    image: '/images/voice-preview.png',
    url: 'https://voice.ashmartian.com/',
  },
  {
    title: 'ComfyUI DirGir',
    description: 'Utility nodes to get directories right in ComfyUI',
    image: '/images/comfyui-preview.png',
    url: 'https://github.com/AshMartian/ComfyUI-DirGir',
  },
  {
    title: '𝕏 Schedule Helper',
    description: 'A chrome plugin to help schedule posts on 𝕏',
    image: '/images/x-schedule-preview.png',
    url: 'https://github.com/AshMartian/x-schedule-helper',
  },
  {
    title: 'Happy LEAF',
    description: 'A visually appealing OBD2 reader for the Nissan LEAF',
    image: '/images/happy-leaf-preview.png',
    url: 'https://github.com/AshMartian/HappyLeaf',
  },
  {
    title: 'Node Red Sense',
    description: 'A node red plugin to query data from Sense energy monitors',
    image: '/images/sense-preview.png',
    url: 'https://github.com/AshMartian/node-red-unofficial-sense',
  },
];

export function Projects() {
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
