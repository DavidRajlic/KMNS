"use client";
import Link from "next/link";
import Image from "next/image";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-100 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <Image
          src="/KMNS_logo.png"
          alt="KMN Smrkci Logo"
          width={100}
          height={100}
          className="mx-auto mb-2 h-auto"
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Klub malega nogometa Smrkci
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Dobrodošli na uradni strani KMN Smrkci! Smo ekipa z dušo in srcem, ki
          igra mali nogomet z nasmehom. Pridruži se nam na nepozabnem turnirju v
          Vojniku!
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Turnir Vojnik 2025
          </h2>
          <p className="text-blue-900">27. junij 2025, Vojnik</p>
          <Countdown />
        </div>
        <Link href="/turnir">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
            Oglej si podatke turnirja
          </button>
        </Link>
      </div>
    </main>
  );
}
