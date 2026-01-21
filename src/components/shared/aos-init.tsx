'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 300,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });
  }, []);

  return null;
}
