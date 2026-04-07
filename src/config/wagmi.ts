import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Meme-Fusion AI',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', // 32-char hex placeholder
    chains: [bsc],
    ssr: false,
});
