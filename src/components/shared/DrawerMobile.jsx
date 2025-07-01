const DrawerMobile = ({ idDrawer, closeDrawer, classNameDrawer, children, }) => {
  return (
    <div className='drawer z-20'>
      <input id={idDrawer} type='checkbox' className='drawer-toggle' />
      <div className='drawer-side'>
        <label
          aria-label='close sidebar'
          className='drawer-overlay'
          onClick={closeDrawer}
        ></label>
        <div className={`my-auto h-screen overflow-auto bg-white w-full p-4 pb-8 ${classNameDrawer}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DrawerMobile;
