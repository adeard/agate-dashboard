import { useEffect, useRef, useState } from 'react';

import { useForm } from '@tanstack/react-form';

import {
  MdOutlineLocalShipping,
  MdOutlineTableChart,
  MdNotInterested,
  MdPlaylistAddCheck,
  MdOutlineFeedback,
  MdInfoOutline,
} from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';

import { convertLabel } from '@/utils/common';

import ModalFilter from '../components/ModalFilter';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Dropdown from '@/components/shared/Dropdown';
import DrawerSenderVendor from '../components/DrawerSenderVendor';

const DashboardMonitoringPage = () => {
  const { data: optionsFactory } = useGet('/v1/options/factory');

  const { data, loading } = useGetWithPost('/v2/dashboard/monitoring');

  const [isBuahInti, setIsBuahInti] = useState(true);
  const [selectedFactory, setSelectedFactory] = useState('');

  const form = useForm({
    defaultValues: {
      date: '',
      access_factory: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const dialogFilterRef = useRef(null);
  const handleOpenModalFilter = () => {
    dialogFilterRef.current.showModal();
  };

  const [selectedData, setSelectedData] = useState('');
  const idDrawerSenderVendor = 'DrawerSenderVendor';
  const [isDrawerSenderVendorOpen, setIsDrawerSenderVendorOpen] =
    useState(false);

  const toogleDrawerSender = (data) => {
    setSelectedData(data);
    const drawerElement = document.getElementById(idDrawerSenderVendor);
    drawerElement.checked = true;
    setIsDrawerSenderVendorOpen(!isDrawerSenderVendorOpen);
  };

  useEffect(() => {
    // handleOpenModalFilter();
  }, []);

  return (
    <div>
      <header>
        <div className='flex items-center justify-between  px-12 pt-6 pb-2'>
          <h1 className='headline-s'>Dashboard Monitoring Grading</h1>
          <div className='flex gap-2'>
            <label className='tag-l my-auto text-color-2'>FILTER</label>
            <form.Field
              name='date'
              children={(field) => (
                <Input
                  type='date'
                  size='lg'
                  full
                  name={field.name}
                  value={field.state.value}
                  className='pr-12 bg-white '
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    form.handleSubmit();
                  }}
                />
              )}
            />
            <Dropdown
              selected={selectedFactory}
              setSelected={setSelectedFactory}
              options={optionsFactory}
              buttonClassname='body-s-r border-primary-3 border-2 !h-10 w-max min-w-[170px]'
              arrowPosition='right'
              full
            />
            <Button size='lg' onClick={form.handleSubmit}>
              Apply
            </Button>
          </div>
        </div>
      </header>
      <main className='grid grid-cols-5 gap-4'>
        <div className='col-span-3 grid grid-cols-2 gap-4'>
          <div className='flex-1 col-span-2 bg-white p-5 rounded-xl border border-primary-3 space-y-2'>
            <div className='bg-[#E8F8E4] p-2 w-max rounded-md'>
              <MdOutlineLocalShipping className='text-2xl text-primary-G600' />
            </div>
            <p className='tag-l text-color-2'>TOTAL TRUK</p>
            <p className='headline-s text-color-1'>
              {data?.total_grading.toLocaleString()}{' '}
              <span className='subheadline-l text-color-2'>Truk</span>
            </p>
            <p className='subheadline-m text-color-2'>
              100 <span className='subheadline-s text-color-3'>%</span>
            </p>
          </div>
          <div className='bg-white p-5 rounded-xl border border-primary-3 space-y-2'>
            <div className='bg-[#E8F8E4] p-2 w-max rounded-md'>
              <MdOutlineTableChart className='text-2xl text-primary-G600' />
            </div>
            <p className='tag-l text-color-2'>TOTAL TBS</p>
            <p className='headline-s text-color-1'>
              {data?.total_tandan.toLocaleString()}{' '}
              <span className='subheadline-l text-color-2'>pcs</span>
            </p>
            <p className='subheadline-m text-color-2'>
              100 <span className='subheadline-s text-color-3'>%</span>
            </p>
          </div>
          <div className='bg-white p-5 rounded-xl border border-primary-3 space-y-2'>
            <div className='bg-[#E8F8E4] p-2 w-max rounded-md'>
              <MdPlaylistAddCheck className='text-2xl text-primary-G600' />
            </div>
            <p className='tag-l text-color-2'>TOTAL DITERIMA</p>
            <p className='headline-s text-color-1'>
              {data?.total_passed.toLocaleString()}{' '}
              <span className='subheadline-l text-color-2'>pcs</span>
            </p>
            <p className='subheadline-m text-color-2'>
              {Number(data?.percent_passed).toFixed(2)}{' '}
              <span className='subheadline-s text-color-3'>%</span>
            </p>
          </div>
          <div className='bg-white p-5 rounded-xl border border-primary-3 space-y-2'>
            <div className='bg-secondary-5 p-2 w-max rounded-md'>
              <MdNotInterested className='text-2xl text-secondary-1' />
            </div>
            <p className='tag-l text-color-2'>TOTAL DITOLAK</p>
            <p className='headline-s text-color-1'>
              {data?.total_rejected.toLocaleString()}{' '}
              <span className='subheadline-l text-color-2'>pcs</span>
            </p>
            <p className='subheadline-m text-color-2'>
              {Number(data?.percent_rejected).toFixed(2)}{' '}
              <span className='subheadline-s text-color-3'>%</span>
            </p>
          </div>
          <div className='bg-white p-5 rounded-xl border border-primary-3 space-y-2'>
            <div className='bg-secondary-5 p-2 w-max rounded-md'>
              <MdOutlineFeedback className='text-2xl text-secondary-1' />
            </div>
            <p className='tag-l text-color-2'>TOTAL DIDENDA</p>
            <p className='headline-s text-color-1'>
              {data?.total_fined.toLocaleString()}{' '}
              <span className='subheadline-l text-color-2'>pcs</span>
            </p>
            <p className='subheadline-m text-color-2'>
              {Number(data?.percent_fined).toFixed(2)}{' '}
              <span className='subheadline-s text-color-3'>%</span>
            </p>
          </div>
        </div>
        <div className='col-span-2 bg-white p-5 rounded-xl border border-primary-3 space-y-4'>
          <div className='relative inline-block w-60'>
            <input
              type='checkbox'
              id='toggle'
              className='sr-only'
              checked={isBuahInti}
              onChange={() => setIsBuahInti(!isBuahInti)}
            />
            <label
              htmlFor='toggle'
              className='body-m-b block cursor-pointer overflow-hidden rounded-full bg-primary-4 px-2'
            >
              <div className='flex w-full items-center justify-between py-3 transition-all duration-300 ease-in-out'>
                <span
                  className={`${
                    isBuahInti ? 'text-color-1' : 'text-color-2'
                  } relative z-10 flex-1 text-center`}
                >
                  Buah Inti
                </span>
                <span
                  className={`${
                    isBuahInti ? 'text-color-2' : 'text-color-1'
                  } relative z-10 ml-2 flex-1 text-center`}
                >
                  Buah Plasma
                </span>
              </div>
              <span
                className={`z-1 absolute bottom-0 left-0 top-0 my-auto h-4/5 w-[45%] transform rounded-full bg-white/80 px-8 transition-transform duration-300 ease-in-out ${
                  isBuahInti ? 'translate-x-2' : 'w-[50%] translate-x-[95%]'
                }`}
              />
            </label>
          </div>

          {isBuahInti ? (
            <>
              <div className='border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                    KLASIFIKASI UTAMA
                  </span>
                </label>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.classification.inti.main.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() =>
                            toogleDrawerSender({
                              label: item.label,
                              vendors: item.vendors,
                            })
                          }
                        >
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1 capitalize'>
                            {convertLabel(item.label)}
                          </td>
                          <td width={150}>
                            <span className='text-color-1'>
                              {item.total.toLocaleString()}
                            </span>{' '}
                            <span className='body-s-r'>pcs</span>
                          </td>
                          <td width={2} className='p-0'>
                            <span className='h-full border border-primary-3'></span>
                          </td>
                          <td width={70}>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {item.percentage.toFixed(2)}
                              </span>{' '}
                              <span className='body-s-r'>%</span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className='border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                    SUB KLASIFIKASI
                  </span>
                </label>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.classification.inti.sub.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() =>
                            toogleDrawerSender({
                              label: item.label,
                              vendors: item.vendors,
                            })
                          }
                        >
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1 capitalize'>
                            {convertLabel(item.label)}
                          </td>
                          <td width={150}>
                            <span className='text-color-1'>
                              {item.total.toLocaleString()}
                            </span>{' '}
                            <span className='body-s-r'>pcs</span>
                          </td>
                          <td width={2} className='p-0'>
                            <span className='h-full border border-primary-3'></span>
                          </td>
                          <td width={70}>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {item.percentage.toFixed(2)}
                              </span>{' '}
                              <span className='body-s-r'>%</span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className='border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                    DITERIMA
                  </span>
                </label>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.classification.plasma.accepted.map(
                        (item, index) => (
                          <tr
                            key={index}
                            className='body-m-r group hover text-color-2 hover:cursor-pointer'
                            onClick={() =>
                              toogleDrawerSender({
                                label: item.label,
                                vendors: item.vendors,
                              })
                            }
                          >
                            <td width={20}>{index + 1}.</td>
                            <td className='text-color-1 capitalize'>
                              {convertLabel(item.label)}
                            </td>
                            <td width={150}>
                              <span className='text-color-1'>
                                {item.total.toLocaleString()}
                              </span>{' '}
                              <span className='body-s-r'>pcs</span>
                            </td>
                            <td width={2} className='p-0'>
                              <span className='h-full border border-primary-3'></span>
                            </td>
                            <td width={70}>
                              <p className='inline-flex'>
                                <span className='text-color-1'>
                                  {item.percentage.toFixed(2)}
                                </span>{' '}
                                <span className='body-s-r'>%</span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
              <div className='border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                    DIDENDA
                  </span>
                </label>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.classification.plasma.fined.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() =>
                            toogleDrawerSender({
                              label: item.label,
                              vendors: item.vendors,
                            })
                          }
                        >
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1 capitalize'>
                            {convertLabel(item.label)}
                          </td>
                          <td width={150}>
                            <span className='text-color-1'>
                              {item.total.toLocaleString()}
                            </span>{' '}
                            <span className='body-s-r'>pcs</span>
                          </td>
                          <td width={2} className='p-0'>
                            <span className='h-full border border-primary-3'></span>
                          </td>
                          <td width={70}>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {item.percentage.toFixed(2)}
                              </span>{' '}
                              <span className='body-s-r'>%</span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className='border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                    DITOLAK
                  </span>
                </label>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.classification.plasma.rejected.map(
                        (item, index) => (
                          <tr
                            key={index}
                            className='body-m-r group hover text-color-2 hover:cursor-pointer'
                            onClick={() =>
                              toogleDrawerSender({
                                label: item.label,
                                vendors: item.vendors,
                              })
                            }
                          >
                            <td width={20}>{index + 1}.</td>
                            <td className='text-color-1 capitalize'>
                              {convertLabel(item.label)}
                            </td>
                            <td width={150}>
                              <span className='text-color-1'>
                                {item.total.toLocaleString()}
                              </span>{' '}
                              <span className='body-s-r'>pcs</span>
                            </td>
                            <td width={2} className='p-0'>
                              <span className='h-full border border-primary-3'></span>
                            </td>
                            <td width={70}>
                              <p className='inline-flex'>
                                <span className='text-color-1'>
                                  {item.percentage.toFixed(2)}
                                </span>{' '}
                                <span className='body-s-r'>%</span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>

      <DrawerSenderVendor
        idDrawer={idDrawerSenderVendor}
        isDrawerOpen={isDrawerSenderVendorOpen}
        closeDrawer={() => setIsDrawerSenderVendorOpen(false)}
        data={selectedData}
      />

      <ModalFilter modalRef={dialogFilterRef} />
    </div>
  );
};

export default DashboardMonitoringPage;
