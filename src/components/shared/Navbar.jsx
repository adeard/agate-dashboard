import { Link, useLocation } from 'react-router-dom';

import Logo from '@/assets/images/logo.png';
import Account from '@/assets/images/account.png';

import { RiTableLine } from 'react-icons/ri';
import {
  MdOutlineFactory,
  MdOutlineSupervisorAccount,
  MdKeyboardArrowDown,
  MdOutlinePassword,
  MdOutlineLogout,
} from 'react-icons/md';

const navbarItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <RiTableLine className='text-xl' />,
  },
  {
    path: '/factory',
    label: 'Daftar Pabrik',
    icon: <MdOutlineFactory className='text-xl' />,
  },
  {
    path: '/user-access',
    label: 'User Access',
    icon: <MdOutlineSupervisorAccount className='text-xl' />,
  },
];

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className='navbar max-h-16 p-4'>
      <div className='flex-1'>
        <div className='mr-4'>
          <img src={Logo} alt='Sinarmas Logo' width={130} height={33} />
        </div>
        <ul className='navbar-custom body-m-b menu menu-horizontal ml-1 px-1'>
          {navbarItems.map((item) => (
            <li
              key={item.path}
              className={`rounded-full ${
                isActive(item.path)
                  ? 'border border-primary-4 bg-white text-color-1'
                  : 'text-color-2'
              }`}
            >
              <Link to={item.path}>
                <span
                  className={isActive(item.path) ? 'text-primary-G600' : ''}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='flex-none'>
        <div className='dropdown dropdown-hover dropdown-end'>
          <div tabIndex={0} role='button' className='flex items-center gap-2'>
            <img src={Account} alt='profile account' width={32} height={32} />
            <span>Akun</span>
            <MdKeyboardArrowDown className='text-xl' />
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow'
          >
            <li>
              <Link to='/change-password'>
                <MdOutlinePassword className='text-xl text-color-2' />{' '}
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link>
                <MdOutlineLogout className='text-xl text-color-2' />{' '}
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* <img src={Account} alt='profile account' width={32} height={32} />
        <ul className='menu menu-horizontal px-1'>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className='bg-white rounded-t-none p-2'>
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Navbar;
