/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React from 'react';
import { FiPhone } from 'react-icons/fi';

// import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Header } from '@/components';
import { getBankData, htw } from '@/utils/Helper';

const BankAuthOTPScreen: React.FC = () => {
  const router = useRouter();
  const { bankId } = router.query;
  const bank = getBankData(bankId);

  const defaultText = {
    info: 'We will send OTP code to verify your identity.',
    button: 'Send OTP Number',
  };

  const [state, setState] = React.useState({
    phoneNumber: '+1 **** *** 2134',
    isSent: false,
    isSubmitted: false,
    textInfo: defaultText.info,
    textButton: defaultText.button,
    otp: '',
  });

  const { phoneNumber, isSent, isSubmitted, textInfo, textButton, otp } = state;

  const onSubmitHandler = () => {
    if (!isSent) {
      setState({ ...state, isSent: true });
    } else if (isSent && !isSubmitted) {
      router.push({
        pathname: '/loading',
        query: { bankId: bank?.id },
      });
    }
  };

  React.useEffect(() => {
    if (isSent) {
      setState({
        ...state,
        textInfo: 'Enter OTP that has been sent to',
        textButton: 'Submit',
      });
    } else {
      setState({
        ...state,
        textInfo: defaultText.info,
        textButton: defaultText.button,
      });
    }
  }, [isSent]);

  return (
    <div className="flex h-screen  flex-col justify-between bg-white">
      <Header image={bank?.image} />

      <div className="flex grow flex-col items-center justify-start px-5">
        <div className={`${htw.text.title} font-normal`}>OTP Verification</div>

        <img
          src="https://derrint.sirv.com/Images/sophtron/illustration-otp.png"
          className="mx-auto aspect-square w-[70%]"
          alt=""
        />

        <div className={`${htw.text.description}`}>{textInfo}</div>
        {isSent && (
          <div className={`${htw.text.description} font-bold text-black`}>
            {phoneNumber}
          </div>
        )}

        {!isSent ? (
          <div className="mt-5 flex flex-row items-center">
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
                {phoneNumber}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-row items-center">
            {/* <OTPInputView
              style={{ width: '80%', height: 60 }}
              pinCount={4}
              code={otp}
              onCodeChanged={(text: string) => {
                setState({ ...state, otp: text })
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.borderStyleBase}
              codeInputHighlightStyle={styles.borderStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`)
              }}
            /> */}
          </div>
        )}
      </div>

      <div className="mb-2 w-full px-5">
        <button
          onClick={onSubmitHandler}
          disabled={isSent && otp.length !== 4}
          className={`${
            isSent && otp.length !== 4 ? 'bg-[#B2C6D1]' : 'bg-primary'
          }  mb-5 w-full rounded-full py-[18px]`}
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            {textButton}
          </div>
        </button>

        <div className={htw.text.info}>
          Don’t get the code?{' '}
          <div className="font-bold text-primary">Please wait (0:30)</div>
        </div>
      </div>
    </div>
  );
};

// const styles = StyleSheet.create({
//   borderStyleBase: {
//     width: 60,
//     height: 60,
//     borderColor: '#BBBBBB',
//     backgroundColor: '#FAFAFA',
//     color: '#000000',
//     fontFamily: 'SpaceMono-Bold',
//     fontSize: 24,
//     borderRadius: 8,
//     borderWidth: 0.5,
//   },

//   borderStyleHighLighted: {
//     borderColor: '#0C95DF',
//   },

//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//   },

//   underlineStyleHighLighted: {
//     borderColor: '#03DAC6',
//   },
// });

export default BankAuthOTPScreen;
