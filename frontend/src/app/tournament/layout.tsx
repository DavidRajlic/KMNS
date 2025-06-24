import Navbar from "@/app/components/Navbar";
import Admin_Navbar  from "@/app/components/Admin_Navbar"
import { cookies } from "next/headers";

 

export default async function TournamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const cookieStore = cookies();
  const isAdmin = (await cookieStore).get("adminAccess")?.value === "true";

  return (
    <div>
      {isAdmin ? <Admin_Navbar />  :  <Navbar />

      }
      
      <main className="p-0">{children}</main>
    </div>
  );
}
