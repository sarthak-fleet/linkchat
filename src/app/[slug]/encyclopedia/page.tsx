import { notFound } from 'next/navigation';
import { getPageBySlug, getGeneratedPage } from '../_lib/get-page-data';
import { resolveThemeConfig } from '@/lib/themes';
import type { EncyclopediaContent } from '@/lib/generated-page-types';
import { WikiArticle } from '@/components/public/encyclopedia/wiki-article';
import { GenerateEncyclopedia } from '@/components/public/encyclopedia/generate-encyclopedia';

export default async function EncyclopediaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);
  if (!page) notFound();
  if (!page.encyclopediaEnabled) notFound();

  const theme = resolveThemeConfig(page.themeConfig as any);
  const generatedPage = await getGeneratedPage(page.id, 'encyclopedia');

  if (generatedPage?.status === 'ready' && generatedPage.content) {
    return (
      <WikiArticle
        content={generatedPage.content as unknown as EncyclopediaContent}
        displayName={page.displayName}
        avatarUrl={page.avatarUrl ?? null}
        accentColor={theme.accentColor}
      />
    );
  }

  return (
    <GenerateEncyclopedia
      pageId={page.id}
      slug={slug}
      accentColor={theme.accentColor}
    />
  );
}
