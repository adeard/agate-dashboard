import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdLock } from 'react-icons/io';

import { useForm } from '@tanstack/react-form';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

import { getDecodeToken } from '@/services/auth';

const ProfilePage = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const handleSave = () => {
    console.log('simpan');
  };

  const _checkDecodeToken = () => {
    getDecodeToken()
      .then((res) => {
        form.setFieldValue('name', res.data.full_name);
        form.setFieldValue('email', res.data.email);
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  useEffect(() => {
    _checkDecodeToken();
  }, []);

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <h1 className='headline-s'>Profile</h1>
          {/* <div className='flex gap-4'>
            <Button
              variant='primary-outline'
              size='lg'
              className='button-shadow'
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button size='lg' onClick={handleSave}>
              Simpan
            </Button>
          </div> */}
        </div>
      </header>
      <main>
        <div
          className='card w-3/4 mx-auto bg-white'
          style={{ boxShadow: '0px 0px 4px -1px #ACA4A4' }}
        >
          <div className='flex items-center justify-between border-2 border-transparent border-b-primary-4 p-5'>
            <h2 className='subheadline-s text-color-1'>User Account</h2>
            <Button
              size='lg'
              className='flex items-center gap-2'
              onClick={() => navigate('change-password')}
            >
              <IoMdLock className='text-xl' /> Change Password
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-4 p-5'>
            <form.Field
              name='name'
              children={(field) => (
                <div>
                  <label className='label !pl-0' htmlFor={field.name}>
                    <span className='label-text body-m-b text-color-2'>
                      Nama
                    </span>
                  </label>
                  <Input
                    placeholder='Nama'
                    size='lg'
                    full
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    readOnly
                  />
                </div>
              )}
            />
            <form.Field
              name='email'
              children={(field) => (
                <div>
                  <label className='label !pl-0' htmlFor={field.name}>
                    <span className='label-text body-m-b text-color-2'>
                      Email
                    </span>
                  </label>
                  <Input
                    type='email'
                    placeholder='Email'
                    size='lg'
                    full
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    readOnly
                  />
                </div>
              )}
            />
          </div>
          {/* <div className='flex gap-4'>
            <div className='basis-1/2 flex gap-8'>
              <p className='body-m-b text-color-2'>Nama</p>
              <p className='body-m-b text-color-1'>Aditya Ferry</p>
            </div>
            <div className='basis-1/2 flex gap-8'>
              <p className='body-m-b text-color-2'>CIF</p>
              <p className='body-m-b text-color-1'>Adityaferry@gmail.com</p>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
