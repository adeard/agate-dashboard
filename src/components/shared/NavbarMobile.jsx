import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const NavbarMobile = ({ linkBack, title, rightIcon }) => {
  return (
    <section>
      <div className='navbar flex items-center justify-between lg:hidden max-h-16 p-3 bg-white'>
        <Link to={linkBack}>
          <MdArrowBackIosNew className='text-xl' />
        </Link>
        <h1 className='subheadline-s'>{title}</h1>
        <div>{rightIcon}</div>
      </div>
    </section>
  );
};

export default NavbarMobile;
