import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandThingiverse,
  IconBrandX,
} from '@tabler/icons-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Ash Martian
        </a>
        <div className="flex space-x-4">
          <a href="https://x.com/1stMarsColonist" target="_blank" rel="noopener noreferrer">
            <IconBrandX className="w-6 h-6" />
          </a>
          <a href="https://github.com/AshMartian" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/ash-martian-5a7415130/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://www.thingiverse.com/ashmartian/designs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandThingiverse className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </header>
  );
}
