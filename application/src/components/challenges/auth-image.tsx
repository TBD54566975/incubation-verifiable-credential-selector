import React from 'react';

import { Input } from '@/components';
import { htw } from '@/utils/Helper';

import type { Props } from './props';

const AuthImage: React.FC<Props> = ({ challenge, onValueChange }) => {
  return (
    <div className="flex grow flex-col items-center justify-start px-5">
      <div className={`${htw.text.title} font-normal`}>Enter Captcha</div>
      <div className={htw.text.description}>{challenge.question}</div>

      <div className="mt-5 w-full bg-[#F5F5F5] p-8">
        <img
          src={
            (challenge.data! as string).startsWith('data:image')
              ? (challenge.data as string)
              : `data:image/png;base64,${challenge.data}`
          }
          className="h-20 w-full"
          alt=""
        />
      </div>

      <div className="mt-5 w-full">
        <Input placeholder="" onChange={onValueChange} />
      </div>
    </div>
  );
};

export default AuthImage;
