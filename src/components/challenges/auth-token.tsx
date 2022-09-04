import React from 'react';

import { htw } from '@/utils/Helper';

import type { Props } from './props';

const AuthToken: React.FC<Props> = ({ challenge }) => {
  return (
    <div className="flex grow flex-col items-center justify-start px-5">
      <div className={`${htw.text.title}`}>OTP Verification</div>
      <img
        src="https://derrint.sirv.com/Images/sophtron/illustration-otp.png"
        className="mx-auto aspect-auto w-[70%]"
        alt=""
      />
      <div className={`${htw.text.description}`}>{challenge.question}</div>
      <div className={`${htw.text.description} font-bold text-black`}>
        {challenge.data as string}
      </div>
    </div>
  );
};

export default AuthToken;
