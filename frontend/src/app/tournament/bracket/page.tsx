"use client";
import { useEffect, useState } from "react";

type Match = {
  _id: string;
  team1_id: string;
  team2_id: string;
  team1_name: string;
  team2_name: string;
  team1_goals: number;
  team2_goals: number;
  stage: "četrtfinale" | "polfinale" | "finale";
  match_status: "played" | "notPlayed" | "live";
  match_time_display: string;
  winner?: string;
  bracket_position: number;
};

export default function BracketPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockMatches: Match[] = [
      // Četrtfinale
      {
        _id: "qf1",
        team1_id: "1",
        team2_id: "2",
        team1_name: "NK Maribor",
        team2_name: "NK Celje",
        team1_goals: 3,
        team2_goals: 1,
        stage: "četrtfinale",
        match_status: "played",
        match_time_display: "19:00",
        winner: "NK Maribor",
        bracket_position: 1,
      },
      {
        _id: "qf2",
        team1_id: "3",
        team2_id: "4",
        team1_name: "NK Olimpija",
        team2_name: "NK Mura",
        team1_goals: 2,
        team2_goals: 1,
        stage: "četrtfinale",
        match_status: "notPlayed",
        match_time_display: "19:30",
        winner: "NK Olimpija",
        bracket_position: 2,
      },
      {
        _id: "qf3",
        team1_id: "5",
        team2_id: "6",
        team1_name: "NK Koper",
        team2_name: "NK Bravo",
        team1_goals: 1,
        team2_goals: 2,
        stage: "četrtfinale",
        match_status: "played",
        match_time_display: "20:00",
        winner: "NK Bravo",
        bracket_position: 3,
      },
      {
        _id: "qf4",
        team1_id: "7",
        team2_id: "8",
        team1_name: "NK Domžale",
        team2_name: "NK Radomlje",
        team1_goals: 0,
        team2_goals: 1,
        stage: "četrtfinale",
        match_status: "played",
        match_time_display: "20:30",
        winner: "NK Radomlje",
        bracket_position: 4,
      },
      // Polfinale
      {
        _id: "sf1",
        team1_id: "1",
        team2_id: "3",
        team1_name: "NK Maribor",
        team2_name: "NK Olimpija",
        team1_goals: 2,
        team2_goals: 0,
        stage: "polfinale",
        match_status: "played",
        match_time_display: "19:00",
        winner: "NK Maribor",
        bracket_position: 1,
      },
      {
        _id: "sf2",
        team1_id: "6",
        team2_id: "8",
        team1_name: "NK Bravo",
        team2_name: "NK Radomlje",
        team1_goals: 1,
        team2_goals: 1,
        stage: "polfinale",
        match_status: "live",
        match_time_display: "19:30",
        bracket_position: 2,
      },
      // Finale
      {
        _id: "f1",
        team1_id: "1",
        team2_id: "tbd",
        team1_name: "NK Maribor",
        team2_name: "?",
        team1_goals: 0,
        team2_goals: 0,
        stage: "finale",
        match_status: "notPlayed",
        match_time_display: "20:00",
        bracket_position: 1,
      },
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1000);
  }, []);

  const getMatchesByStage = (stage: string) => {
    return matches.filter((match) => match.stage === stage);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white animate-pulse";
      case "played":
        return "bg-green-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "🔴 V ŽIVO";
      case "played":
        return "KONČANO";
      default:
        return "PREDVIDENO";
    }
  };

  const MatchCard = ({
    match,
    isCompact = false,
  }: {
    match: Match;
    isCompact?: boolean;
  }) => (
    <div
      className={`bg-white rounded-lg shadow-lg border-2 border-blue-400 p-3 ${
        isCompact ? "w-52" : "w-full max-w-60"
      }`}
    >
      {/* Status */}
      <div className="flex justify-between items-center mb-2">
        <div
          className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusStyle(
            match.match_status
          )}`}
        >
          {getStatusText(match.match_status)}
        </div>
        <div className="text-sm font-semibold text-blue-600">
          {match.match_time_display}
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-2">
        {/* Team 1 */}
        <div
          className={`flex items-center justify-between p-2 rounded ${
            match.winner === match.team1_name
              ? "bg-green-50 border-l-4 border-green-500"
              : "bg-gray-50"
          }`}
        >
          <div className="text-sm font-bold flex-1 text-blue-600 truncate">
            {match.team1_name}
          </div>
          <div className="text-lg font-bold text-gray-800 ml-2">
            {match.match_status === "played" || match.match_status === "live"
              ? match.team1_goals
              : "-"}
          </div>
        </div>

        {/* Team 2 */}
        <div
          className={`flex items-center justify-between p-2 rounded ${
            match.winner === match.team2_name
              ? "bg-green-50 border-l-4 border-green-500"
              : "bg-gray-50"
          }`}
        >
          <div className="text-sm font-bold flex-1 text-blue-600 truncate">
            {match.team2_name}
          </div>
          <div className="text-lg font-bold text-gray-800 ml-2">
            {match.match_status === "played" || match.match_status === "live"
              ? match.team2_goals
              : "-"}
          </div>
        </div>
      </div>

      {/* Winner indicator */}
      {match.winner && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            🏆 {match.winner}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium text-sm sm:text-base">
            Nalagam turnirsko lestvico...
          </p>
        </div>
      </div>
    );
  }

  const quarterfinals = getMatchesByStage("četrtfinale");
  const semifinals = getMatchesByStage("polfinale");
  const finals = getMatchesByStage("finale");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-2 py-4 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-4 px-2">
            Turnirska Lestvica
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">
            Pot do finala - izločilni boji! 🏆
          </p>
        </div>

        {/* Mobile Bracket (< lg) */}
        <div className="block lg:hidden space-y-8">
          {/* Četrtfinale */}
          <div>
            <h2 className="text-xl font-bold text-center mb-4 text-blue-800">
              Četrtfinale
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {quarterfinals.map((match) => (
                <div key={match._id} className="flex justify-center">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="text-3xl text-blue-500">⬇️</div>
          </div>

          {/* Polfinale */}
          <div>
            <h2 className="text-xl font-bold text-center mb-4 text-blue-800">
              Polfinale
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {semifinals.map((match) => (
                <div key={match._id} className="flex justify-center">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="text-3xl text-blue-500">⬇️</div>
          </div>

          {/* Finale */}
          <div>
            <h2 className="text-xl font-bold text-center mb-4 text-blue-800">
              FINALE
            </h2>
            <div className="flex justify-center">
              {finals.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Bracket (>= lg) */}
        <div className="hidden lg:flex justify-center items-center space-x-8">
          {/* Quarterfinals Column */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-blue-800 mb-6 text-center">
              Četrtfinale
            </h3>
            <div className="flex flex-col space-y-6">
              {quarterfinals.map((match) => (
                <MatchCard key={match._id} match={match} isCompact />
              ))}
            </div>
          </div>

          {/* Connecting Lines 1 */}
          <div className="flex flex-col items-center justify-center space-y-16">
            {/* Top bracket lines */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
              <div className="w-0 h-16 border-l-2 border-blue-400"></div>
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
            </div>

            {/* Bottom bracket lines */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
              <div className="w-0 h-16 border-l-2 border-blue-400"></div>
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
            </div>
          </div>

          {/* Semifinals Column */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-blue-800 mb-6 text-center">
              Polfinale
            </h3>
            <div className="flex flex-col space-y-24">
              {semifinals.map((match) => (
                <MatchCard key={match._id} match={match} isCompact />
              ))}
            </div>
          </div>

          {/* Connecting Lines 2 */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
              <div className="w-0 h-32 border-l-2 border-blue-400"></div>
              <div className="w-12 h-0 border-t-2 border-blue-400"></div>
            </div>
          </div>

          {/* Final Column */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">
              FINALE
            </h3>
            <div className="flex flex-col justify-center">
              {finals.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
