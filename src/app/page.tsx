'use client';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Home: FC<unknown> = () => {
  const router = useRouter()
  const { t, ready } = useTranslation('home');

  return (
    <>
      <div className="relative" id="home">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <slot />
        </div>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">{t('title')}<span className="text-light-primary dark:text-white">{t('titleAnchor')}</span></h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">{t('subtitle')}</p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                onClick={() => {router.push('/profile')}}
                className="cursor-pointer relative flex h-11 w-full items-center justify-center px-6 inset-0 rounded-full bg-light-primary hover:scale-105 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">{t('getStarted')}</span>
              </a>
              <a
                onClick={() => {router.push('/about')}}
                className="cursor-pointer relative flex h-11 w-full items-center justify-center px-6 inset-0 rounded-full border hover:scale-105 sm:w-max active:duration-75 dark:before:border-gray-700 dark:before:bg-gray-800"
              >
                <span
                  className="relative text-base font-semibold text-primary dark:text-white"
                >{t('learnMore')}</span>
              </a>
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex gap-8 justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">{t('CallToAction')}</h6>
                <p className="mt-2 text-gray-500">{t('CallToActionText')}</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">{t('HowItBegins')}</h6>
                <p className="mt-2 text-gray-500">{t('HowItBeginsText')} </p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">{t('Motivations')}</h6>
                <p className="mt-2 text-gray-500">{t('MotivationsText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Home;
