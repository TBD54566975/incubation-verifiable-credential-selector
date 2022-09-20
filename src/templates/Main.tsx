import type { ReactNode } from 'react';

import { useAppSelector } from '@/client/app/hooks';
import Error from '@/components/error';
import Loading from '@/components/loading';
import { Meta } from '@/layouts/Meta';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { processing, error } = useAppSelector((state) => state.general);
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <Meta
        title="Tbdex Widget"
        description="Effortless Next Generation Data Aggregation"
      />

      <div className="mx-auto max-w-[375px]">
        <div className="content">
          {error ? <Error /> : processing ? <Loading /> : props.children}
        </div>
      </div>
    </div>
  );
};

export { Main };
