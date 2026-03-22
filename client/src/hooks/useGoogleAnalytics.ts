import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getCookieConsent } from '@/components/CookieBanner';

const GA_ID = 'G-K8RD1KSD14';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    _gaLoaded?: boolean;
  }
}

function loadGAScript() {
  if (window._gaLoaded) return;
  window._gaLoaded = true;

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  // Load the script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function disableGA() {
  // Set opt-out flag for GA
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[`ga-disable-${GA_ID}`] = true;
}

export function useGoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    const consent = getCookieConsent();

    if (consent?.analytics) {
      loadGAScript();
    } else {
      disableGA();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent?.analytics) return;
    if (!window.gtag) return;

    window.gtag('config', GA_ID, {
      page_path: location,
      anonymize_ip: true,
    });
  }, [location]);
}
