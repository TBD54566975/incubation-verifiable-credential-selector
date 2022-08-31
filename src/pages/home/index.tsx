import { useRouter } from 'next/router';
import React from 'react';

import { htw } from '@/utils/Helper';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-screen flex-col justify-between bg-white p-5">
      <div className="absolute -top-5 left-0 w-full items-center justify-center opacity-70">
        <img
          src="https://derrint.sirv.com/Images/sophtron/bg-radial-blue.png"
          className="mx-auto mb-7 aspect-square w-full"
          alt=""
        />
      </div>

      <div className="flex grow flex-col items-center justify-center">
        <img
          src="https://derrint.sirv.com/Images/sophtron/illustration-link.png"
          className="mx-auto mb-7 h-20 w-20"
          alt=""
        />

        <h1 className={htw.text.title}>Connect Your Account</h1>

        <div className={htw.text.description}>
          Sophtron lets you securely connect your financial accounts in seconds
          without a worry and it&apos;s secured!
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={() => {
            router.push({
              pathname: '/bank-list',
            });
          }}
          className="mb-5 w-full rounded-full bg-primary py-[18px] text-center font-sans text-lg font-semibold text-white"
        >
          Connect
        </button>

        <div className={htw.text.info}>
          By selecting &ldquo;Connect&rdquo; you agree to the{' '}
          <div className="font-bold text-primary">
            Sophtron end user privacy policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
