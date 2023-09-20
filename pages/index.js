import React, { memo, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useMutation } from 'react-query';

import {
  EDGE,
  POINT_RADIUS_SM,
  POINT_ALTITUDE,
  userPoint,
  proxyPoint,
  neonPoint,
  neonRing,
  serverlessDriverString,
} from '../const';

import { getEdgeDistance } from '../utils/get-edge-distance';
import { sendGtagEvent } from '../utils/send-gtag-event';

import JourneyCard from '../components/journey-card';
import LoadingDots from '../components/loading-dots';
import PlayPauseIcon from '../components/play-pause-icon';
import CodeHighlight from '../components/code-highlight';
import ButtonEffect from '../components/button-effect';

const ThreeGlobe = dynamic(() => import('../components/three-globe'), {
  ssr: false,
  loading: () => <LoadingDots className='bg-brand-primary' />,
});

const defaultDetails = {
  user: {
    ...userPoint,
    runtime: EDGE,
    city: null,
    diff: null,
    miles: null,
    kilometers: null,
    stages: [proxyPoint, neonPoint],
  },
  points: [neonPoint],
  arcs: [],
  rings: [neonRing],
};

const Page = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [details, setDetails] = useState(defaultDetails);

  const mutation = useMutation({
    mutationFn: async () => {
      setDetails(defaultDetails);
      const date = new Date();

      const start_time = performance.now();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REWRITE_PREFIX}/api/create-edge`,
        {
          method: 'POST',
          body: JSON.stringify({ date: date }),
        }
      );

      if (!response.ok) {
        throw new Error('!response.ok');
      }

      const json = await response.json();

      const end_time = performance.now();

      const userCoordinates = { latitude: json.lat, longitude: json.lng };

      const meters = getEdgeDistance(userCoordinates, {
        latitude: neonPoint.lat,
        longitude: neonPoint.lng,
      });

      const miles = meters * 0.000621371192;
      const kilometers = meters / 1000;
      const diff = end_time - start_time;

      const user = {
        id: json.id,
        stop: userPoint.stop,
        flag: json.flag,
        country: json.country,
        city: json.city,
        runtime: EDGE,
        lat: json.lat,
        lng: json.lng,
        start_time: start_time,
        end_time: end_time,
        diff: diff,
        miles: miles,
        kilometers: kilometers,
      };

      setDetails((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          ...user,
        },
        points: [
          ...prevState.points,
          {
            ...user,
            color: userPoint.color,
            altitude: POINT_ALTITUDE,
            radius: POINT_RADIUS_SM,
          },
        ],
        arcs: [
          {
            runtime: user.runtime,
            startLat: user.lat,
            startLng: user.lng,
            endLat: neonPoint.lat,
            endLng: neonPoint.lng,
            color: [userPoint.color, neonPoint.color],
            stroke: 2,
            dash: 0.1,
            altitude: 0.5,
          },
        ],
      }));

      setIsPlaying(true);
      return user;
    },
    onSuccess: async (data) => {
      const { id, start_time, end_time, miles, kilometers } = data;

      await fetch(
        `${process.env.NEXT_PUBLIC_REWRITE_PREFIX}/api/update-entry`,
        {
          method: 'POST',
          body: JSON.stringify({ id, start_time, end_time, miles, kilometers }),
        }
      );
    },
    onError: async () => {
      throw new Error('Error response');
    },
  });

  const handleIsPlayingToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='relative bg-brand-background pb-16 xl:pb-24 mx-auto max-w-8xl'>
      <div className='relative grid xl:grid-cols-2 pt-8 pb-16 xl:py-4 mx-auto max-w-6xl'>
        <section className='flex flex-col'>
          <div className='flex items-center w-full h-full'>
            <div className='flex flex-col w-full gap-8 pt-28 pb-20 xl:p-32 xl:pl-0'>
              <div className='flex flex-col gap-4 xl:gap-6'>
                <span className='self-center xl:self-start border border-brand-primary/20 text-brand-primary text-sm font-semibold rounded-full py-1 px-4 bg-gradient-to-b from-transparent to-brand-primary/10'>
                  Getting Started
                </span>
                <h1 className='text-5xl sm:text-7xl text-center xl:text-left'>
                  Ping Thing
                </h1>
                <div className='flex flex-col gap-3 mx-auto xl:mx-none max-w-xl xl:max-w-none text-center xl:text-left'>
                  <p className='px-8 xl:px-0 text-base sm:text-xl'>
                    Ping a Neon Serverless Postgres database using a Vercel Edge
                    Function to see the journey your request makes.
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center xl:justify-start gap-4'>
                <ButtonEffect disabled={details.user.city ? true : false}>
                  <button
                    onClick={mutation.mutate}
                    className='relative flex items-center justify-center bg-brand-primary text-brand-background font-semibold text-lg rounded-full border border-transparent enabled:hover:bg-brand-primary-light disabled:cursor-not-allowed disabled:bg-brand-background disabled:text-zinc-700 disabled:border-brand-border transition-colors duration-200 min-h-[52px] min-w-[150px] z-10'
                    disabled={mutation.isLoading || details.user.city}
                  >
                    {mutation.isLoading ? (
                      <LoadingDots className='bg-brand-primary' />
                    ) : (
                      'Ping'
                    )}
                  </button>
                </ButtonEffect>
                {mutation.error ? (
                  <blockquote className='flex flex-col grow m-0 border-l-brand-tertiary bg-brand-tertiary/10 pt-2 pb-3 pr-4 rounded'>
                    <strong className='text-brand-tertiary'>Error</strong>
                    <small>Request failed. Please Ping again.</small>
                  </blockquote>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className='relative flex items-center justify-center overflow-hidden h-[400px] md:h-[550px] xl:h-[700px]'>
          <div className='absolute bottom-0 right-0 w-auto px-8 xl:p-4 -mr-1 z-10'>
            <button
              onClick={handleIsPlayingToggle}
              className='not-prose flex rounded-full transition-colors duration-300 text-brand-primary hover:text-brand-primary-light'
            >
              <PlayPauseIcon
                isPlaying={isPlaying}
                className='w-10 h-10  xl:h-12 xl:w-12'
              />
            </button>
          </div>
          <ThreeGlobe isPlaying={isPlaying} data={details} />
        </section>
      </div>

      <div className='relative flex flex-col gap-24 xl:gap-48 px-8 xl:px-0 mx-auto max-w-6xl'>
        <section className='flex flex-col gap-8'>
          <div className='flex flex-col gap-8 p-6 xl:p-10 bg-brand-dark-gray rounded-lg'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-4xl sm:text-5xl'>Postgres at the Edge</h2>
              <div className='flex flex-col xl:flex-row gap-8 xl:gap-24'>
                <p className='text-base sm:text-xl'>
                  Edge Functions run closer to the user. This minimizes both the
                  number, and length of network round-trips to and from the
                  database, resulting in lower latency response times.
                </p>
                <div>
                  <button
                    onClick={mutation.mutate}
                    className='flex items-center justify-center bg-transparent text-white font-semibold text-lg rounded-full border border-white enabled:hover:bg-brand-background disabled:cursor-not-allowed disabled:bg-brand-transparent disabled:text-zinc-700 disabled:border-brand-border transition-colors duration-200 min-h-[52px] min-w-[150px]'
                    disabled={mutation.isLoading || details.user.city}
                  >
                    {mutation.isLoading ? (
                      <LoadingDots className='bg-white' />
                    ) : (
                      'Ping'
                    )}
                  </button>
                </div>
              </div>
              <hr className='border-brand-border my-6' />
            </div>

            <JourneyCard journey={details.user} />
          </div>
          <div className='flex flex-col gap-2 p-6 bg-brand-dark-gray rounded-lg'>
            <h2 className='text-center text-2xl sm:text-3xl '>
              How to use Postgres at the Edge
            </h2>
            <p className='text-center'>
              A closer look at how to use Neon's serverless driver with Vercel
              Edge Functions.
            </p>
            <a
              href='https://neon.tech/blog/how-to-use-postgres-at-the-edge'
              target='_blank'
              rel='noopener'
              className='inline-flex items-center self-center gap-2 primary-link'
              onClick={() => sendGtagEvent('click_ping_thing_blog_link')}
            >
              Read post
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mt-1 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </a>
          </div>
        </section>

        <section className='flex flex-col xl:flex-row gap-16'>
          <div className='xl:order-2 shrink flex flex-col justify-center gap-4 w-full xl:w-3/5'>
            <h2 className='text-4xl sm:text-5xl'>Neon serverless driver</h2>
            <p className='text-base sm:text-xl'>
              The serverless driver is a drop in replacement for node-postgres
              and is suitable for use with Vercel Edge Functions.
            </p>

            <a
              href='https://neon.tech/docs/serverless/serverless-driver'
              target='_blank'
              rel='noopener'
              className='inline-flex self-start items-center gap-2 primary-link'
              onClick={() => sendGtagEvent('click_ping_thing_learn_more')}
            >
              Learn more
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mt-1 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </a>
          </div>
          <div className='w-full'>
            <CodeHighlight text={serverlessDriverString} />
          </div>
        </section>
        <section className=''>
          <div className='flex flex-col xl:flex-row gap-16 xl:gap-0'>
            <div className='flex flex-col justify-center gap-4 xl:py-20'>
              <h2 className='text-center xl:text-left text-4xl sm:text-5xl'>
                Get started
                <br />
                with Neon
              </h2>
              <p className='text-center xl:text-left text-base sm:text-xl'>
                The fully managed multi-cloud Postgres with a generous free
                tier. We separated storage and compute to offer autoscaling,
                branching, and bottomless storage.
              </p>
              <div className='flex self-center xl:self-start pt-2'>
                <ButtonEffect>
                  <a
                    href='https://neon.tech'
                    target='_blank'
                    className='relative flex self-start items-center justify-center no-underline bg-brand-primary text-brand-background px-10 font-semibold text-lg rounded-full hover:bg-brand-primary-light transition-colors duration-200 min-w-auto sm:min-w-auto min-h-[52px] min-w-[150px] z-10'
                    onClick={() => sendGtagEvent('click_ping_thing_signup')}
                  >
                    Sign up
                  </a>
                </ButtonEffect>
              </div>
            </div>
            <div className='flex shrink items-end'>
              <Image
                src={`${process.env.NEXT_PUBLIC_REWRITE_PREFIX}/static/cta-elephant.avif`}
                width={1684}
                height={964}
                alt='Neon Elephant'
                className='m-0'
              />
            </div>
          </div>
          <hr className='border-brand-border my-0' />
        </section>
      </div>
    </div>
  );
});

export default Page;
