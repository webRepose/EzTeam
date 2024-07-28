import Game from "./game/Game";

const Pubg = () => {
  return (
    <Game
      nameGame={"PUBG"}
      arrayRank={[
        "No-Rank",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Elite",
        "Master",
        "Grandmaster",
      ]}
    />
  );
};

export default Pubg;
