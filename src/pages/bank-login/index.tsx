import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { IoIosLock } from 'react-icons/io';
import { IoPersonCircle, IoShieldCheckmarkOutline } from 'react-icons/io5';
import type { Credential } from 'shared/contract';

import { useAppDispatch, useAppSelector } from '@/client/app/hooks';
import {
  loginAsync,
  selectInstitutionAsync,
} from '@/client/features/institutions';
import { Header, Input } from '@/components';
import { htw } from '@/utils/Helper';

const BankLoginScreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const credentials: Credential[] =
    useAppSelector((state) => state.instituion.credentials) || [];
  const { selected_institution } = useAppSelector((state) => state.instituion!);

  useEffect(() => {
    const { bankId } = router.query;
    if (bankId && credentials.length === 0) {
      dispatch(selectInstitutionAsync(bankId as string));
    }
  }, [router.query]);

  const [state, setState] = React.useState({
    values: [] as string[],
  });

  const isValid =
    state.values.length === credentials.length &&
    state.values.reduce((valid, cur) => valid && cur !== '', true);

  const onSubmitHandler = () => {
    if (isValid) {
      dispatch(
        loginAsync(
          credentials.map((c, index) => ({
            ...c,
            value: state.values[index],
          }))
        )
      );
    }
  };
  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={selected_institution?.logo_url!} />

      <div className="flex grow flex-col items-center justify-start px-5">
        <div className={`${htw.text.title} font-normal`}>
          Login to{' '}
          <span className="font-bold">{selected_institution?.name}</span>
          <br />
          Enter your credentials
        </div>

        <div className={htw.text.description}>
          By providing your credentials you are asking Sophtron to retrieve your
          financial data and agree to our terms of service.
        </div>

        <div className="mt-12 w-full">
          {credentials.map((c, index) => (
            <Input
              key={index}
              placeholder={c.label}
              onChange={(text: string) => {
                const vs = state.values;
                vs[index] = text;
                setState({ values: [...vs] });
              }}
              isPassword={c.label!.toLocaleLowerCase() === 'password'}
              icon={
                c.label!.toLocaleLowerCase() === 'password' ? (
                  <IoIosLock size={18} color="#222222" />
                ) : (
                  <IoPersonCircle size={22} color="#222222" />
                )
              }
              isError={state.values[index] === ''}
              className={state.values[index] === '' ? 'mb-0' : ''}
            />
          ))}

          {/* {state.isValidEmail === false && (
            <div className="mt-2 mb-4 font-sans text-sm text-red-400">
              Invalid email address
            </div>
          )} 
          {state.isValidPassword === false && (
            <div className="mt-2 mb-4 font-sans text-sm text-red-400">
              Incorrect password
            </div>
          )} */}
        </div>
      </div>

      <div className="w-full px-5">
        <button
          onClick={onSubmitHandler}
          disabled={!isValid}
          className={`${
            isValid ? 'bg-primary' : 'bg-[#B2C6D1]'
          } mb-5 w-full rounded-full py-[18px]`}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Connect
          </div>
        </button>

        <div className="mb-2 flex flex-row">
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
