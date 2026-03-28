import { notFound } from 'next/navigation';
import { getPageBySlug, getPageLinks, getPageProjects, getPageSections } from './_lib/get-page-data';
import { LinkCard } from '@/components/public/link-card';
import { ProjectCard } from '@/components/public/project-card';
import { PageSectionRenderer } from '@/components/public/page-section-renderer';
import { TrackableSection } from '@/components/public/trackable-section';
import { resolveThemeConfig } from '@/lib/themes';

type Props = { params: Promise<{ slug: string }> };

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const [pageLinks, pageProjects, publicSections] = await Promise.all([
    getPageLinks(page.id),
    getPageProjects(page.id),
    getPageSections(page.id),
  ]);
  const theme = resolveThemeConfig(page.themeConfig);

  return (
    <>
      {/* Links */}
      {pageLinks.length > 0 && (
        <section className="mt-8 w-full">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.32em]"
                style={{ color: theme.accentColor }}
              >
                Links
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Find Me Online
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {pageLinks.map((link) => (
              <LinkCard
                key={link.id}
                id={link.id}
                title={link.title}
                url={link.url}
                icon={link.icon}
                accentColor={theme.accentColor}
              />
            ))}
          </div>
        </section>
      )}

      {pageProjects.length > 0 && (
        <section className="mt-10 w-full">
          <div className="mb-5">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: theme.accentColor }}
            >
              Projects
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Things I&apos;ve Built
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {pageProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                url={project.url}
                imageUrl={project.imageUrl}
                description={project.description}
                accentColor={theme.accentColor}
              />
            ))}
          </div>
        </section>
      )}

      {publicSections.length > 0 && (
        <section className="mt-10 w-full">
          <div className="mb-5">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: theme.accentColor }}
            >
              Sections
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              More to Explore
            </h2>
          </div>

          <div className="space-y-4">
            {publicSections.map((section) => (
              <TrackableSection
                key={section.id}
                slug={slug}
                sectionId={section.id}
                sectionType={section.type}
                sectionTitle={section.title}
              >
                <PageSectionRenderer
                  slug={slug}
                  section={section}
                  accentColor={theme.accentColor}
                />
              </TrackableSection>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
