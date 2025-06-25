"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    if (code === process.env.NEXT_PUBLIC_CODE) {
      document.cookie = "adminAccess=true; path=/; secure; samesite=strict";
      router.push("/tournament/admin/teams");
    } else {
      alert("Napačna koda");
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">Admin dostop</h1>
        <input
          type="password"
          placeholder="Vnesi admin kodo"
          className="w-full px-4 py-2 border rounded-md mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Potrdi
        </button>
      </div>
    </div>
  );
}
