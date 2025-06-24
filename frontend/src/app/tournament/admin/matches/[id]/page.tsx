"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Player = { _id: string; name: string };
type Match = { _id: string; team1_name: string; team2_name: string };
type PlayerEvent = { player_id: string; player_name: string; count: number };
type Team = {
  _id: string;
  name: string;
  points: number;
  goals_scored: number;
  goals_conceded: number;
  goals_diff: number;
  wins: number;
  losses: number;
  draws: number;
  matches_played: number;
};

export default function EditMatch() {
  const { id } = useParams();
  const matchId = id as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [players1, setPlayers1] = useState<Player[]>([]);
  const [players2, setPlayers2] = useState<Player[]>([]);
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [team1Id, setTeam1Id] = useState<string | null>(null);
  const [team2Id, setTeam2Id] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isGroupStage, setIsGroupStage] = useState(false);
  const [advantage, setAdvantage] = useState<string | null>(null);

  const [scorers, setScorers] = useState<{
    team1: PlayerEvent[];
    team2: PlayerEvent[];
  }>({ team1: [], team2: [] });
  const [yellows, setYellows] = useState<{
    team1: PlayerEvent[];
    team2: PlayerEvent[];
  }>({ team1: [], team2: [] });
  const [reds, setReds] = useState<{
    team1: PlayerEvent[];
    team2: PlayerEvent[];
  }>({ team1: [], team2: [] });

  const [goals, setGoals] = useState({ team1_goals: 0, team2_goals: 0 });

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:4000/matches/${matchId}`);
      const data = await res.json();
      setMatch(data);
      setGoals({
        team1_goals: data.team1_goals,
        team2_goals: data.team2_goals,
      });

      const [t1, t2] = await Promise.all([
        fetch(`http://localhost:4000/teams/${data.team1_id}`),
        fetch(`http://localhost:4000/teams/${data.team2_id}`),
      ]);
      setTeam1(await t1.json());
      setTeam2(await t2.json());

      const [res1, res2] = await Promise.all([
        fetch(`http://localhost:4000/players/team/${data.team1_id}`),
        fetch(`http://localhost:4000/players/team/${data.team2_id}`),
      ]);

      setPlayers1(await res1.json());
      setPlayers2(await res2.json());
      setTeam1Id(data.team1_id);
      setTeam2Id(data.team2_id);
      setIsLive(data.match_status === "live");
      setIsFinished(data.match_status === "played");
      setIsGroupStage(data.stage === "skupine");
    };

    load();
  }, [matchId]);

  const increment = (
    player: Player,
    team: "team1" | "team2",
    type: "scorers" | "yellows" | "reds"
  ) => {
    const state = { scorers, yellows, reds }[type];
    const setter = { scorers: setScorers, yellows: setYellows, reds: setReds }[
      type
    ];

    const list = state[team];
    const existing = list.find((e) => e.player_id === player._id);
    const updated = existing
      ? list.map((e) =>
          e.player_id === player._id ? { ...e, count: e.count + 1 } : e
        )
      : [
          ...list,
          { player_id: player._id, player_name: player.name, count: 1 },
        ];

    setter((prev) => ({ ...prev, [team]: updated }));
  };

  const updatePlayers = async () => {
    const allPlayers = [
      ...scorers.team1.map((p) => ({
        player_id: p.player_id,
        data: { goals: p.count },
      })),
      ...scorers.team2.map((p) => ({
        player_id: p.player_id,
        data: { goals: p.count },
      })),
      ...yellows.team1.map((p) => ({
        player_id: p.player_id,
        data: { yellow_cards: p.count },
      })),
      ...yellows.team2.map((p) => ({
        player_id: p.player_id,
        data: { yellow_cards: p.count },
      })),
      ...reds.team1.map((p) => ({
        player_id: p.player_id,
        data: { red_cards: p.count },
      })),
      ...reds.team2.map((p) => ({
        player_id: p.player_id,
        data: { red_cards: p.count },
      })),
    ];

    try {
      for (const { player_id, data } of allPlayers) {
        await fetch(`http://localhost:4000/players/${player_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      alert("Vsi igralci uspešno posodobljeni.");
    } catch (err) {
      console.error("Napaka pri posodabljanju igralcev:", err);
      alert("Napaka pri shranjevanju.");
    }
  };

  const updateTeamDraw = async () => {
    const res = await fetch(`http://localhost:4000/teams/${team1Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: team1!.points + 1,
        goals_scored: team1!.goals_scored + goals.team1_goals,
        goals_conceded: team1!.goals_conceded + goals.team2_goals,
        goals_diff: team1!.goals_diff + (goals.team1_goals - goals.team2_goals),
        draws: team1!.draws + 1,
        matches_played: team1!.matches_played + 1,
      }),
    });

    const res1 = await fetch(`http://localhost:4000/teams/${team2Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: team2!.points + 1,
        goals_scored: team2!.goals_scored + goals.team2_goals,
        goals_conceded: team2!.goals_conceded + goals.team1_goals,
        goals_diff: team2!.goals_diff + (goals.team2_goals - goals.team1_goals),
        draws: team2!.draws + 1,
        matches_played: team2!.matches_played + 1,
      }),
    });

    if (res.ok && res1.ok) alert("Shranjeno!");
    else alert("Napaka pri shranjevanju");
  };

  const updateTeam = async (winner: string) => {
    let points = 0;
    let wins = 0;
    let losses = 0;
    if (winner === team1Id) {
      points = 3;
      wins = 1;
    } else {
      losses = 1;
    }
    const res = await fetch(`http://localhost:4000/teams/${team1Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: team1!.points + points,
        goals_scored: team1!.goals_scored + goals.team1_goals,
        goals_conceded: team1!.goals_conceded + goals.team2_goals,
        goals_diff: team1!.goals_diff + (goals.team1_goals - goals.team2_goals),
        wins: team1!.wins + wins,
        losses: team1!.losses + losses,
        matches_played: team1!.matches_played + 1,
      }),
    });

    let pointsT2 = 0;
    let winsT2 = 0;
    let lossesT2 = 0;
    if (winner === team2Id) {
      pointsT2 = 3;
      winsT2 = 1;
    } else {
      lossesT2 = 1;
    }

    const res1 = await fetch(`http://localhost:4000/teams/${team2Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: team2!.points + pointsT2,
        goals_scored: team2!.goals_scored + goals.team2_goals,
        goals_conceded: team2!.goals_conceded + goals.team1_goals,
        goals_diff: team2!.goals_diff + (goals.team2_goals - goals.team1_goals),
        wins: team2!.wins + winsT2,
        losses: team2!.losses + lossesT2,
        matches_played: team2!.matches_played + 1,
      }),
    });

    if (res.ok && res1.ok) alert("Shranjeno!");
    else alert("Napaka pri shranjevanju");
  };

  const handleSave = async () => {
    let winner = null;
    let match_status;
    if (goals.team1_goals > goals.team2_goals) {
      winner = team1Id;
    } else if (goals.team1_goals < goals.team2_goals) {
      winner = team2Id;
    }

    if (isLive) {
      match_status = "live";
    } else if (isFinished) {
      match_status = "played";
    } else {
      match_status = "notPlayed";
    }

    const res = await fetch(`http://localhost:4000/matches/${matchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team1_goals: goals.team1_goals,
        team2_goals: goals.team2_goals,
        team1_scorers: scorers.team1.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          goals: e.count,
        })),
        team2_scorers: scorers.team2.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          goals: e.count,
        })),
        team1_yellow_cards: yellows.team1.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          cards: e.count,
        })),
        team2_yellow_cards: yellows.team2.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          cards: e.count,
        })),
        team1_red_cards: reds.team1.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          cards: e.count,
        })),
        team2_red_cards: reds.team2.map((e) => ({
          player_id: e.player_id,
          player_name: e.player_name,
          cards: e.count,
        })),
        match_status: match_status,
        advantage: advantage,
        winner: winner,
      }),
    });

    if (res.ok) alert("Shranjeno!");
    else alert("Napaka pri shranjevanju");

    if (isFinished && isGroupStage) {
      if (winner != null) {
        updateTeam(winner);
      } else {
        updateTeamDraw();
      }
    }
    if (isFinished && !isGroupStage) {
      updatePlayers();
    }
  };

  if (!match || !team1 || !team2) return <div>Nalaganje...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Uredi tekmo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamCard
          teamName={match.team1_name}
          players={players1}
          goals={goals.team1_goals}
          setGoals={(val) => setGoals((g) => ({ ...g, team1_goals: val }))}
          onGoal={(p) => increment(p, "team1", "scorers")}
          onYellow={(p) => increment(p, "team1", "yellows")}
          onRed={(p) => increment(p, "team1", "reds")}
          scorerCounts={scorers.team1}
          yellowCounts={yellows.team1}
          redCounts={reds.team1}
        />

        <TeamCard
          teamName={match.team2_name}
          players={players2}
          goals={goals.team2_goals}
          setGoals={(val) => setGoals((g) => ({ ...g, team2_goals: val }))}
          onGoal={(p) => increment(p, "team2", "scorers")}
          onYellow={(p) => increment(p, "team2", "yellows")}
          onRed={(p) => increment(p, "team2", "reds")}
          scorerCounts={scorers.team2}
          yellowCounts={yellows.team2}
          redCounts={reds.team2}
        />
      </div>
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Shrani tekmo
        </button>
      </div>
      <label className="inline-flex items-center text-lg text-gray-800 font-medium cursor-pointer"></label>
      V živo:
      <input
        type="checkbox"
        checked={isLive}
        onChange={(e) => setIsLive(e.target.checked)}
        className="form-checkbox h-5 w-5 text-[#b3542d] border-gray-300 rounded focus:ring-2 focus:ring-orange-300 ml-2"
      />
      <label />
      <label className="inline-flex ml-10 items-center text-lg text-gray-800 font-medium cursor-pointer"></label>
      Zaključeno:
      <input
        type="checkbox"
        checked={isFinished}
        onChange={(e) => setIsFinished(e.target.checked)}
        className="form-checkbox h-5 w-5 text-[#b3542d] border-gray-300 rounded focus:ring-2 focus:ring-orange-300 ml-2"
      />
      <label />
      <div>
        {" "}
        <button
          onClick={() => setAdvantage(team1Id)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {match.team1_name}
        </button>
        <button
          onClick={() => setAdvantage(team2Id)}
          className="bg-green-600 text-white ml-10 px-6 py-2 rounded hover:bg-green-700"
        >
          {match.team2_name}
        </button>
      </div>
      <p>  ADVANTAGE: {advantage}</p>
    </div>
  );
}

