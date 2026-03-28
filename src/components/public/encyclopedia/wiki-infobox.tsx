interface WikiInfoboxProps {
  infobox: Record<string, string>;
  displayName: string;
  avatarUrl: string | null;
  accentColor: string;
}

export function WikiInfobox({ infobox, displayName, avatarUrl, accentColor }: WikiInfoboxProps) {
  const entries = Object.entries(infobox);

  return (
    <div className="w-full md:w-64 md:float-right md:ml-6 mb-6 border border-white/15 bg-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="px-4 py-3 text-center font-semibold text-white"
        style={{ backgroundColor: `${accentColor}1a` }}
      >
        {displayName}
      </div>

      {/* Avatar */}
      {avatarUrl && (
        <div className="flex justify-center p-4 pb-2">
          <img
            src={avatarUrl}
            alt={displayName}
            width={160}
            height={160}
            className="rounded-lg w-40 h-40 object-cover"
          />
        </div>
      )}

      {/* Key-value rows */}
      <div className="divide-y divide-white/5">
        {entries.map(([label, value], i) => (
          <div
            key={label}
            className="px-4 py-2.5"
            style={{
              backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
            }}
          >
            <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-0.5">
              {label}
            </div>
            <div className="text-sm text-white/80">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
