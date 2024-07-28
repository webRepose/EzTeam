import Game from "./game/Game";

const RainbowSix = () => {
  return (
    <Game
      nameGame={"RainbowSix"}
      arrayRank={[
        "No-Rank",
        "Copper (IV, III, II, I)",
        "Bronze (IV, III, II, I)",
        "Silver (IV, III, II, I)",
        "Gold (IV, III, II, I)",
        "Platinum (III, II, I)",
        "Diamond",
      ]}
    />
  );
};

export default RainbowSix;
