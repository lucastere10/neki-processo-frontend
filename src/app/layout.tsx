import { Open_Sans } from 'next/font/google';
import React from 'react';
import './styles/globals.css';
import { Provider } from '@/components/ThemeProvider/Provider';
import NextAuthSessionProvider from '@/providers/sessionProvider';
import { HeaderPage } from '@/components/Header/WithHeader';
import '@/lib/i18n';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Skill+',
  description: 'Projeto em Next.js para processo seletivo da Neki'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={openSans.className}>
        <NextAuthSessionProvider>
          <Provider>
            <div>
              <HeaderPage />
              {children}
            </div>
          </Provider>
        </NextAuthSessionProvider>
      </body>
    </html >
  );
}
