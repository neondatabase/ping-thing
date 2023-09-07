import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from '../utils/format-number';
import EmptyState from '../components/empty-state';

const JourneyCard = ({ journey }) => {
  const {
    flag,
    country,
    city,
    diff,
    miles,
    kilometers,
    color,
    stroke,
    stages,
  } = journey;

  return (
    <div className='flex flex-col gap-8'>
      <div className={`${miles ? 'opacity-100' : 'opacity-20'}`}>
        <strong className='block capitalize text-xl'>Your Request</strong>
        <p className='text-sm'>
          Details of your request made to Neon using an{' '}
          <a
            href='https://vercel.com/docs/functions/edge-functions'
            target='_blank'
            rel='noopener'
            className='primary-link'
          >
            Edge Function
          </a>
          .
        </p>
      </div>
      <div
        className={`flex flex-col sm:flex-row gap-4 transition-[opacity] duration-500 ${
          miles ? 'opacity-100' : 'opacity-30'
        }`}
      >
        <div className='flex gap-2'>
          <div className='flex flex-col'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2.5}
              stroke='currentColor'
              className='shrink-0 w-6 h-6'
              style={{
                fill: color,
                stroke: stroke,
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            {stages.map((details, index) => {
              const { color, stroke } = details;
              return (
                <Fragment key={index}>
                  <div className='flex items-center justify-center h-full'>
                    <div className='w-[2px] h-full border border-white border-dashed' />
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    className='shrink-0 w-6 h-6'
                    style={{
                      stroke: stroke,
                      fill: color,
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </Fragment>
              );
            })}
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap gap-x-4'>
              <div className='min-w-[90px]'>
                <small className='block'>Start</small>
                <strong className='text-xs'>{city || <EmptyState />}</strong>
              </div>
              <div className=''>
                <small className='block'>Country</small>
                {country ? (
                  <div className='flex items-center gap-2'>
                    <span
                      role='img'
                      aria-label='region flag'
                      className='pt-0.5'
                    >
                      {flag}
                    </span>
                    <strong className='text-xs'>{country}</strong>
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
            {stages.map((details, index) => {
              const { stop, type, region, flag } = details;
              return (
                <div key={index} className='flex gap-4'>
                  <div className='min-w-[90px]'>
                    <small className='capitalize block'>{type}</small>
                    <strong className='capitalize text-xs'>{stop}</strong>
                  </div>
                  <div>
                    <small className='block'>Region</small>
                    <div className='flex items-center gap-2'>
                      <span
                        role='img'
                        aria-label='region flag'
                        className='pt-0.5'
                      >
                        {flag}
                      </span>
                      <strong className='text-xs'>{region}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex pt-4 px-8 sm:p-0 flex-wrap gap-6'>
          <div>
            <small className='block'>Mph</small>
            <strong className='text-xs h-4'>
              {diff ? (
                formatNumber((miles * 2) / (diff / 1000))
              ) : (
                <EmptyState />
              )}
            </strong>
          </div>
          <div>
            <small className='block'>Sec</small>
            <strong className='text-xs'>
              {diff ? (diff / 1000).toFixed(2) : <EmptyState />}
            </strong>
          </div>
          <div>
            <small className='block'>Mi</small>
            <strong className='text-xs'>
              {miles ? formatNumber(miles * 2) : <EmptyState />}
            </strong>
          </div>

          <div>
            <small className='block'>Km</small>
            <strong className='text-xs'>
              {kilometers ? formatNumber(kilometers * 2) : <EmptyState />}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

JourneyCard.proptypes = {
  /** The journey details */
  journey: PropTypes.shape({
    /** The runtime of the runtime */
    runtime: PropTypes.string,
    /** The flag of the country */
    flag: PropTypes.string.isRquired,
    /** The country of the request */
    country: PropTypes.string.isRquired,
    /** The runtime of the city */
    city: PropTypes.string.isRquired,
    /** The start_time - end_time */
    diff: PropTypes.number.isRquired,
    /** The distance in miles */
    miles: PropTypes.number.isRquired,
    /** The distance in kilometers */
    kilometers: PropTypes.number.isRquired,
    /** The colour of the current location */
    color: PropTypes.string.isRquired,
    /** The details of the stops */
    stops: PropTypes.shape({
      /** The runtime of the stop*/
      runtime: PropTypes.string.isRquired,
      /** The flag emoji */
      flag: PropTypes.string.isRquired,
      /** The runtime of the region */
      region: PropTypes.string.isRquired,
      /** The color of the stop */
      color: PropTypes.string.isRquired,
    }),
  }).isRquired,
};

export default JourneyCard;
