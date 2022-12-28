import { useRouter } from 'next/router';
import React from 'react';

import { useAppSelector } from '@/client/app/hooks';
import { Header } from '@/components';
import { htw } from '@/utils/Helper';

const BankErrorScreen: React.FC = () => {
  const router = useRouter();
  const { selected_institution } = useAppSelector((state) => state.instituion);
  const { error } = useAppSelector((state) => state.general);
  console.log(error);
  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={selected_institution?.logo_url!} />

      <div className="flex grow flex-col items-center justify-center px-5">
        <img
          src="https://derrint.sirv.com/Images/sophtron/illustration-bank-error.png"
          className="mx-auto mb-10 aspect-auto w-[70%]"
          alt=""
        />
        <div className={`${htw.text.title}`}>Something went wrong</div>
        <div className={`${htw.text.description}`}>
          {error?.code ||
            error?.message ||
            `${error}` ||
            'There was an error while submitting the form. Please try again later.'}
        </div>
      </div>

      <div className="w-full px-5">
        <button
          onClick={() => {
            router.push({
              pathname: '/bank-list',
            });
          }}
          className={'mb-5 w-full rounded-full bg-primary py-[18px]'}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Try Another Bank
          </div>
        </button>
      </div>
    </div>
  );
};

export default BankErrorScreen;
