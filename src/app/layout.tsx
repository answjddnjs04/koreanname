import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-Soul Name - 한국 이름 생성기",
  description: "당신의 성향에 꼭 맞는 한국 이름을 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <main className="w-full max-w-md bg-white min-h-screen sm:min-h-[800px] shadow-lg sm:rounded-xl overflow-hidden relative flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
