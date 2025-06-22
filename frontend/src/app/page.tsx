"use client";
import Link from "next/link";
import Image from "next/image";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <main className="min-h-screen bg-white sm:bg-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-xl p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/KMNS_logo.png"
            alt="KMN Smrkci Logo"
            width={100}
            height={100}
            className="mb-4"
          />

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
            Klub malega nogometa Smrkci
          </h1>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Dobrodošli na uradni strani KMN Smrkci! Smo ekipa z dušo in srcem,
            ki igra mali nogomet z nasmehom. Pridruži se nam na nepozabnem
            turnirju v Vojniku!
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-1">
              Turnir Vojnik 2025
            </h2>
            <p className="text-blue-900 mb-2 text-sm sm:text-base">
              28. junij 2025, Vojnik
            </p>
            <Countdown />
          </div>

          <Link href="/tournament/admin/teams" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
              Oglej si podatke turnirja
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
