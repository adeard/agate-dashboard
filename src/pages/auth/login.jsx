import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import InputWithIcon from '@/components/shared/InputWithIcon';

import { useForm } from '@tanstack/react-form';

import { toast } from 'react-toastify';
import { setToken } from '@/utils/storages';
import { postLogin } from '@/services/auth';

import Logo from '@/assets/images/logo.png';
import LogoWhite from '@/assets/images/logo-white.png';

const LoginPage = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      handleLogin(value);
    },
  });

  const handleLogin = async (payload) => {
    setLoadingSubmit(true);
    try {
      const res = await postLogin(payload);
      const token = res?.data?.access_token?.replace('Bearer ', '');

      if (token) {
        setToken(token);
        toast.success('Berhasil login');
        setTimeout(() => {
          window.location.replace('/');
        }, 1000);
      }
    } catch (err) {
      console.log(err.message.m);
      toast.error(err.message.m);
      setLoadingSubmit(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className='flex min-h-screen lg:justify-end login-bg'>
      <div className='hidden lg:block w-[65%] p-4'>
        <div className='h-full w-full'>
          <div className='card h-full w-full bg-white'>
            <div className='flex h-full flex-col items-center justify-center gap-8'>
              {/* <div className='mb-8'>
                <img src={Logo} alt='Sinarmas Logo' width={220} height={56} />
              </div> */}
              <div className='text-center text-primary'>
                <h3 className='headline-m mb-4'>Automatic Grading System</h3>
                <p className='body-m-r text-primary-2'>
                  Sign in to your account
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form.Field
                  name='email'
                  children={(field) => (
                    <div>
                      <label className='label !pl-0' htmlFor={field.name}>
                        <span className='label-text body-s-b text-color-1'>
                          Email
                        </span>
                      </label>
                      <Input
                        placeholder='Enter email'
                        full
                        size='lg'
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
                <form.Field
                  name='password'
                  children={(field) => (
                    <div>
                      <label className='label !pl-0' htmlFor={field.name}>
                        <span className='label-text body-s-b text-color-1'>
                          Password
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

                <div>
                  <Button
                    variant='primary'
                    size='lg'
                    className='button-l mt-4'
                    full
                    onClick={form.handleSubmit}
                    loading={loadingSubmit}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex lg:hidden flex-col justify-center items-center gap-8 p-4'>
        <div className='text-white space-y-4'>
          {/* <img
            src={LogoWhite}
            alt='Sinarmas Logo'
            width={167}
            height={42}
            className='mx-auto'
          /> */}
          <h3 className='text-2xl'>Automatic Grading System</h3>
        </div>
        <form className='card w-full h-max bg-white p-4 space-y-4'>
          <form.Field
            name='email'
            children={(field) => (
              <div>
                <label className='label !pl-0' htmlFor={field.name}>
                  <span className='label-text body-s-b text-color-1'>
                    Email
                  </span>
                </label>
                <Input
                  placeholder='Enter email'
                  full
                  size='lg'
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name='password'
            children={(field) => (
              <div>
                <label className='label !pl-0' htmlFor={field.name}>
                  <span className='label-text body-s-b text-color-1'>
                    Password
                  </span>
                </label>
                <InputWithIcon
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  iconRight={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  onClickIcon={() => setShowPassword(!showPassword)}
                  size='lg'
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <Button
            type='submit'
            variant='primary'
            size='lg'
            className='button-l mt-4'
            full
            onClick={form.handleSubmit}
            loading={loadingSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
