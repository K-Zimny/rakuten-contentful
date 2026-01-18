'use client'

import { useState } from 'react';
import {
    useContentfulInspectorMode,
    useContentfulLiveUpdates
} from '@contentful/live-preview/react';

import { CtfRichText } from '@src/components/features/contentful';
import { ProjectCaseStudy } from '@src/lib/__generated/sdk';
import { CtfImage } from '@src/components/features/contentful';

interface ArticleProjectProps {
    project: ProjectCaseStudy;
}

export const ArticleProject = ({ project }: ArticleProjectProps) => {
    const updatedProject = useContentfulLiveUpdates(project);
    const inspectorProps = useContentfulInspectorMode({ entryId: project.sys.id });
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <div className="my-8 rounded-2xl border border-gray300 shadow-md bg-gray-50 p-6">
            <p className="m-0">Case Study</p>
            {updatedProject.title && (
                <h2 className="mt-4 text-2xl font-bold" {...inspectorProps({ fieldId: 'title' })}>
                    {updatedProject.title}
                </h2>
            )}

            {updatedProject.image && (
                <CtfImage
                    nextImageProps={{ className: 'mb-2', priority: false, sizes: undefined }}
                    {...updatedProject.image}
                />
            )}

            <div className="mb-4 space-y-2">
                {/* {updatedProject.client && (
                    <div className="text-gray-700" {...inspectorProps({ fieldId: 'client' })}>
                        <span className="font-semibold">Client: </span>
                        {updatedProject.client}
                    </div>
                )} */}

                <div className='flex justify-evenly'>
                    {updatedProject.url && (
                        <div {...inspectorProps({ fieldId: 'url' })} className='overflow-hidden'>
                            <a
                                href={updatedProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-md font-light text-blue-600 hover:text-blue-800 underline"
                            >
                                Link to Project
                            </a>
                        </div>
                    )}

                    {updatedProject.repo && (
                        <div {...inspectorProps({ fieldId: 'repo' })}>
                            <a
                                href={updatedProject.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-md font-light text-blue-600 hover:text-blue-800 underline"
                            >
                                View on GitHub
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {(updatedProject.technologiesUsed && updatedProject.technologiesUsed.length > 0) && (
                <div className="mb-4" {...inspectorProps({ fieldId: 'technologiesUsed' })}>
                    <h3 className="mb-2 text-sm text-center font-bold text-gray-700">Tech</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {updatedProject.technologiesUsed.map((tech, index) => (
                            tech && (
                                <span
                                    key={index}
                                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                                >
                                    {tech}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            )}

            {(updatedProject.skillsUsed && updatedProject.skillsUsed.length > 0) && (
                <div className="mb-4" {...inspectorProps({ fieldId: 'skillsUsed' })}>
                    <h3 className="mb-2 text-sm text-center font-bold text-gray-700">Skills</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {updatedProject.skillsUsed.map((skill, index) => (
                            skill && (
                                <span
                                    key={index}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                                >
                                    {skill}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            )}

            {updatedProject.description && updatedProject.description.json && (
                <div className="border-t border-gray-200 pt-4">
                    <button
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-100 rounded-lg px-2 -mx-2 transition-colors"
                        aria-expanded={isDetailsOpen}
                    >
                        <h3 className="text-lg font-semibold m-0 p-0">Project Details</h3>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${isDetailsOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isDetailsOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="pb-4 pt-2">
                            <div {...inspectorProps({ fieldId: 'description' })}>
                                <CtfRichText json={updatedProject.description.json} links={updatedProject.description.links || undefined} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}