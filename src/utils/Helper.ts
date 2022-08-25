/* eslint-disable no-useless-escape */
export const htw = {
  text: {
    title: 'font-bold font-sans text-xl leading-8 text-center mb-3 text-black',
    description: 'text-secondary font-sans text-sm leading-7 text-center px-5',
    info: 'text-secondary font-sans text-xs leading-7 text-center px-5',
  },
};

export const isValidEmail = (str: string) => {
  const pattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return !!pattern.test(str);
};
