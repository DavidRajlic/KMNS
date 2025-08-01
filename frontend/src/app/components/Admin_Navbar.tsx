"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
 function logoutAdmin() {
    document.cookie = "adminAccess=; Max-Age=0; path=/; secure; samesite=strict";
    router.push("/");
  }

  return (
    <nav className="bg-blue-600 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/KMNS_logo.png" alt="KMN Smrkci" width={40} height={40} />
          <span className="text-xl font-bold text-white">KMN SMRKCI</span>
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li>
            <Link href="/tournament/admin/teams">Ekipe</Link>
          </li>
          <li>
            <Link href="/tournament/admin/matches" onClick={() => setMenuOpen(false)}>
              Tekme
            </Link>
          </li>
          <li>
            <Link href="/tournament/admin/groups">Skupine</Link>
          </li>
            <li>
                <button onClick={logoutAdmin}>Odjava</button>
            </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Domov
              </Link>
            </li>
            <li>
              <Link
                href="/tournament/leaderboards"
                onClick={() => setMenuOpen(false)}
              >
                Lestvice
              </Link>
            </li>
            <li>
              <Link
                href="/tournament/admin/groups"
                onClick={() => setMenuOpen(false)}
              >
                Skupine
              </Link>
            </li>
            <li>
              <Link
                href="/tournament/admin/matches"
                onClick={() => setMenuOpen(false)}
              >
                Tekme
              </Link>
            </li>
            <li>
              <Link
                href="/tournament/top-scorers"
                onClick={() => setMenuOpen(false)}
              >
                Strelci
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
