import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdLock } from 'react-icons/io';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import { useForm } from '@tanstack/react-form';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

import { getDecodeToken } from '@/services/auth';
import InputWithIcon from '@/components/shared/InputWithIcon';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
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
            <Button size='lg' onClick={form.handleSubmit}>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
