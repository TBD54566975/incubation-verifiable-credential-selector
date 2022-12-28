import React from 'react';
import { MdCheck } from 'react-icons/md';

import { htw } from '@/utils/Helper';

import type { Props } from './props';

const AuthImageOption: React.FC<Props> = ({ challenge, onValueChange }) => {
  const [state, setState] = React.useState({
    selectedImages: [] as any[],
  });
  return (
    <div className="flex grow flex-col items-center justify-start px-5">
      <div className={`${htw.text.title}`}>Enter Captcha</div>
      <div className="w-full border-2 border-[#D6D6D6] p-3">
        <div className="mb-3 bg-[#468EE5] px-7 py-9">
          <div className="text-lg font-medium text-white">
            {challenge.question}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(challenge.data as any[]).map((item: any, index) => {
            return (
              <button
                key={item.key || index}
                className={`relative aspect-square w-full ${
                  state.selectedImages.includes(item.key)
                    ? 'after:absolute after:top-0 after:left-0 after:h-full after:w-full after:border-8 after:border-white'
                    : ''
                }`}
                onClick={() => {
                  let si = [...state.selectedImages];

                  if (si.length > 0 && si.includes(item.key)) {
                    si = si.filter((x: any) => x !== item.key);
                  } else {
                    si = [...si, item.key];
                  }
                  setState({
                    ...state,
                    selectedImages: si,
                  });
                  onValueChange(si.join(','));
                }}
              >
                <img
                  src={
                    item.value.startsWith('data:image')
                      ? item.value
                      : `data:image/png;base64,${item.value}`
                  }
                  className="relative h-full w-full"
                  alt=""
                />
                {state.selectedImages.includes(item.key) && (
                  <div className="absolute top-1 left-1 z-10 rounded-full bg-[#468EE5] p-1">
                    <MdCheck name="check" size={20} color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthImageOption;
