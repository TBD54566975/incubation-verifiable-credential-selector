import React from 'react';

import { Input } from '@/components';
import { htw } from '@/utils/Helper';

import type { Props } from './props';

const AuthQuestions: React.FC<Props> = ({ challenge, onValueChange }) => {
  const arr = challenge.data as any[];
  return (
    <div className="flex grow flex-col items-center justify-start px-5">
      <div className={`${htw.text.title}`}>Authentication Questions</div>
      {arr.map((item, idx) => (
        <div key={idx} className="mt-5 w-full">
          <div className="mb-2 font-sans text-base leading-7 text-secondary">
            {item.value}
          </div>
          <Input placeholder="" onChange={onValueChange} />
        </div>
      ))}
    </div>
  );
};

export default AuthQuestions;
