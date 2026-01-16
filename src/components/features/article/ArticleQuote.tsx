'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { ComponentQuote } from '@src/lib/__generated/sdk';

interface ArticleQuoteProps {
  quote: ComponentQuote;
}

export const ArticleQuote = ({ quote }: ArticleQuoteProps) => {
  const updatedQuote = useContentfulLiveUpdates(quote);
  const inspectorProps = useContentfulInspectorMode({ entryId: quote.sys.id });

  return (
    <blockquote className="my-8 border-l-4 border-blue-500 pl-4 italic" {...inspectorProps({ fieldId: 'text' })}>
      <p className="text-lg text-center">{updatedQuote.text}</p>
      {updatedQuote.author && (
        <footer className="mt-2 text-sm text-gray-600" {...inspectorProps({ fieldId: 'author' })}>
          — {updatedQuote.author}
        </footer>
      )}
    </blockquote>
  );
};