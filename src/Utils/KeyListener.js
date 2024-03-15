import { useEffect } from 'react';

function useKeyListener(callback, keyType) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === keyType) {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}

export default useKeyListener;
