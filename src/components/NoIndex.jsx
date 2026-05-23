import { useEffect } from 'react';

export default function NoIndex() {
  useEffect(() => {
    const selector = 'meta[name="robots"]';
    const previous = document.querySelector(selector)?.getAttribute('content');
    let tag = document.querySelector(selector);

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (previous) tag.setAttribute('content', previous);
      else tag.remove();
    };
  }, []);

  return null;
}
