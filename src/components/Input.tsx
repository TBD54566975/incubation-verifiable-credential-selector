/* eslint-disable no-nested-ternary */
import React from 'react';

interface Props {
  placeholder?: string;
  onChange: any;
  icon?: any;
  isPassword?: boolean;
  isError?: boolean;
  className?: string;
  value?: string;
}

const Input: React.FC<Props> = ({
  placeholder,
  onChange,
  icon,
  isPassword,
  isError,
  className,
  value,
}) => {
  const [state, setState] = React.useState({
    isFocusOnTextInput: false,
  });

  const { isFocusOnTextInput } = state;

  const inputRef: any = React.createRef();
  const focusText = () => {
    inputRef.current.focus();
  };

  return (
    <button
      className={`${
        isError
          ? 'border-[#F15652] bg-[#F156520D]'
          : isFocusOnTextInput
          ? 'border-[#0C95DF] bg-[#F3FBFF]'
          : 'border-[#BBBBBB] bg-[#FAFAFA]'
      } mb-5 flex w-full flex-row items-center rounded-xl border py-4 px-5 ${className} `}
      onClick={() => focusText()}
    >
      {icon ? <div className={`mr-4 w-5 items-center`}>{icon}</div> : null}
      <input
        type={isPassword ? 'password' : 'text'}
        className="w-full bg-transparent font-sans text-base leading-5 text-black placeholder:text-[#01293B80] focus:outline-none"
        placeholder={placeholder || ''}
        onChange={(e: any) => onChange(e.target.value)}
        autoCapitalize={'none'}
        autoComplete={'off'}
        onFocus={() => {
          setState({ ...state, isFocusOnTextInput: true });
        }}
        onBlur={() => {
          setState({ ...state, isFocusOnTextInput: false });
        }}
        ref={inputRef}
        value={value}
      />
    </button>
  );
};

export default Input;
