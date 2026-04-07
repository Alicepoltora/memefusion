"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NAV_ITEMS = [
    { label: 'FUSION', href: '/' },
    { label: 'STUDIO', href: '/studio' },
    { label: 'SOCIALFI', href: '/socialfi' },
    { label: 'VAULT', href: '/vault' },
    { label: 'LAUNCH', href: '/launch' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/8 bg-[#090b10]/72 px-6 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="overflow-hidden rounded-xl transition-all group-hover:shadow-[0_0_20px_rgba(255,163,72,0.45)]">
                        <Image
                            src="/brand/mf-logo.svg"
                            alt="MF logo"
                            width={36}
                            height={36}
                            className="h-9 w-9"
                        />
                    </div>
                    <div>
                        <span className="block text-lg font-black uppercase tracking-[-0.05em] text-white">Meme-Fusion AI</span>
                        <span className="block text-[10px] uppercase tracking-[0.24em] text-white/40">Hybrid meme studio x Four.meme</span>
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors ${isActive
                                    ? 'border-b border-orange-200 pb-1 text-orange-100'
                                    : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ConnectButton />
            </div>
        </nav>
    );
}
