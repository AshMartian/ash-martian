export interface CardProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  icon?: React.ReactNode;
}

export function Card({ title, description, image, url, icon }: CardProps) {
  const content = (
    <>
      {image && (
        <div className="w-full h-52 mb-4 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        {!!icon && <span>{icon}</span>}
        {title}
      </h3>
      <p>{description}</p>
    </>
  );

  const cardClasses =
    'bg-gray-800 rounded-lg p-6 bg-opacity-50 backdrop-blur-lg transition-all duration-300 ' +
    'hover:bg-opacity-70 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] ' +
    'hover:transform hover:scale-[1.02]';

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cardClasses}>
        {content}
      </a>
    );
  }

  return <div className={`${cardClasses} cursor-default`}>{content}</div>;
}
