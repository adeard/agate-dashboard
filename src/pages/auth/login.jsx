import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import InputWithIcon from '@/components/shared/InputWithIcon';

import { useForm } from '@tanstack/react-form';

import Logo from '@/assets/images/logo.png';

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex min-h-screen justify-end login-bg'>
      <div className='w-[65%] p-4'>
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
              <div className='w-full max-w-sm space-y-2'>
                <form.Field
                  name='username'
                  children={(field) => (
                    <div>
                      <label className='label !pl-0' htmlFor={field.name}>
                        <span className='label-text body-s-b text-color-1'>
                          Username
                        </span>
                      </label>
                      <Input
                        placeholder='@username'
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
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
