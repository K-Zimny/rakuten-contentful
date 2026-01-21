'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { ArticleLabel } from '@src/components/features/article/ArticleLabel';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import pageViewed from "@src/utils/pageViewed"

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
  locale?: string;
  disableViewTracking?: boolean; // When true, don't mark as viewed (e.g., on homepage)
}

export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
  disableViewTracking = false,
}: ArticleHeroProps) => {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription, publishedDate } = useContentfulLiveUpdates(article);
  const [isViewed, setIsViewed] = useState(false);

  useEffect(() => {
    if (!title) return;
    
    // CRITICAL: Check if already viewed FIRST, before doing anything else
    // This must happen synchronously before marking as viewed
    const viewed = pageViewed("get", "article");
    const wasViewed = Array.isArray(viewed) && viewed.includes(title);
    
    // Set state IMMEDIATELY based on the check result
    // First visit: wasViewed = false, so isViewed = false (no checkmark)
    // Second visit: wasViewed = true, so isViewed = true (shows checkmark)
    setIsViewed(wasViewed);
    
    // Only AFTER setting state, mark as viewed for future visits
    // This happens after React has the state value, so it won't affect current render
    if (!disableViewTracking) {
      // Use a microtask to ensure state update is processed first
      Promise.resolve().then(() => {
        pageViewed("set", "article", title);
      });
    }
  }, [title, disableViewTracking]);

  return (
    <div
      data-component="ArticleHero"
      className={twMerge(
        `relative mx-auto flex flex-col overflow-hidden rounded-2xl border border-gray300 shadow-md hover-effect`,
        isReversedLayout ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      {isViewed && (
        <div
          className="absolute bottom-2 right-2 z-10 rounded-full p-1.5 shadow-md"
          style={{ backgroundColor: 'green' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            className="h-4 w-4 text-white"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      <div className="flex-1 basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{ className: 'w-full', priority: true, sizes: undefined }}
            {...article.featuredImage}
          />
        )}
      </div>

      <div className="relative flex flex-1 basis-1/2 flex-col justify-center px-4 py-6 lg:px-16 lg:py-12 xl:px-24">
        <div className="mb-2 flex flex-wrap items-center">
          <ArticleAuthor article={article} />
          {/* {isFeatured && (
            <ArticleLabel
              className={twMerge(
                'ml-auto pl-2 lg:absolute lg:top-8 xl:top-12',
                isReversedLayout ? 'lg:left-6 xl:left-12' : 'lg:right-6 xl:right-12',
              )}>
              {t('article.featured')}
            </ArticleLabel>
          )} */}
          {/* <div
            className={twMerge(
              'ml-auto hidden pl-2 text-xs text-gray600',
              isReversedLayout ? 'lg:block' : '',
            )}
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            <FormatDate date={publishedDate} />
          </div> */}
        </div>
        <h1 {...inspectorProps({ fieldId: 'title' })}>{title}</h1>
        {shortDescription && (
          <p className="mt-2" {...inspectorProps({ fieldId: 'shortDescription' })}>
            {shortDescription}
          </p>
        )}
        {/* <div
          className={twMerge('mt-2 text-xs text-gray600', isReversedLayout ? 'lg:hidden' : '')}
          {...inspectorProps({ fieldId: 'publishedDate' })}
        >
          <FormatDate date={publishedDate} />
        </div> */}
      </div>
    </div>
  );
};
