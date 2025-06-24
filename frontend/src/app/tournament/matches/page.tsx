"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Match = {
  _id: string;
  team1_id: string;
  team2_id: string;
  team1_name: string;
  team2_name: string;
  team1_goals: number;
  team2_goals: number;
  team1_scorers: Array<{
    player_id: string;
    player_name: string;
  }>;
  team1_players_yellow_card: string[];
  stage: "skupine" | "četrtfinale" | "polfinale" | "finale";
  round?: string;
  group?: string;
  match_status: "played" | "notPlayed" | "live";
  match_time_display: string;
  match_time_sort: number;
  winner?: string;
};

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const liveMatchRef = useRef<HTMLDivElement | null>(null);
  const playedMatchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matches`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Napaka pri nalaganju tekem:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (matches.length > 0 && liveMatchRef.current) {
      liveMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (matches.length > 0 && playedMatchRef.current) {
      playedMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [matches]);

  const stages = [...new Set(matches.map((match) => match.stage))];

  const filteredMatches =
    selectedStage === "all"
      ? matches
      : matches.filter((match) => match.stage === selectedStage);

  const groupedMatches = filteredMatches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      const groupKey = match.round || match.stage;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(match);
      return acc;
    },
    {}
  );

  const formatRoundTitle = (roundKey: string) => {
    if (roundKey.includes("krog")) {
      return roundKey;
    }
    return roundKey.charAt(0).toUpperCase() + roundKey.slice(1);
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStageColor = (stage: string) => {
    const stageColors: Record<string, string> = {
      skupine: "bg-blue-100 text-blue-800 border-blue-300",
      četrtfinale: "bg-orange-100 text-orange-800 border-orange-300",
      polfinale: "bg-red-100 text-red-800 border-red-300",
      finale: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    return (
      stageColors[stage.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-300"
    );
  };

  const handleMatchClick = (teamId: string, match_status: string) => {
    if (match_status != "notPlayed") {
      router.push(`matches/${teamId}`);
    }
  };

  // Funkcija za status tekme
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
        return "⏰ PREDVIDENO";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium text-sm sm:text-base">
            Nalagam razpored tekem...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-2 py-4 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-4 px-2">
            Razpored tekem
          </h1>
        </div>

        {/* Filter po stage-ih */}
        <div className="mb-6 sm:mb-8 px-2">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            <button
              onClick={() => setSelectedStage("all")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedStage === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
              }`}
            >
              Vse tekme
            </button>
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 capitalize ${
                  selectedStage === stage
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Tekme po rundah */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {Object.entries(groupedMatches)
            .sort(([a], [b]) => {
              // Custom sorting - najprej skupine, potem knockout faze
              const stageOrder = [
                "skupine",
                "četrtfinale",
                "polfinale",
                "finale",
              ];
              const aStage =
                matches.find((m) => (m.round || m.stage) === a)?.stage || a;
              const bStage =
                matches.find((m) => (m.round || m.stage) === b)?.stage || b;
              return stageOrder.indexOf(aStage) - stageOrder.indexOf(bStage);
            })
            .map(([roundKey, roundMatches]) => (
              <div
                key={roundKey}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-100 mx-1 sm:mx-0"
              >
                {/* Header runde */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-3 sm:px-6 sm:py-4">
                  <h2 className="text-sm sm:text-xl font-bold text-white flex items-center">
                    <span className="bg-white bg-opacity-20 rounded-full w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-lg">
                      ⚽
                    </span>
                    <span className="text-sm sm:text-xl leading-tight">
                      {formatRoundTitle(roundKey)}
                    </span>
                  </h2>
                </div>

                {/* Tekme za to rundo */}
                <div className="divide-y divide-gray-100">
                  {roundMatches
                    .sort((a, b) => a.match_time_sort - b.match_time_sort)
                    .map((match) => (
                      <div
                        key={match._id}
                        ref={
                          match.match_status === "played"
                            ? playedMatchRef
                            : match.match_status === "live"
                            ? liveMatchRef
                            : null
                        }
                        onClick={() =>
                          handleMatchClick(match._id, match.match_status)
                        }
                        className="p-3 sm:p-4 md:p-6 hover:bg-blue-50 transition-colors duration-200"
                      >
                        {/* Mobile Layout (< sm) */}
                        <div className="block sm:hidden">
                          {/* Čas in status - zgoraj */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="bg-blue-100 rounded-lg px-3 py-1">
                              <div className="text-lg font-bold text-blue-800">
                                {formatTime(match.match_time_display)}
                              </div>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                                match.match_status
                              )}`}
                            >
                              {getStatusText(match.match_status)}
                            </div>
                          </div>

                          {/* Tekma - vertikalno */}
                          <div className="space-y-2">
                            {/* Ekipa 1 */}
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-sm font-bold flex-1 ${
                                  match.team1_name
                                    .toLowerCase()
                                    .includes("smrkci")
                                    ? "text-blue-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match.team1_name}
                                {match.team1_name
                                  .toLowerCase()
                                  .includes("smrkci") && " 🧙‍♂️"}
                              </div>
                              <div className="text-lg font-bold text-gray-800 ml-2">
                                {match.match_status === "played" ||
                                match.match_status === "live"
                                  ? match.team1_goals
                                  : "-"}
                              </div>
                            </div>

                            {/* VS divider */}
                            <div className="text-center text-gray-400 text-sm">
                              VS
                            </div>

                            {/* Ekipa 2 */}
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-sm font-bold flex-1 ${
                                  match.team2_name
                                    .toLowerCase()
                                    .includes("smrkci")
                                    ? "text-blue-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match.team2_name
                                  .toLowerCase()
                                  .includes("smrkci") && "🧙‍♂️ "}
                                {match.team2_name}
                              </div>
                              <div className="text-lg font-bold text-gray-800 ml-2">
                                {match.match_status === "played" ||
                                match.match_status === "live"
                                  ? match.team2_goals
                                  : "-"}
                              </div>
                            </div>
                          </div>

                          {/* Stage in grupa - spodaj */}
                          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                            {match.stage != "skupine" ? (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-bold border capitalize ${getStageColor(
                                  match.stage
                                )}`}
                              >
                                {match.stage}
                              </span>
                            ) : (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-bold border  ${getStageColor(
                                  match.stage
                                )}`}
                              >
                                Skupinski del
                              </span>
                            )}

                            {match.group && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                Skupina {match.group}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Desktop Layout (>= sm) */}
                        <div className="hidden sm:block">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Čas */}
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 rounded-lg px-4 py-2 min-w-0">
                                <div className="text-xl md:text-2xl font-bold text-blue-800">
                                  {formatTime(match.match_time_display)}
                                </div>
                              </div>

                              {/* Status */}
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                                  match.match_status
                                )}`}
                              >
                                {getStatusText(match.match_status)}
                              </div>
                            </div>

                            {/* Glavni del - tekma */}
                            <div className="flex-1 max-w-2xl">
                              <div className="flex items-center justify-center space-x-4">
                                {/* Ekipa 1 */}
                                <div className="flex-1 text-right">
                                  <div
                                    className={`text-base md:text-lg font-bold ${
                                      match.team1_name
                                        .toLowerCase()
                                        .includes("smrkci")
                                        ? "text-blue-600"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {match.team1_name}
                                    {match.team1_name
                                      .toLowerCase()
                                      .includes("smrkci") && " 🧙‍♂️"}
                                  </div>
                                </div>

                                {/* Rezultat ali VS */}
                                <div className="px-3 py-2 md:px-4 md:py-2 bg-gray-100 rounded-lg min-w-[60px] md:min-w-[80px] text-center">
                                  {match.match_status === "played" ||
                                  match.match_status === "live" ? (
                                    <div className="text-lg md:text-2xl font-bold text-gray-800">
                                      {match.team1_goals} : {match.team2_goals}
                                    </div>
                                  ) : (
                                    <div className="text-sm md:text-lg font-bold text-gray-500">
                                      VS
                                    </div>
                                  )}
                                </div>

                                {/* Ekipa 2 */}
                                <div className="flex-1 text-left">
                                  <div
                                    className={`text-base md:text-lg font-bold ${
                                      match.team2_name
                                        .toLowerCase()
                                        .includes("smrkci")
                                        ? "text-blue-600"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {match.team2_name
                                      .toLowerCase()
                                      .includes("smrkci") && "🧙‍♂️ "}
                                    {match.team2_name}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Stage in grupa */}
                            <div className="flex flex-col items-end space-y-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStageColor(
                                  match.stage
                                )}`}
                              >
                                {match.stage}
                              </span>
                              {match.group && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                  Skupina {match.group}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>

        {/* Prazno stanje */}
        {filteredMatches.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-4">⚽</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Ni tekem za prikaz
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Poskusite z drugim filtrom ali preverite pozneje.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-gray-500 text-xs sm:text-sm px-4">
          <p>🧙‍♂️ Smrkci - Mali nogometni klub z velikimi sanjami! 💙</p>
        </div>
      </div>
    </div>
  );
}
