const backendUrl = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

if (backendUrl) {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      return originalFetch(`${backendUrl}${input}`, init);
    }

    return originalFetch(input, init);
  };
}
