import { useRouter } from 'next/router';
import React from 'react';

import { Header, Input } from '@/components';
import { getBankData, htw } from '@/utils/Helper';

const BankAuthQuestionsScreen: React.FC = () => {
  const router = useRouter();
  const { bankId } = router.query;
  const bank = getBankData(bankId);

  const [state, setState] = React.useState({
    favColor: '',
    petName: '',
  });

  const { favColor, petName } = state;

  const onSubmitHandler = () => {
    router.push({
      pathname: '/bank-auth-otp',
      query: { bankId: bank?.id },
    });
  };

  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={bank?.image} />

      <div className="flex grow flex-col items-center justify-start px-5">
        <div className={`${htw.text.title}`}>Authentication Questions</div>

        <div className="mt-5 w-full">
          <div className="mb-2 font-sans text-base leading-7 text-secondary">
            What is your favourite color?
          </div>
          <Input
            placeholder=""
            onChange={(text: string) => {
              setState({ ...state, favColor: text });
            }}
          />

          <div className="mb-2 font-sans text-base leading-7 text-secondary">
            What your pet name?
          </div>
          <Input
            placeholder=""
            onChange={(text: string) => {
              setState({ ...state, petName: text });
            }}
          />
        </div>
      </div>

      <div className="w-full px-5">
        <button
          onClick={onSubmitHandler}
          className={`${
            favColor === '' || petName === '' ? 'bg-[#B2C6D1]' : 'bg-primary'
          }  mb-5 w-full rounded-full py-[18px]`}
          disabled={favColor === '' || petName === ''}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Next
          </div>
        </button>
      </div>
    </div>
  );
};

export default BankAuthQuestionsScreen;
