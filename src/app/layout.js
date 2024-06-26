import { chakra } from "@/lib/fonts";
import "./globals.css";
import NavBar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/contexts/auth";

export const metadata = {
  title: "sessions",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${chakra.className} antialiased h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <NavBar />
          <main className="flex-grow m-2">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
