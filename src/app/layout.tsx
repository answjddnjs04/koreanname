import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-Soul Name | 당신의 한국 이름을 찾아보세요",
  description: "12가지 질문을 통해 당신에게 가장 어울리는 한국 이름을 선물합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-primary text-primary-foreground min-h-screen antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
