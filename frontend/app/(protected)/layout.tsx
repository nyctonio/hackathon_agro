import '../../styles/globals.css';
import Providers from '../provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="flex overflow-hidden font-theme h-screen w-screen">
        <div className="w-full h-full overflow-y-scroll">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
