'use client';

interface RoastSectionProps {
  emoji: string;
  title: string;
  content: string | string[];
  accentColor: string;
}

export function RoastSection({ emoji, title, content, accentColor }: RoastSectionProps) {
  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{emoji}</span>
        <h3
          className="text-base font-semibold"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
      </div>
      {Array.isArray(content) ? (
        <ul className="space-y-1.5">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span
                className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
      )}
    </div>
  );
}
