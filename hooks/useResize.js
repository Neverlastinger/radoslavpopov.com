import { useEffect } from 'react';

/**
 * A custom hook to track resize events.
 *
 * @param  {Function} callback: called when the browser window resizes
 * @param  {Array}    dependencies: callback dependencies to update the callback
 */
const useResize = (callback, dependencies = []) => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    callback();

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, dependencies);
};

export default useResize;
