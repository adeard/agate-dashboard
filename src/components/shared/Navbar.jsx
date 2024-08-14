import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/logo.png';
import Account from '@/assets/images/account.png';

import {
  MdOutlineDashboard,
  MdOutlineFactory,
  MdOutlineSupervisorAccount,
  MdKeyboardArrowDown,
  MdOutlinePerson2,
  MdOutlinePassword,
  MdOutlineLogout,
} from 'react-icons/md';
import { FaChartBar } from 'react-icons/fa';

import Button from './Button';

import { logoutUser } from '@/services/auth';

const navbarItems = [
  {
    path: '/dashboard/monitoring',
    label: 'Dashboard Monitoring',
    icon: <MdOutlineDashboard className='text-xl' />,
  },
  {
    path: '/dashboard/demografi',
    label: 'Dashboard Demografi',
    icon: <FaChartBar className='text-xl' />,
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

  const navigate = useNavigate();

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
              <Button
                variant='primary-outline'
                size='lg'
                full
                className='border-none flex items-center justify-start'
                onClick={() => navigate('/profile')}
              >
                <MdOutlinePerson2 className='text-xl text-color-2' />
                <span>Profile</span>
              </Button>
            </li>
            <li>
              <Button
                variant='primary-outline'
                size='lg'
                full
                className='border-none flex items-center justify-start'
                onClick={() => navigate('/profile/change-password')}
              >
                <MdOutlinePassword className='text-xl text-color-2' />
                <span>Change Password</span>
              </Button>
            </li>
            <li>
              <Button
                variant='primary-outline'
                size='lg'
                full
                className='border-none flex items-center justify-start'
                onClick={logoutUser}
              >
                <MdOutlineLogout className='text-xl text-color-2' />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
