import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import '@/styles/globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[80px_auto_80px] grid-cols-[172px_auto]">
        <Navbar />
        <Header />
        <main className="row-start-2 row-end-3 col-start-2 col-end-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
