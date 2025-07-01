import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const NavbarMobile = ({ linkBack = null, title, rightIcon }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className='navbar flex items-center justify-between lg:hidden max-h-16 p-3 bg-white'>
        <div onClick={() => navigate(linkBack)}>
          <MdArrowBackIosNew className='text-xl' />
        </div>
        <h1 className='subheadline-s'>{title}</h1>
        <div>{rightIcon}</div>
      </div>
    </section>
  );
};

export default NavbarMobile;
