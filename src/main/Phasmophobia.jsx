import Game from "./game/Game";

const Phasmophobia = () => {
  return (
    <Game
      nameGame={"Phasmophobia"}
      arrayRank={[
        "No-Rank",
        "Amateur",
        "Intermediate",
        "Professional",
      ]}
    />
  );
};

export default Phasmophobia;
