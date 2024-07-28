import Game from "./game/Game";

const MobileLegends = () => {
  return (
    <Game
      nameGame={"MobileLegends"}
      arrayRank={[
        "Warrior",
        "Elite",
        "Master",
        "Grandmaster",
        "Epic",
        "Legend",
        "Mythic",
      ]}
    />
  );
};

export default MobileLegends;
