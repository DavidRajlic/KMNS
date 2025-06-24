// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const isAdmin = (await cookieStore).get("adminAccess")?.value === "true";

  if (!isAdmin) {
    redirect("/"); 
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold p-4">Admin Panel</h1>
      {children}
    </div>
  );
}
