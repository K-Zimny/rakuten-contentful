'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
  isViewed?: boolean;
}

export const ArticleTile = ({ article, className, isViewed = false }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title, shortDescription } =
    useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link className="flex flex-col" href={`/${slug}`}>
      <div
        className={twMerge(
          'relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg hover-effect',
          className,
        )}>
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
        {featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover aspect-[16/10] w-full' }}
              {...featuredImage}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col px-4 py-3 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && (
            <>
              <p className="h3 mb-2 text-gray800 md:mb-3" {...inspectorProps({ fieldId: 'title' })}>
                {title}
              </p>
              {shortDescription && (
                <p
                  className="text-sm text-gray600 md:text-base"
                  {...inspectorProps({ fieldId: 'shortDescription' })}>
                  {shortDescription}
                </p>
              )}
            </>
          )}

          {/* <div className="mt-auto flex items-center">
            <ArticleAuthor article={article} />
            <div
              className={twMerge('ml-auto pl-2 text-xs text-gray600')}
              {...inspectorProps({ fieldId: 'publishedDate' })}
            >
              <FormatDate date={publishedDate} />
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
};
