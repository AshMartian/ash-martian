import {
  IconBrandGithub,
  IconBrandThingiverse,
  IconCircuitDiode,
  IconHeartHandshake,
  IconPlant,
  IconRobot,
} from '@tabler/icons-react';

import {
  Card,
  CardProps,
} from './ui/Card';

const hobbies: CardProps[] = [
  {
    title: 'AI',
    description:
      'Exploring machine learning and AI applications, from LLMs to image based Stable diffusion, to training my own models.',
    image: '/images/ai.png',
    url: 'https://civitai.com/user/AshMartian',
    icon: <IconRobot />,
  },
  {
    title: '3D Printing',
    description:
      'Creating functional prints since 2012, specializing in space-related models and practical engineering solutions.',
    image: '/images/3d-printing.png',
    url: 'https://www.thingiverse.com/ashmartian/designs',
    icon: <IconBrandThingiverse />,
  },
  {
    title: 'Coding',
    description: 'Always tinkering with new technologies and contributing to open source projects.',
    image: '/images/coding.png',
    url: 'https://github.com/AshMartian',
    icon: <IconBrandGithub />,
  },
  {
    title: 'Botany',
    description:
      'Growing plants and experimenting with hydroponics systems, with a focus on sustainable food production for future Mars colonies.',
    image: '/images/botany.jpg',
    icon: <IconPlant />,
  },
  {
    title: 'Electronic Hardware',
    description:
      'Arduino + Raspberry Pi projects keep me up at night with the goal of developing Ai powered robotics.',
    image: '/images/batteries.jpg',
    icon: <IconCircuitDiode />,
  },
  {
    title: 'Raving',
    description: 'Enjoying electronic dance music and attending local music festivals.',
    image: '/images/raving.jpg',
    icon: <IconHeartHandshake />,
  },
];

export function Hobbies() {
  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center [text-shadow:_0_3px_5px_rgb(0_0_0_/_80%)]">
          Hobbies & Interests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <Card key={index} {...hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