type TeamCardProps = {
  teamName: string;
  players: Player[];
  goals: number;
  setGoals: (val: number) => void;
  onGoal: (p: Player) => void;
  onYellow: (p: Player) => void;
  onRed: (p: Player) => void;
  scorerCounts: PlayerEvent[];
  yellowCounts: PlayerEvent[];
  redCounts: PlayerEvent[];
};

function TeamCard({
  teamName,
  players,
  goals,
  setGoals,
  onGoal,
  onYellow,
  onRed,
  scorerCounts,
  yellowCounts,
  redCounts,
}: TeamCardProps) {
  const getCount = (arr: PlayerEvent[], id: string) =>
    arr.find((e) => e.player_id === id)?.count || 0;

  return (
    <div className=" p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{teamName}</h2>
      <input
        type="number"
        className="border px-2 py-1 rounded mb-4 w-24"
        value={goals}
        onChange={(e) => setGoals(parseInt(e.target.value) || 0)}
      />

      {players.map((p) => (
        <div key={p._id} className="flex justify-between items-center py-1 ">
          <span>{p.name}</span>
          <div className="flex gap-2 items-center">
            {getCount(scorerCounts, p._id) > 0 && (
              <span>{getCount(scorerCounts, p._id)}</span>
            )}
            <button onClick={() => onGoal(p)} title="Gol">
              ⚽
            </button>
            {getCount(yellowCounts, p._id) > 0 && (
              <span>{getCount(yellowCounts, p._id)}</span>
            )}

            <button onClick={() => onYellow(p)} title="Rumen karton">
              🟨
            </button>
            {getCount(redCounts, p._id) > 0 && (
              <span>{getCount(redCounts, p._id)}</span>
            )}
            <button onClick={() => onRed(p)} title="Rdeč karton">
              🟥
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
