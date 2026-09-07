const Drawer = ({ idDrawer, isOpen, closeDrawer, children, widthDrawer }) => {
  return (
    <div className='drawer drawer-end z-20'>
      <input id={idDrawer} type='checkbox' className='drawer-toggle' />
      <div className='drawer-side'>
        <label
          aria-label='close sidebar'
          className='drawer-overlay'
          onClick={closeDrawer}
        ></label>
        <div
          className={
            'my-auto min-h-dvh rounded-l-xl bg-neutrals-2 p-8 text-base-content'
          }
          style={{ width: widthDrawer || '685px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
