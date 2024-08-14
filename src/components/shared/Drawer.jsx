import React from 'react';

const Drawer = ({ idDrawer, isOpen, closeDrawer, children, widthDrawer }) => {
  return (
    <div className='drawer drawer-end z-20'>
      <input id={idDrawer} type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'></div>
      <div className='drawer-side'>
        <label
          htmlFor={idDrawer}
          aria-label='close sidebar'
          className='drawer-overlay'
          onClick={closeDrawer}
        ></label>
        <div
          className={`my-auto h-[calc(100vh-30px)] overflow-auto rounded-xl bg-primary-6 p-8 text-base-content
            ${isOpen && 'mr-4'} `}
          style={{ width: widthDrawer || '685px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
