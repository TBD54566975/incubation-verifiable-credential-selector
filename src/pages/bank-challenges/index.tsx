import React from 'react';
import { type Challenge, ChallengeType } from 'shared/contract';

import { useAppDispatch, useAppSelector } from '@/client/app/hooks';
import { answerChallengeAsync, push } from '@/client/features/institutions';
import { Header } from '@/components';
import AuthImage from '@/components/challenges/auth-image';
import AuthImageOption from '@/components/challenges/auth-image-option';
import AuthOption from '@/components/challenges/auth-option';
import AuthQuestions from '@/components/challenges/auth-questions';
import AuthToken from '@/components/challenges/auth-token';

const BankChallengesScreen: React.FC = () => {
  const challenges: Challenge[] =
    useAppSelector((state) => state.instituion.challenges) || [];
  const { selected_institution } = useAppSelector((state) => state.instituion!);
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState({
    value: '',
  });
  const challenge = challenges?.[0];
  React.useEffect(() => {
    if (!challenge) {
      dispatch(
        push({
          pathname: '/home',
        })
      );
    }
  }, []);
  let C = AuthImage;
  switch (challenge?.type) {
    case ChallengeType.QUESTION:
      C = AuthQuestions;
      break;
    case ChallengeType.OPTIONS:
      C = AuthOption;
      break;
    case ChallengeType.IMAGE_OPTIONS:
      C = AuthImageOption;
      break;
    case ChallengeType.IMAGE:
      C = AuthImage;
      break;
    case ChallengeType.TOKEN:
      C = AuthToken;
      break;
    default:
      return <div></div>;
  }
  const onSubmitHandler = () => {
    if (state.value) {
      dispatch(
        answerChallengeAsync([{ ...challenge!, response: state.value }])
      );
    }
  };
  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={selected_institution?.logo_url!} />
      <div className="flex grow flex-col items-center justify-start px-5">
        <C
          onValueChange={(v: string) => setState({ value: v })}
          challenge={challenge!}
        ></C>
      </div>
      <div className="w-full px-5">
        <button
          onClick={onSubmitHandler}
          className={`${
            state.value === '' ? 'bg-[#B2C6D1]' : 'bg-primary'
          }  mb-5 w-full rounded-full py-[18px]`}
          disabled={state.value === ''}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Next
          </div>
        </button>
      </div>
    </div>
  );
};

export default BankChallengesScreen;
