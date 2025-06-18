import Navbar from "@/app/components/Navbar";

export default function TournamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
