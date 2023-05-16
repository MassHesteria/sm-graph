export const kraidslairEdges = {
  Door_KraidsLair: {
    EnergyTank_Kraid: (samus) =>
      samus.canDefeatKraid &&
      (samus.missilePacks >= 1 ||
        samus.hasScrewAttack ||
        samus.canUseBombs ||
        samus.canUsePowerBombs),
    KraidsHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  EnergyTank_Kraid: {
    Door_KraidsLair: (_) => true,
  },

  KraidsHallway: {
    Door_KraidsLair: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    Missiles_Kraid: (samus) => samus.canUsePowerBombs,
    Door_KraidBoss: (samus) => samus.canOpenRedDoors,
  },

  Missiles_Kraid: {
    KraidsHallway: (_) => true,
  },

  Door_KraidBoss: {
    KraidsHallway: (_) => true,
  },
};
