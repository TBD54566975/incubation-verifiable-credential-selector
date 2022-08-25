import { useRouter } from 'next/router';
import React from 'react';
import { IoIosLock } from 'react-icons/io';
import { IoPersonCircle, IoShieldCheckmarkOutline } from 'react-icons/io5';

import { Header, Input } from '@/components';
import allBanks from '@/data/banks';
import { htw } from '@/utils/Helper';

const BankLoginScreen: React.FC = () => {
  const router = useRouter();
  const { bankId } = router.query;
  const bank = allBanks.find((item) => item.id.toString() === bankId);

  const [state, setState] = React.useState({
    email: '',
    password: '',
    isValidEmail: undefined as any,
    isValidPassword: undefined as any,
  });

  const { email, password } = state;

  const dummy = {
    email: 'abc@gmail.com',
    password: 'qwerty',
  };

  const onSubmitHandler = () => {
    if (email === dummy.email && password === dummy.password) {
      setState((prev) => ({
        ...prev,
        isValidEmail: true,
        isValidPassword: true,
      }));
      if (bank?.isError) {
        router.push({
          pathname: '/bank-error',
          query: { data: JSON.stringify(bank) },
        });
      } else {
        router.push({
          pathname: '/bank-auth-captcha',
          query: { data: JSON.stringify(bank) },
        });
      }
    } else {
      if (email !== dummy.email) {
        setState((prev) => ({ ...prev, isValidEmail: false }));
      }

      if (password !== dummy.password) {
        setState((prev) => ({ ...prev, isValidPassword: false }));
      }
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={bank?.image} />

      <div className="flex grow flex-col items-center justify-start px-5">
        <div className={`${htw.text.title} font-normal`}>
          Login to <div className="font-bold">{bank?.name}</div>
          {'\n'}
          Enter your credentials
        </div>

        <div className={htw.text.description}>
          By providing your credentials you are asking Sophtron to retrieve your
          financial data and agree to our terms of service.
        </div>

        <div className="mt-12 w-full">
          <Input
            placeholder="Email"
            onChange={(text: string) => {
              setState({ ...state, email: text });
              if (state.isValidEmail === false || state.isValidEmail === true) {
                if (text === dummy.email) {
                  setState((prev) => ({ ...prev, isValidEmail: true }));
                } else {
                  setState((prev) => ({ ...prev, isValidEmail: false }));
                }
              }
            }}
            icon={<IoPersonCircle size={22} color="#222222" />}
            isError={state.isValidEmail === false}
            className={state.isValidEmail === false ? 'mb-0' : ''}
          />
          {state.isValidEmail === false && (
            <div className="mt-2 mb-4 font-sans text-sm text-red-400">
              Invalid email address
            </div>
          )}
          <Input
            placeholder="Password"
            onChange={(text: string) => {
              setState({ ...state, password: text });
              if (
                state.isValidPassword === false ||
                state.isValidPassword === true
              ) {
                if (text === dummy.password) {
                  setState((prev) => ({ ...prev, isValidPassword: true }));
                } else {
                  setState((prev) => ({ ...prev, isValidPassword: false }));
                }
              }
            }}
            icon={<IoIosLock size={18} color="#222222" />}
            isPassword
            isError={state.isValidPassword === false}
            className={state.isValidPassword === false ? 'mb-0' : ''}
          />
          {state.isValidPassword === false && (
            <div className="mt-2 mb-4 font-sans text-sm text-red-400">
              Incorrect password
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-5">
        <button
          onClick={onSubmitHandler}
          className={`${
            email === '' || password === '' ? 'bg-[#B2C6D1]' : 'bg-primary'
          }  mb-5 w-full rounded-full py-[18px]`}
          disabled={email === '' || password === ''}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Connect
          </div>
        </button>

        <div className="flex flex-row">
          <div className="pt-2 pr-3">
            <IoShieldCheckmarkOutline size={22} color="#7B8698" />
          </div>
          <div className={`${htw.text.info} shrink px-0 !text-left`}>
            Your data belongs to you. Sophtron doesn&apos;t sell personal info,
            and will only use it with your permission.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankLoginScreen;
