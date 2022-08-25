import Link from 'next/link';
import React from 'react';

import { htw } from '@/utils/Helper';

const HomeScreen: React.FC = () => {
  return (
    <div className="flex h-full justify-between bg-white p-5">
      <div className="absolute -top-5 left-0 w-full items-center justify-center opacity-70">
        <img
          src="https://derrint.sirv.com/Images/sophtron/bg-radial-blue.png"
          className="mb-7 aspect-square w-[100%]"
          alt=""
        />
      </div>

      <div className="grow items-center justify-center">
        <img
          src="https://derrint.sirv.com/Images/sophtron/illustration-link.png"
          className="mb-7 h-20 w-20"
          alt=""
        />

        <div className={htw.text.title}>Connect Your Account</div>

        <div className={htw.text.description}>
          Sophtron lets you securely connect your financial accounts in seconds
          without a worry and it&apos;s secured!
        </div>
      </div>

      <div className="w-full">
        <Link href="/bank-list">
          <a className="mb-5 w-full rounded-full bg-primary py-[18px]">
            <div className="text-center font-sans text-lg font-semibold text-white">
              Connect
            </div>
          </a>
        </Link>

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
