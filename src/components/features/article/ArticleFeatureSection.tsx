'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { ComponentFeatureSection } from '@src/lib/__generated/sdk';

interface ArticleFeatureSectionProps {
  featureSection: ComponentFeatureSection;
}

export const ArticleFeatureSection = ({ featureSection }: ArticleFeatureSectionProps) => {
  const updatedSection = useContentfulLiveUpdates(featureSection);
  const inspectorProps = useContentfulInspectorMode({ entryId: featureSection.sys.id });

  const variation = updatedSection.variation || 'left-right';

  // Centered variations
  if (variation === 'centered') {
    return (
      <div data-aos="fade-up" className='flex flex-col items-center text-center py-14 my-14 md:py-20 md:my-20' {...inspectorProps({ fieldId: 'title' })}>
        <div className='pb-8 border-b border-b-gray300'>
          <h2 className='mt-0 mb-6 text-gray700'>{updatedSection.title}</h2>
          {updatedSection.summary && (
            <p className='mb-4 text-lg' {...inspectorProps({ fieldId: 'summary' })}>
              {updatedSection.summary}
            </p>
          )}
        </div>
        {updatedSection.listItems && updatedSection.listItems.length > 0 && (
          <ul className="p-0 list-none text-center " {...inspectorProps({ fieldId: 'listItems' })}>
            {updatedSection.listItems.map((item, index) => (
              item && (
                <li key={index} className='mb-4 text-gray500'>
                  {item}
                </li>
              )
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Left-right variation (title left, list right)
  if (variation === 'left-right') {
    return (
      <div data-aos="fade-left" className='flex flex-col md:flex-row justify-between gap-2 py-14 my-14 md:py-20 md:my-20' {...inspectorProps({ fieldId: 'title' })}>
        < div className='pr-10 md:pr-40 pb-10 md:pb-40 rounded-br-md border-r border-r-gray300 border-b border-b-gray300' >
          <h2 className='mt-0 mb-4 text-gray700'>{updatedSection.title}</h2>
          {
            updatedSection.summary && (
              <p className='mb-10 text-lg' {...inspectorProps({ fieldId: 'summary' })}>
                {updatedSection.summary}
              </p>
            )
          }
        </div >
        {
          updatedSection.listItems && updatedSection.listItems.length > 0 && (
            <ul className="mt-0 list-disc pl-6" {...inspectorProps({ fieldId: 'listItems' })}>
              {updatedSection.listItems.map((item, index) => (
                item && (
                  <li key={index} className='mt-0 mb-4 text-gray500'>
                    {item}
                  </li>
                )
              ))}
            </ul>
          )
        }
      </div >
    );
  }

  // Right-left variation (list left, title right)
  if (variation === 'right-left') {
    return (
      <div data-aos="fade-right" className='flex flex-col-reverse md:flex-row justify-between gap-2 py-14 my-14 md:py-20 md:my-20' {...inspectorProps({ fieldId: 'title' })}>
        {updatedSection.listItems && updatedSection.listItems.length > 0 && (
          <ul className="mt-0 list-disc pl-6" {...inspectorProps({ fieldId: 'listItems' })}>
            {updatedSection.listItems.map((item, index) => (
              item && (
                <li key={index} className='mb-4 text-gray500'>
                  {item}
                </li>
              )
            ))}
          </ul>
        )}
        <div className='pl-10 md:pl-40 pb-10 md:pb-40 text-right rounded-bl-md border-l border-l-gray300 border-b border-b-gray300'>
          <h2 className='mt-0 mb-4 text-gray700'>{updatedSection.title}</h2>
          {updatedSection.summary && (
            <p className='mb-10 text-lg' {...inspectorProps({ fieldId: 'summary' })}>
              {updatedSection.summary}
            </p>
          )}
        </div>
      </div >
    );
  }

  return null;
};
