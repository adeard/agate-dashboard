import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import InputWithIcon from '@/components/shared/InputWithIcon';

import { useForm } from '@tanstack/react-form';

import { toast } from 'react-toastify';
import { setToken } from '@/utils/storages';
import { postForgotPassword, postLogin } from '@/services/auth';

import Logo from '@/assets/images/logo.png';
import LogoWhite from '@/assets/images/logo-white.png';

const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      isForgotPassword ? handleForgotPassword(value) : handleLogin(value);
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

  const handleForgotPassword = async (payload) => {
    setLoadingSubmit(true);
    try {
      const res = await postForgotPassword({ email: payload.email });

      if (res) {
        setIsForgotPassword(false);
        form.reset();
      }
    } catch (err) {
      console.log(err.message.m);
      toast.error(err.message.m);
      setLoadingSubmit(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderForm = () => (
    <form
      className={`w-full ${
        isMobile ? 'card h-max bg-white p-4' : 'max-w-sm'
      } space-y-4`}
      onSubmit={form.handleSubmit}
    >
      <form.Field
        name='email'
        children={(field) => {
          const fieldId = `email-${isMobile ? 'mobile' : 'desktop'}`;
          return (
            <div>
              <label className='label !pl-0' htmlFor={fieldId}>
                <span className='label-text body-s-b text-color-1'>Email</span>
              </label>
              <Input
                id={fieldId}
                placeholder='Enter email'
                full
                size='lg'
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          );
        }}
      />

      {!isForgotPassword && (
        <form.Field
          name='password'
          children={(field) => {
            const fieldId = `password-${isMobile ? 'mobile' : 'desktop'}`;
            return (
              <div>
                <label className='label !pl-0' htmlFor={fieldId}>
                  <span className='label-text body-s-b text-color-1'>
                    Password
                  </span>
                </label>
                <InputWithIcon
                  id={fieldId}
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
            );
          }}
        />
      )}

      <p
        className='underline text-blue-400 !mt-4 cursor-pointer'
        onClick={() => {
          setIsForgotPassword(!isForgotPassword);
          form.reset();
        }}
      >
        {isForgotPassword ? 'back to login' : 'forgot password'}
      </p>

      <Button
        type={isForgotPassword ? 'button' : 'submit'}
        variant='primary'
        size='lg'
        className='button-l mt-4'
        full
        onClick={isMobile ? undefined : form.handleSubmit}
        loading={loadingSubmit}
      >
        {isForgotPassword ? 'Submit' : 'Login'}
      </Button>
    </form>
  );

  return (
    <div className='flex min-h-screen lg:justify-end login-bg'>
      {isMobile ? (
        <div className='w-full flex flex-col justify-center items-center gap-8 p-4'>
          <div className='text-white space-y-4'>
            <img
              src={LogoWhite}
              alt='Sinarmas Logo'
              width={167}
              height={42}
              className='mx-auto'
            />
            <h3 className='text-2xl'>Automatic Grading System</h3>
          </div>
          {renderForm()}
        </div>
      ) : (
        <div className='hidden lg:block w-[65%] p-4'>
          <div className='h-full w-full'>
            <div className='card h-full w-full bg-white'>
              <div className='flex h-full flex-col items-center justify-center gap-8'>
                <div className='mb-8'>
                  <img src={Logo} alt='Sinarmas Logo' width={220} height={56} />
                </div>
                <div className='text-center text-primary'>
                  <h3 className='headline-m mb-4'>Automatic Grading System</h3>
                  <p className='body-m-r text-primary-2'>
                    Sign in to your account
                  </p>
                </div>
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
