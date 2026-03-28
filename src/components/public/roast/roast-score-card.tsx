'use client';

interface RoastScoreCardProps {
  vibeScore: number;
  accentColor: string;
}

function getVerdict(score: number): string {
  if (score <= 20) return 'Yikes';
  if (score <= 40) return 'Needs work';
  if (score <= 60) return 'Mid';
  if (score <= 80) return 'Solid';
  return 'Elite';
}

export function RoastScoreCard({ vibeScore, accentColor }: RoastScoreCardProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (vibeScore / 100) * circumference;

  return (
    <div className="flex justify-center">
      <div className="border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl p-6 flex flex-col items-center gap-3 w-full max-w-xs">
        <div className="relative w-[120px] h-[120px]">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="-rotate-90"
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={accentColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-3xl font-bold"
              style={{ color: accentColor }}
            >
              {vibeScore}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400 uppercase tracking-widest">
          Vibe Score
        </p>
        <p
          className="text-lg font-semibold"
          style={{ color: accentColor }}
        >
          {getVerdict(vibeScore)}
        </p>
      </div>
    </div>
  );
}
