/* eslint-disable react-hooks/exhaustive-deps */
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';
import React from 'react';

import { Header } from '@/components';
import { getBankData, htw } from '@/utils/Helper';

const LoadingScreen: React.FC = () => {
  const router = useRouter();
  const { bankId } = router.query;
  const bank = getBankData(bankId);

  React.useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: '/success',
        query: { bankId: bank?.id },
      });
    }, 5000);

    return () => {};
  }, []);

  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={bank?.image} isBackButtonVisible={false} />

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
        <div className={`${htw.text.info} text-primary`}>
          Verifying OTP Code ...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
