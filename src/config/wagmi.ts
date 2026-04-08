import { createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
    chains: [bsc],
    connectors: [
        injected({
            shimDisconnect: true,
        }),
    ],
    transports: {
        [bsc.id]: http(),
    },
    ssr: false,
});
