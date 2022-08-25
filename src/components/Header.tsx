import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Props {
  image?: string;
  isBackButtonVisible?: boolean;
}

const Header: React.FC<Props> = ({ isBackButtonVisible = true, image }) => {
  return (
    <div className="flex flex-row items-center justify-between p-5">
      {isBackButtonVisible ? (
        <button onClick={() => console.log('balbala')} className="w-2/12">
          <AiOutlineArrowLeft size={20} color="#222222" />
        </button>
      ) : (
        <div className="w-2/12" />
      )}

      <div className="w-8/12 items-center">
        <img src={image} className="h-14 w-full" alt="Icon" />
      </div>

      <div className="w-2/12" />
    </div>
  );
};

export default Header;
