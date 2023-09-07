import { useState, useEffect } from 'react';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: no-preference)');

    setPrefersReducedMotion(!query.matches);

    const setState = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    query.addEventListener('change', setState);

    return () => {
      query.removeEventListener('change', setState);
    };
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
