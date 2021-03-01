import { useState } from 'react';
import ProjectPage from '../components/ProjectPage';
import { useResize } from '../hooks';

export const isMobileWidth = () => (
  window.matchMedia('(max-width: 626px)').matches
);

const KredyPage = () => {
  const [img, setImg] = useState();

  useResize(() => {
    setImg(isMobileWidth() ? 'k-work-in-progress-mobile.png' : 'k-work-in-progress.png');
  });

  return (
    <ProjectPage
      img={img}
      text="Currently designing and implementing the Front-End architecture of an exciting start-up idea."
    />
  );
};

export default KredyPage;
