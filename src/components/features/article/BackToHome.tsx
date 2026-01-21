'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import AOS from 'aos';

export function BackToHome() {
    const router = useRouter();

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default and stop propagation to avoid AOS interference
        e.preventDefault();
        e.stopPropagation();
        
        // Temporarily disable AOS refresh to prevent view repositioning on pages with AOS elements
        const originalRefresh = AOS.refresh;
        AOS.refresh = () => {};
        
        // Navigate immediately
        router.back();
        
        // Re-enable AOS refresh after navigation starts
        setTimeout(() => {
            AOS.refresh = originalRefresh;
        }, 100);
    }, [router]);

    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
        // Prevent AOS from processing touch events
        e.stopPropagation();
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
        // Handle touch events separately for mobile
        e.preventDefault();
        e.stopPropagation();
        
        // Temporarily disable AOS refresh
        const originalRefresh = AOS.refresh;
        AOS.refresh = () => {};
        
        // Navigate immediately on touch
        router.back();
        
        // Re-enable AOS refresh after navigation starts
        setTimeout(() => {
            AOS.refresh = originalRefresh;
        }, 100);
    }, [router]);

    return (
        <div className="flex justify-center" data-aos="none">
            <button
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                type="button"
                data-aos="none"
                className="p-4 rounded-md underline text-lg text-center hover-effect cursor-pointer"
            >
                Return to Home
            </button>
        </div>
    );
}