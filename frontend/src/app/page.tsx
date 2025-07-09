import Link from "next/link";
import Image from "next/image";

export default function FinishedTournament() {
  return (
    <main className="min-h-screen bg-white sm:bg-blue-50 flex items-center justify-center p-0 ">
      <div className="w-full max-w-4xl bg-white rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl overflow-hidden ">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-2">
              <Image
                src="/kmn-smrkci-logo.svg"
                alt="KMN Smrkci Logo"
                width={120}
                height={120}
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              2. FUTSAL TURNIR V VOJNIKU
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">28. 6. 2025</span>
            </div>
          </div>
        </div>

        <article className="text-gray-700 text-base sm:text-lg space-y-6 mb-8 text-left leading-relaxed p-5">
          <p>
            Dne 28.6.2025 smo člani Kluba malega nogometa Smrkci organizirali
            drugi zaporedni turnir v malem nogometu. Turnir smo izvedli na
            asfaltnem nogometnem igrišču v Vojniku. Udeležilo se ga je 16 ekip,
            ki so bile razdeljene v 4 skupine po 4 ekipe. Iz vsake skupine sta v
            izločilne boje napredovali 2 najboljši ekipi. Premor med skupinskim
            delom in izločilnimi boji smo začinili z izvajanjem prostih strelov,
            ki so potekali z razdalj 6 m, 9 m in 10 m. Prvi so se preizkusili
            najmlajši tekmovalci v borbi za pico, malo starejši pa so merili za
            žlahtnejšo nagrado, ki jo je predstavljal plato piva.
          </p>

          <p>
            V izločilnih bojih je bil gledalcem postrežen izjemen futsal.
            Marsikatera poteza je vzela dih. Vsi igralci so pokazali neverjetno
            borbenost in srčnost, tisti, ki so pokazali malo več, pa so si
            prislužili individualne nagrade, za katere je poskrbel SuperTrening,
            in sicer:{" "}
          </p>
          <div className="bg-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">
              🏅 Individualne nagrade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🥅</div>
                <div className="font-semibold text-gray-800">Naj vratar</div>
                <div className="text-blue-600 font-medium">Tilen Majšler</div>
                <div className="text-sm text-gray-500">FEAL-SMRKCI-ARAM</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-semibold text-gray-800">Naj igralec</div>
                <div className="text-blue-600 font-medium">Žan Čater</div>
                <div className="text-sm text-gray-500">FEAL-SMRKCI-ARAM</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">⚽</div>
                <div className="font-semibold text-gray-800">Naj strelec</div>
                <div className="text-blue-600 font-medium">Damjan Vajdič</div>
                <div className="text-sm text-gray-500">Dubai Šokolade</div>
              </div>
            </div>
          </div>

          <p>
            Za odlično vzdušje ob igrišču je skozi celoten dan skrbela ekipa
            <strong> Gajba</strong>, ki si je na koncu dneva prislužila pokal
            šanka. Turnir je osvojila ekipa <strong>FEAL-SMRKCI-ARAM </strong>,
            ki je v finalu premagala ekipo <strong> Dubai Šokolade</strong> z
            rezultatom <strong>2:1</strong>. Tretje mesto je po izvajanju
            6-metrovk osvojila ekipa <strong>Monte Carlo</strong>, ki je bila
            uspešnejša kakor ekipa <strong>Bar Golf </strong>.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Končni rezultati:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3 text-xl">🥇</span>
                <span>
                  <strong>1. mesto:</strong> FEAL-SMRKCI-ARAM
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mr-3 text-xl">🥈</span>
                <span>
                  <strong>2. mesto:</strong> Dubai Šokolade
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-3 text-xl">🥉</span>
                <span>
                  <strong>3. mesto:</strong> Monte Carlo
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3 text-xl">🏅</span>
                <span>
                  <strong>4. mesto:</strong> Bar Golf
                </span>
              </li>
            </ul>
          </div>

          <p>
            Društvo KMN Smrkci Vojnik se iz srca zahvaljuje vsem donatorjem, ki
            so dogodek omogočili:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "Aram",
              "SuperTrening",
              "Frimobil",
              "Free2rent",
              "Kongrad",
              "FEAL",
              "Avtomehanika Leber",
              "Picerija Popaj",
              "Občina Vojnik",
              "Krajevna skupnost Vojnik",
            ].map((sponsor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 text-center text-sm font-medium text-gray-700 shadow-sm"
              >
                {sponsor}
              </div>
            ))}
          </div>
          <p>
            Posebne zahvale gredo še <strong>Tomažu Jusu</strong> za vso
            dosedanjo pomoč ter celodnevno pomoč na turnirju in{" "}
            <strong>Matjažu Gučku</strong> za vizijo, ki je oblikovala društvo,
            preko katerega se je lahko izvedel turnir, ter za vso delo, ki ga je
            namenil našemu društvu.
          </p>

          <p>
            {" "}
            Za izdelavo spletne strani je poskrbel <strong>David Rajlič</strong>
            , fotografije so plod dela <strong>Svita Zagoričnika</strong>.
          </p>
          <p className="leading-relaxed">
            Zahvaljujemo se vsem članom in podpornikom društva, ki so kakorkoli
            pripomogli k izvedbi tega dogodka.
          </p>
          <p>
            {" "}
            Zahvaljujemo se tudi vsem obiskovalcem turnirja in upamo, da nas
            ponovno obiščete naslednje leto.
          </p>
          <div className="font-bold text-lg text-center">
            <div>Vaši Smrkci</div>
            <div className="text-blue-600">KMN Smrkci Vojnik</div>
          </div>
        </article>

        <div className="flex justify-center my-4">
          <Link href="/tournament/matches">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs sm:max-w-md">
              Oglej si podatke turnirja
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
