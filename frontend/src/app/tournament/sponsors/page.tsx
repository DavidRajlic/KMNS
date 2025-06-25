import Image from "next/image";

const sponsors = [
  {
    name: "Super trening",
    logo: "/sponsors/super_trening_logo.svg",
    url: "https://supertrening.si/",
  },
  {
    name: "Aram",
    logo: "/sponsors/aram_logo.svg",
    url: "https://www.aram.si/",
  },
  {
    name: "Kongrad",
    logo: "/sponsors/kongrad_logo.svg",
    url: "https://www.kongrad.si/",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Naši sponzorji
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Ponosno predstavljamo podjetja, ki podpirajo naš nogometni turnir.
        </p>

        <div className="grid grid-cols-1 gap-8 items-center justify-center sm:grid-cols-3">
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
                width={120}
                height={80}
                className="mx-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
