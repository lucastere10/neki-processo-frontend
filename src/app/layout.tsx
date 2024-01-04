import { Open_Sans } from 'next/font/google';
import React from 'react';
import './styles/globals.css';
import { Provider } from '@/components/ThemeProvider/Provider';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Template',
  description: 'Next.js Template by Neki'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={openSans.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
