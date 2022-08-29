import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';
import React from 'react';

import { htw } from '@/utils/Helper';

const SuccessScreen: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col justify-between bg-primary">
      <div className="flex grow flex-col items-center justify-center px-5">
        <Player
          autoplay
          keepLastFrame
          speed={1.5}
          src="https://derrint.sirv.com/Images/sophtron/lotties/lottie-success.json"
          className="h-64"
        />

        <div className={`${htw.text.title} text-white`}>
          Yaay! Successfully Connected
        </div>

        <div className={`${htw.text.description} text-white`}>
          Successfully connected to your bank account. We will redirect in a few
          minutes or back to homepage manually.
        </div>
      </div>

      <div className="w-full px-5">
        <button
          onClick={() => {
            router.push({
              pathname: '/',
            });
          }}
          className={'mb-5 w-full rounded-full border border-white py-[18px]'}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Back to homepage
          </div>
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
