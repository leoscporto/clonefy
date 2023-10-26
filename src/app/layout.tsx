import NavBar from "@components/NavBar/NavBar";
import "@styles/globals.css";

export const metadata = {
  title: "Clonefy",
  description: "Next react typescript and tailwind",
  icons: {
    icon: "/image/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={'font-body'}>
      <body>
        <NavBar>{children}</NavBar>
      </body>
    </html>
  );
}
