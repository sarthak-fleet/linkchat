function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function ProjectCard({
  id,
  title,
  url,
  imageUrl,
  description,
  accentColor,
}: {
  id?: string;
  title: string;
  url: string;
  imageUrl?: string | null;
  description: string;
  accentColor?: string;
}) {
  const hostname = getHostname(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-track-type="project"
      data-track-id={id ?? url}
      data-track-label={title}
      className="group flex h-full flex-col rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/12 hover:shadow-2xl hover:shadow-cyan-950/30"
      style={accentColor ? { borderColor: `${accentColor}33` } : undefined}
    >
      {imageUrl && (
        <div
          className="mb-5 h-44 w-full rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: accentColor ?? '#a5f3fc' }}
          >
            {hostname}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
        </div>

        <span
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 transition"
          style={accentColor ? { borderColor: `${accentColor}33` } : undefined}
        >
          Visit
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/70">{description}</p>
    </a>
  );
}
