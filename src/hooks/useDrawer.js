import { useState } from 'react';

const useDrawer = (initialId) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const idDrawer = initialId;

  const toggleDrawer = () => {
    const drawerElement = document.getElementById(idDrawer);
    if (drawerElement) {
      drawerElement.checked = !drawerElement.checked;
    }
    setIsDrawerOpen((prevState) => !prevState);
  };

  return {
    idDrawer,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};

export default useDrawer;
