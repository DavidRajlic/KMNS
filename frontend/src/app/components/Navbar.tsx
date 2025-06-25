"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kmn-smrkci-logo.svg"
            alt="KMN Smrkci Vojnik"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold text-white">
            KMN SMRKCI VOJNIK
          </span>
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

        <ul className="hidden md:flex gap-6 text-white mr-5 font-medium">
          <li>
            <Link href="/tournament/leaderboards">Lestvice</Link>
          </li>
          <li>
            <Link href="/tournament/matches" onClick={() => setMenuOpen(false)}>
              Tekme
            </Link>
          </li>
          <li>
            <Link href="/tournament/top-scorers">Strelci</Link>
          </li>
          <li>
            <Link href="/tournament/sponsors">Sponzorji</Link>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4 text-white font-medium">
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
                href="/tournament/matches"
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
            <li>
              <Link
                href="/tournament/sponsors"
                onClick={() => setMenuOpen(false)}
              >
                Sponzorji
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
