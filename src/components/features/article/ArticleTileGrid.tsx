'use client';

import { HTMLProps, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import pageViewed from '@src/utils/pageViewed';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  const [viewedArticles, setViewedArticles] = useState<string[]>([]);

  useEffect(() => {
    const viewed = pageViewed("get", "article");
    if (Array.isArray(viewed)) {
      setViewedArticles(viewed);
    }
  }, []);

  return articles && articles.length > 0 ? (
    <div
      data-component="ArticleTileGrid"
      className={twMerge(
        'grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12',
        className,
      )}
      {...props}>
      {articles.map((article, index) => {
        if (!article) return null;
        const isViewed = article.title ? viewedArticles.includes(article.title) : false;
        return <ArticleTile key={index} article={article} isViewed={isViewed} />;
      })}
    </div>
  ) : null;
};
