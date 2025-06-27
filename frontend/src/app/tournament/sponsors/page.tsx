"use client";
import Image from "next/image";

const sponsors = [
  {
    name: "Super trening",
    logo: "/sponsors/super_trening_logo.svg",
    url: "https://supertrening.si/",
    width: 120,
  },
  {
    name: "Aram",
    logo: "/sponsors/aram_logo.svg",
    url: "https://www.aram.si/",
    width: 250,
  },
  {
    name: "Kongrad",
    logo: "/sponsors/kongrad_logo.svg",
    url: "https://www.kongrad.si/",
    width: 120,
  },
  {
    name: "Feal",
    logo: "/sponsors/feal_logo.svg",
    url: "https://feal.si/",
    width: 150,
  },
];

export default function SponsorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      <main className="flex-grow px-6 pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">Naši donatorji</h1>
          <p className="max-[480px]:text-xs text-sm sm:text-base lg:text-lg px-2 text-gray-200 mb-10">
            S ponosom predstavljamo svoje donatorje, <br className="lg:hidden" /> ki nam omogočajo, da se kot društvo udejstvujemo v športu.
            <br />
            Za vso podporo in vse se vam iz srca zahvaljujemo <span className="max-[430px]:hidden"> –  </span> <br className="min-[430px]:hidden" /> <strong> vaši Smrkci!</strong>
          </p>


          <div className="grid grid-cols-1 gap-8 items-center justify-center sm:grid-cols-2 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={150}
                  className="mx-auto object-contain"
                />
              </a>
            ))}
          </div>

          <div className="mt-16 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md rounded-xl p-5 text-sm text-white text-center max-w-md mx-auto font-sans">
            <div className="mb-2 text-gray-200 text-xs">
              💻 Izdelava spletne strani:{" "}
              <span className="font-semibold text-white">David Rajlič</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-semibold text-base">
                Potrebujete tudi vi spletno stran?
              </span>
            </div>
            <p className="text-gray-100">
              Pišite na{" "}
              <a
                href="mailto:david.rajlic@example.com"
                className="underline font-medium hover:text-blue-200 transition"
              >
                rajlic.david@gmail.com
              </a>
            </p>
            <div className="text-xs pt-5">© {new Date().getFullYear()} KMN Smrkci. Vse pravice pridržane.</div>
          </div>
        </div>
      </main>
    </div>
  );
}
