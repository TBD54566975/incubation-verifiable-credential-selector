import type { ReactNode } from 'react';

import { useAppSelector } from '@/client/app/hooks';
import Loading from '@/components/loading';
import { Meta } from '@/layouts/Meta';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { processing } = useAppSelector((state) => state.general);
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <Meta
        title="Sophtron Widget"
        description="Effortless Next Generation Data Aggregation"
      />

      <div className="mx-auto max-w-[375px]">
        <div className="content">
          {processing ? <Loading /> : props.children}
        </div>
      </div>
    </div>
  );
};

export { Main };
