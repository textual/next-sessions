import { Chakra_Petch } from 'next/font/google';
import { Inter_Tight } from 'next/font/google';

export const chakra = Chakra_Petch({
  weight: ['300', '400', '600', '700'],
  //   variable: '--font-chakra',
  subsets: ['latin'],
  display: 'swap',
});

export const inter_tight = Inter_Tight({
  weight: ['400', '700'],
  subsets: ['latin'],
});
