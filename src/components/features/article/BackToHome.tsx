'use client';

import { useRouter } from 'next/navigation';

export function BackToHome() {
    const router = useRouter();

    // Save scroll position before navigating
    const handleClick = () => {
        history.back()
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={handleClick}
                className="p-4 rounded-md underline text-lg text-center hover-effect cursor-pointer"
            >
                Return to Home
            </button>
        </div>
    );
}