import React, { Fragment } from 'react';
import { useQuery } from 'react-query';

import { formatNumber } from '../utils/format-number';
import { formatDate } from '../utils/format-date';

import LoadingDots from '../components/loading-dots';

const Page = () => {
  const query = useQuery({
    queryKey: ['read-query'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REWRITE_PREFIX}/api/read`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error('!response.ok');
        }

        const json = await response.json();

        return json;
      } catch (error) {
        throw new Error('Error response');
      }
    },
  });

  return (
    <div className='relative py-16 px-0 mx-auto max-w-6xl h-full min-h-[calc(100vh - 10px)]'>
      <section className='flex flex-col gap-32 px-4'>
        {query.isLoading ? (
          <div className='flex items-center justify-center'>
            <LoadingDots className='bg-brand-primary' />
          </div>
        ) : (
          <div className='relative'>
            <div className='py-8'>
              <h1 className=''>All Pings</h1>
              <p className=''>{`${query.data.response.length} Pings since September 19, 2023.`}</p>
            </div>
            <div className='relative border border-brand-border rounded-lg overflow-auto'>
              <div className='bg-brand-background h-[65vh] overflow-auto text-sm'>
                <table className='relative table-auto w-full m-0'>
                  <thead className='border-b border-b-brand-border text-base'>
                    <tr>
                      <th className='p-2 md:p-3 text-right'>Id</th>
                      <th className='p-2 md:p-3'>Date</th>
                      <th className='p-2 md:p-3'>Flag</th>
                      <th className='p-2 md:p-3'>Country</th>
                      <th className='p-2 md:p-3'>City</th>
                      <th className='p-2 md:p-3'>Runtime</th>
                      <th className='p-2 md:p-3 text-right'>Response</th>
                      <th className='p-2 md:p-3 text-right'>Mi &#189;</th>
                      <th className='p-2 md:p-3 text-right'>Km &#189;</th>
                      <th className='p-2 md:p-3 text-right'>Mi</th>
                      <th className='p-2 md:p-3 text-right'>Km</th>
                    </tr>
                  </thead>
                  <tbody>
                    {query.data.response.map((d, i) => {
                      const {
                        id,
                        date,
                        flag,
                        country,
                        city,
                        runtime,
                        start_time,
                        end_time,
                        miles,
                        kilometers,
                      } = d;

                      const diff = end_time - start_time;

                      return (
                        <tr
                          key={i}
                          className='text-center border-b border-b-brand-border/30 odd:bg-brand-border/30'
                        >
                          <td className='p-2 md:p-3 text-right'>
                            {query.data.response.length - i}
                          </td>
                          <td className='p-2 md:p-3 whitespace-nowrap'>
                            {formatDate(date)}
                          </td>
                          <td className='p-2 md:p-3 text-xl'>{flag}</td>
                          <td className='p-2 md:p-3'>{country}</td>
                          <td className='p-2 md:p-3'>{city}</td>
                          <td className='p-2 md:p-3 text-left'>{runtime}</td>
                          <td className='p-2 md:p-3 text-right whitespace-nowrap'>{`${formatNumber(
                            diff / 1000
                          )}s / ${formatNumber(diff)}ms`}</td>
                          <td className='p-2 md:p-3 text-right'>
                            {formatNumber(miles)}
                          </td>
                          <td className='p-2 md:p-3 text-right'>
                            {formatNumber(kilometers)}
                          </td>
                          <td className='p-2 md:p-3 text-right'>
                            {formatNumber(miles * 2)}
                          </td>
                          <td className='p-2 md:p-3 text-right'>
                            {formatNumber(kilometers * 2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
