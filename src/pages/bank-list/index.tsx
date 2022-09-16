/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import allBanks from '@/data/banks';
import { AiOutlineSearch } from 'react-icons/ai';
import type { Institution } from 'shared/contract';

import { useAppDispatch, useAppSelector } from '@/client/app/hooks';
import {
  initAsync,
  loadInstitutionsAsync,
  selectInstitutionAsync,
} from '@/client/features/institutions';
import { Header, Input } from '@/components';

const BankListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { request, logged_in, institution_list, query } = useAppSelector(
    (state) => state.instituion
  );
  const { institutions } = institution_list || { institutions: [] };
  const router = useRouter();
  useEffect(() => {
    if ((!request || logged_in) && router.isReady) {
      dispatch(initAsync({ query: router.query }));
    }
    if (request && institutions.length === 0) {
      dispatch(loadInstitutionsAsync());
    }
  }, [request, router.query, router.isReady]);

  return (
    <div className="h-full justify-between bg-white">
      <Header image="https://derrint.sirv.com/Images/sophtron/logos/Sophtron.png" />

      <div className="flex-1 grow p-5 pb-10">
        <div className="mb-3 text-lg font-semibold text-black">
          Select Bank to Connect
        </div>

        <Input
          placeholder="Search Bank"
          onChange={(text: string) => {
            dispatch(loadInstitutionsAsync(text));
          }}
          value={query}
          icon={<AiOutlineSearch size={20} color="#222222" />}
        />

        {(institutions || []).map((bank: Institution) => (
          <button
            key={bank.id}
            className={`flex w-full flex-row items-center border-b border-[#E7E7E7] p-4`}
            onClick={() => {
              dispatch(
                selectInstitutionAsync({ instituion: bank, navigate: true })
              );
            }}
          >
            <div className="w-4/12">
              <img
                src={bank.logo_url!}
                className="h-10 w-auto object-contain"
                alt=""
              />
            </div>
            <div className="w-8/12 pl-5">
              <div className="text-left font-sans text-base text-tertiary">
                {bank.name}
              </div>
            </div>
          </button>
        ))}
        {institutions.length === 0 && (
          <div className="my-16 items-center">
            <img
              src="https://derrint.sirv.com/Images/sophtron/illustration-not-found.png"
              className="my-5 h-48 w-full object-contain"
              alt=""
            />
            <div className="my-4 text-center font-sans text-lg font-bold">
              Bank/Institution Not Found
            </div>
            <div className="text-center font-sans text-base leading-9 text-secondary">
              Currently we don&apos;t have that institution.{'\n'}Please try
              with another keyword.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankListScreen;
