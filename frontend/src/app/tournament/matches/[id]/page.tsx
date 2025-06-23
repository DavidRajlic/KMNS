"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type PlayerStat = {
  player_id: string;
  player_name: string;
  goals?: number;
  y_cards?: number;
  r_cards?: number;
};

type Match = {
  _id: string;
  team1_name: string;
  team2_name: string;
  team1_goals: number;
  team2_goals: number;
  team1_scorers: PlayerStat[];
  team2_scorers: PlayerStat[];
  team1_yellow_cards: PlayerStat[];
  team2_yellow_cards: PlayerStat[];
  team1_red_cards: PlayerStat[];
  team2_red_cards: PlayerStat[];
};

export default function MatchDetailsPage() {
  const { id } = useParams();
  const matchId = id as string;

  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const res = await fetch(`http://localhost:4000/matches/${matchId}`);
      const data = await res.json();
      console.log(data);
      setMatch(data);
    };

    fetchMatch();
  }, [matchId]);

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200">
          <div className="text--700 font-semibold text-lg">Nalaganje...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-3">
      <div className="max-w-4xl mx-auto">
        {/* Match Details */}
        <div className="bg-gradient-to-r shadow-sm from-slate-50 to-gray-50  backdrop-blur-sm rounded-2xl shadow-xl border border-sky-200/50 pt-4">
          <h1 className="sm:text-3xl text-xl max-[430px]:text-lg flex justify-center pb-10 font-bold text-slate-800">
            {match.team1_name} : {match.team2_name}
            <span className="mx-2 text-sky-700 font-extrabold">
              {"   "}
              {match.team1_goals} - {match.team2_goals}
            </span>
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {/* Team 1 Column */}
            <div>
              <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center pb-3"></h2>
              <div className="space-y-4">
                <Section
                  title="Strelci"
                  items={match.team1_scorers}
                  type="goals"
                />
                <Section
                  title="Rumeni kartoni"
                  items={match.team1_yellow_cards}
                  type="yellow"
                />
                <Section
                  title="Rdeči kartoni"
                  items={match.team1_red_cards}
                  type="red"
                />
              </div>
            </div>

            {/* Team 2 Column */}
            <div>
              <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center pb-3"></h2>
              <div className="space-y-4">
                <Section
                  title="Strelci"
                  items={match.team2_scorers}
                  type="goals"
                />
                <Section
                  title="Rumeni kartoni"
                  items={match.team2_yellow_cards}
                  type="yellow"
                />
                <Section
                  title="Rdeči kartoni"
                  items={match.team2_red_cards}
                  type="red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function shortenName(fullName: string): string {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0]; // Če ni priimka
  const firstInitial = parts[0].charAt(0).toUpperCase();
  const lastName = parts.slice(-1)[0]; // zadnji del
  return `${firstInitial}. ${lastName}`;
}

type SectionProps = {
  title: string;
  items: PlayerStat[];
  type: "goals" | "yellow" | "red";
};

function Section({ items, type }: SectionProps) {
  if (items.length === 0) return null;
  {
    console.log(items);
  }
  return (
    <div className="rounded-xl bg-gradient-to-r from-slate-50 to-gray-50">
      <ul className="space-y-1 p-2">
        {items.map((p) => (
          <li
            key={p.player_id}
            className="flex flex-wrap items-center justify-between gap-x-0 gap-y-1 sm:text-base text-sm sm:pb-1 pb-3 px-2 py-1 rounded-lg hover:bg-white/60 transition-colors duration-200"
          >
            <span className="font-medium text-slate-700 break-words">
              <span className="inline max-[500px]:hidden">{p.player_name}</span>
              <span className="hidden max-[500px]:inline">
                {shortenName(p.player_name)}
              </span>
            </span>

            <span className="font-semibold text-xs sm:text-base text-sky-700">
              {type === "goals"
                ? p.goals && p.goals < 2
                  ? "⚽"
                  : `${p.goals}x ⚽`
                : type === "yellow"
                ? "🟨"
                : "🟥"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
