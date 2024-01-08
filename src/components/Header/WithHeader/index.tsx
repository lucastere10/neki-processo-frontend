'use client'
import React, { FC } from 'react'
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation'

interface HeaderPageProps {

}

export const HeaderPage: FC<HeaderPageProps> = ({ }) => {
  const pathname = usePathname()
  const hideHeader = pathname.startsWith('/login') || pathname.startsWith('/register')

  return (
    <>
      {!hideHeader && <Header titulo='' />}
    </>
  )
}
