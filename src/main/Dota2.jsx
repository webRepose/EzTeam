import Game from "./game/Game";

const Dota2 = () => {
  return (
    <Game
      nameGame={"Dota 2"}
      arrayRank={[
        "No-Rank",
        "Herald",
        "Guardian",
        "Crusader",
        "Archon",
        "Legend",
        "Ancient",
        "Divine",
        "Immortal",
      ]}
    />
  );
};

export default Dota2;
