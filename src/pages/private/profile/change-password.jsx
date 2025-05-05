import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdLock } from 'react-icons/io';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import { useForm } from '@tanstack/react-form';
import { usePut } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

import InputWithIcon from '@/components/shared/InputWithIcon';
import NavbarMobile from '@/components/shared/NavbarMobile';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  const {
    handlePut,
    loadingPut,
    responseData: responsePut,
  } = usePut('/v1/user/change-password', () => {
    handleClose();
    refetch();
  });

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
    onSubmit: async ({ value }) => {
      handlePut(value);

      form.reset();
    },
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <NavbarMobile linkBack='/dashboard' title='Ganti Password' />
          <div className='min-h-[calc(100vh-64px)] flex flex-col justify-between p-4'>
            <div className='space-y-2'>
              <form.Field
                name='old_password'
                children={(field) => (
                  <div>
                    <label className='label !pl-0' htmlFor={field.name}>
                      <span className='label-text body-m-b text-color-2'>
                        Password Lama
                      </span>
                    </label>
                    <InputWithIcon
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter password'
                      iconRight={
                        showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                      }
                      onClickIcon={() => setShowPassword(!showPassword)}
                      size='lg'
                      className='bg-white'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name='new_password'
                children={(field) => (
                  <div>
                    <label className='label !pl-0' htmlFor={field.name}>
                      <span className='label-text body-m-b text-color-2'>
                        Password Baru
                      </span>
                    </label>
                    <InputWithIcon
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter password'
                      iconRight={
                        showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                      }
                      onClickIcon={() => setShowPassword(!showPassword)}
                      size='lg'
                      className='bg-white'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>
            <div className='space-y-2'>
              <Button
                size='lg'
                full
                loading={loadingPut}
                onClick={form.handleSubmit}
              >
                Simpan
              </Button>
              <Button
                variant='primary-outline'
                size='lg'
                full
                className='button-shadow'
                onClick={() => navigate('/dashboard')}
              >
                Back To Menu
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <header>
            <div className='flex items-center justify-between bg-white px-12 py-6'>
              <h1 className='headline-s'>Profile</h1>
              <div className='flex gap-4'>
                <Button
                  variant='primary-outline'
                  size='lg'
                  className='button-shadow'
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
                <Button
                  size='lg'
                  loading={loadingPut}
                  onClick={form.handleSubmit}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </header>
          <main>
            <div
              className='card w-3/4 mx-auto bg-white'
              style={{ boxShadow: '0px 0px 4px -1px #ACA4A4' }}
            >
              <div className='border-2 border-transparent border-b-primary-4 p-5'>
                <h2 className='subheadline-s text-color-1'>Ganti Password</h2>
              </div>
              <div className='grid grid-cols-2 gap-4 p-5'>
                <form.Field
                  name='old_password'
                  children={(field) => (
                    <div>
                      <label className='label !pl-0' htmlFor={field.name}>
                        <span className='label-text body-m-b text-color-2'>
                          Password Lama
                        </span>
                      </label>
                      <InputWithIcon
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        iconRight={
                          showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                        }
                        onClickIcon={() => setShowPassword(!showPassword)}
                        size='lg'
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
                <form.Field
                  name='new_password'
                  children={(field) => (
                    <div>
                      <label className='label !pl-0' htmlFor={field.name}>
                        <span className='label-text body-m-b text-color-2'>
                          Password Baru
                        </span>
                      </label>
                      <InputWithIcon
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        iconRight={
                          showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                        }
                        onClickIcon={() => setShowPassword(!showPassword)}
                        size='lg'
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
