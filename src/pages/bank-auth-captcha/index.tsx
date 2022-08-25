import { useRouter } from 'next/router';
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

import { Header, Input } from '@/components';
import captchaImages from '@/data/captcha-images';
import { getBankData, htw } from '@/utils/Helper';

const BankAuthCaptchaScreen: React.FC = () => {
  const router = useRouter();
  const { bankId } = router.query;
  const bank = getBankData(bankId);

  const [state, setState] = React.useState({
    captcha: {
      type: bank?.captchaType,
      value: '',
      selectedImages: [] as any,
    },
  });

  const { captcha } = state;

  const onSubmitHandler = () => {
    if (captcha.type === 'image') {
      router.push({
        pathname: '/bank-auth-otp',
        query: { bankId: bank?.id },
      });
    } else {
      router.push({
        pathname: '/bank-auth-questions',
        query: { bankId: bank?.id },
      });
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      <Header image={bank?.image} />

      {captcha.type === 'image' ? (
        <div className="flex grow flex-col items-center justify-start px-5">
          <div className={`${htw.text.title}`}>Enter Captcha</div>
          <div className="w-full border-2 border-[#D6D6D6] p-3">
            <div className="mb-3 bg-[#468EE5] px-7 py-9">
              <div className="text-lg font-medium text-white">
                Select all images with a bicycle.
              </div>
            </div>

            <div className="grid">
              {captchaImages.map((item: any) => {
                return (
                  <button
                    key={item.id}
                    className={`aspect-square w-1/3 ${
                      captcha.selectedImages.includes(item.id) ? 'p-3' : ''
                    }`}
                    onClick={() => {
                      let si = [...captcha.selectedImages];

                      if (si.length > 0 && si.includes(item.id)) {
                        si = si.filter((x: any) => x !== item.id);
                      } else {
                        si = [...si, item.id];
                      }
                      setState({
                        ...state,
                        captcha: { ...captcha, selectedImages: si },
                      });
                    }}
                  >
                    <img
                      src={item.image}
                      className="relative h-full w-full"
                      alt=""
                    />
                    {captcha.selectedImages.includes(item.id) && (
                      <div className="absolute top-1 left-1 rounded-full bg-[#468EE5] p-1">
                        <MdCheckCircle name="check" size={20} color="white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex grow flex-col items-center justify-start px-5">
          <div className={`${htw.text.title} font-normal`}>Enter Captcha</div>

          <div className={htw.text.description}>
            Please enter the code you see in picture below
          </div>

          <div className="mt-5 w-full bg-[#F5F5F5] p-8">
            <img
              src="https://derrint.sirv.com/Images/sophtron/dummies/captcha-text.png"
              className="h-20 w-full"
              alt=""
            />
          </div>

          <div className="mt-5 w-full">
            <Input
              placeholder=""
              onChange={(text: string) => {
                setState({ ...state, captcha: { ...captcha, value: text } });
              }}
            />
          </div>
        </div>
      )}

      <div className="w-full px-5">
        <button
          onClick={onSubmitHandler}
          className={`${
            (captcha.type === 'text' && captcha.value === '') ||
            (captcha.type === 'image' && captcha.selectedImages.length === 0)
              ? 'bg-[#B2C6D1]'
              : 'bg-primary'
          }  mb-5 w-full rounded-full py-[18px]`}
          disabled={
            (captcha.type === 'text' && captcha.value === '') ||
            (captcha.type === 'image' && captcha.selectedImages.length === 0)
          }
        >
          <div className="text-center font-sans text-lg font-semibold text-white">
            Next
          </div>
        </button>
      </div>
    </div>
  );
};

export default BankAuthCaptchaScreen;
