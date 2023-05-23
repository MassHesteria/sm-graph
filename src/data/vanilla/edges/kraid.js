export const kraidslairEdges = {
  Door_KraidsLair: {
    EnergyTank_Kraid: (samus) =>
      samus.canDefeatKraid && (samus.missilePacks >= 1 || samus.canDestroyBombWalls), //beetoms are bomb walls, trust me
    KraidsHallway: (samus) => samus.canPassBombPassages,
  },

  EnergyTank_Kraid: {
    Door_KraidsLair: true,
  },

  KraidsHallway: {
    Door_KraidsLair: (samus) => samus.canPassBombPassages,
    Missiles_Kraid: (samus) => samus.canUsePowerBombs,
    Door_KraidBoss: (samus) => samus.canOpenRedDoors,
  },

  Missiles_Kraid: {
    KraidsHallway: true,
  },

  Door_KraidBoss: {
    KraidsHallway: true,
  },
};
