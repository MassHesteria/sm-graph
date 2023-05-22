export const greenbrinstarEdges = {
  Door_GreenElevator: {
    Missiles_EarlySupers: (samus) => samus.canOpenRedDoors,
    EnergyTank_Etecoons: (samus) => samus.canUsePowerBombs,
    DachoraRoomLeft: (_) => true,
  },

  Missiles_EarlySupers: {
    Door_GreenElevator: (_) => true,
    Supers_EarlySupers: (samus) => samus.hasMorph || samus.hasSpeed,
  },

  Supers_EarlySupers: {
    Missiles_EarlySupers: (_) => true,
    ReserveTank_Brinstar: (samus) => samus.canOpenRedDoors,
  },

  ReserveTank_Brinstar: {
    Supers_EarlySupers: (_) => true,
    Missiles_BrinstarReserve1: (samus) => samus.hasMorph,
  },

  Missiles_BrinstarReserve1: {
    ReserveTank_Brinstar: (samus) => samus.hasMorph,
    Missiles_BrinstarReserve2: (samus) => samus.canDestroyBombWalls,
  },

  Missiles_BrinstarReserve2: {
    Missiles_BrinstarReserve1: (_) => true,
    ReserveTank_Brinstar: (samus) => samus.hasMorph,
  },

  EnergyTank_Etecoons: {
    Door_GreenElevator: (samus) => samus.canUsePowerBombs,
    Supers_Etecoons: (samus) => samus.canOpenGreenDoors,
    PBs_Etecoons: (samus) => samus.hasMorph,
  },

  Supers_Etecoons: {
    EnergyTank_Etecoons: (_) => true,
  },

  PBs_Etecoons: {
    EnergyTank_Etecoons: (samus) => samus.hasMorph,
  },

  DachoraRoomLeft: {
    Door_GreenElevator: (_) => true,
    DachoraRoomRight: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
  },

  DachoraRoomRight: {
    DachoraRoomLeft: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
    Missiles_BigPink: (_) => true,
  },

  Missiles_BigPink: {
    DachoraRoomRight: (_) => true,
    Missiles_Charge: (_) => true,
    EnergyTank_WaveGate: (samus) =>
      samus.canUsePowerBombs && (samus.superPacks >= 1 || samus.hasWave),
    Supers_SpoSpo: (samus) => samus.canPassBombPassages && samus.superPacks >= 1,
    PBs_Impossible: (samus) => samus.canUsePowerBombs && samus.canOpenGreenDoors,
  },

  PBs_Impossible: {
    Missiles_BigPink: (samus) => samus.canPassBombPassages,
  },

  Supers_SpoSpo: {
    Missiles_BigPink: (samus) => samus.canPassBombPassages && samus.superPacks >= 1,
  },

  Missiles_Charge: {
    Missiles_BigPink: (_) => true,
    ChargeBeam: (samus) => samus.canPassBombPassages,
    Missiles_Tube: (samus) => samus.canOpenGreenDoors,
  },

  ChargeBeam: {
    Missiles_Charge: (samus) => samus.canPassBombPassages,
    EnergyTank_Waterway: (samus) =>
      samus.canUsePowerBombs && samus.canOpenRedDoors && samus.hasSpeed,
  },

  EnergyTank_Waterway: {
    ChargeBeam: (samus) => samus.canUsePowerBombs,
  },

  Missiles_Tube: {
    Missiles_Charge: (_) => true,
    Door_NoobBridge: (samus) => samus.canOpenGreenDoors,
    Door_GreenHills: (samus) => samus.canUsePowerBombs,
  },

  Door_GreenHills: {
    Missiles_Tube: (_) => true,
  },

  Door_NoobBridge: {
    Missiles_Tube: (samus) => samus.superPacks >= 1 || samus.hasWave,
  },

  EnergyTank_WaveGate: {
    Missiles_BigPink: (_) => true,
  },
};
