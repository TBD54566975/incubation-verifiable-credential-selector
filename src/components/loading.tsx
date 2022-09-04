/* eslint-disable react-hooks/exhaustive-deps */
import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

import { useAppSelector } from '@/client/app/hooks';
import { Header } from '@/components';
import { htw } from '@/utils/Helper';

const LoadingScreen: React.FC = () => {
  const { selected_institution } = useAppSelector((state) => state.instituion);
  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header
        image={selected_institution?.logo_url!}
        isBackButtonVisible={false}
      />

      <div className="flex grow flex-col items-center justify-center px-5">
        <Player
          autoplay
          loop
          speed={1.5}
          src="https://derrint.sirv.com/Images/sophtron/lotties/lf20_qgbvjtav.json"
          className="h-14"
        />
      </div>

      <div className="mb-2 w-full px-5">
        <div className={`${htw.text.info} text-primary`}>Connecting ...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
