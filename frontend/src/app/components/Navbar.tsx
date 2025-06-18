import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-md px-6 py-4">
      <div className="mr-5 ml-3 flex items-center justify-between">
        {/* Leva stran: logo + ime */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/KMNS_logo.png" alt="KMN Smrkci" width={40} height={40} />
          <span className="text-xl font-bold text-white">KMN SMRKCI</span>
        </Link>

        {/* Desna stran: povezave */}
        <ul className="flex gap-6 text-white font-medium">
          <li>
            <Link href="/">Domov</Link>
          </li>
          <li>
            <Link href="/tournament/admin/teams">Tekme</Link>
          </li>
          <li>
            <Link href="/tournament/admin/groups">Skupine</Link>
          </li>
          <li>
            <Link href="/news">Novice</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
