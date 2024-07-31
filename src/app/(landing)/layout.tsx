import Footer from "@/app/(landing)/components/footer";
import Navbar from "@/app/(landing)/components/nav_bar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
