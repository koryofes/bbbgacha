import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "部分分数分解ガチャ", description: "ランダムに生成される部分分数分解の問題を解こう〜",
}

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
