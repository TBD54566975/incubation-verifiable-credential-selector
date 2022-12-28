/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

import { htw } from '@/utils/Helper';

import type { Props } from './props';

const AuthOption: React.FC<Props> = ({ challenge, onValueChange }) => {
  const [state, setState] = React.useState({
    selected: '',
  });
  const onSelect = (text: string) => {
    setState({ selected: text });
    onValueChange(text);
  };
  return (
    <div className="flex grow flex-col items-center justify-start px-5">
      <div className={`${htw.text.title}`}>{challenge.question}</div>
      <div className="w-full">
        {(challenge.data as any[]).map((pn, idx) => {
          const key = pn.id || pn.value;
          const isChecked = state.selected === key;
          const color = isChecked ? '#71D14E' : '#FAFAFA';
          const borderColor = isChecked
            ? 'border-[#71D14E]'
            : 'border-[#BBBBBB]';
          return (
            <button
              key={idx}
              className="mt-5 flex w-full flex-row items-center justify-between border-b pb-5"
              onClick={() => onSelect(key)}
            >
              <div className="flex flex-row items-center">
                <div className="aspect-square w-10 items-center justify-center rounded-full bg-primary/60 p-2">
                  <FiPhone size={22} color="white" />
                </div>
                <div className="ml-3">
                  <div
                    className={
                      'mb-1 px-0 text-left font-sans text-sm text-secondary'
                    }
                  >
                    Phone Number
                  </div>
                  <div className={'shrink px-0 font-sans text-base font-bold'}>
                    {pn.value}
                  </div>
                </div>
              </div>
              <div
                className={`rounded-full border ${borderColor} bg-[#FAFAFA] p-[2px]`}
              >
                <RiCheckboxBlankCircleFill
                  name="check"
                  size={20}
                  color={color}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default AuthOption;
