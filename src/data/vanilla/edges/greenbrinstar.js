export const greenbrinstarEdges = {
  Door_GreenElevator: {
    Missiles_EarlySupers: () => CanOpenRedDoors,
    EnergyTank_Etecoons: () => CanUsePowerBombs,
    DachoraRoomLeft: true,
  },

  Missiles_EarlySupers: {
    Door_GreenElevator: true,
    Supers_EarlySupers: () => HasMorph || HasSpeed,
  },

  Supers_EarlySupers: {
    Missiles_EarlySupers: true,
    ReserveTank_Brinstar: () => CanOpenRedDoors,
  },

  ReserveTank_Brinstar: {
    Supers_EarlySupers: true,
    Missiles_BrinstarReserve1: () => HasMorph,
  },

  Missiles_BrinstarReserve1: {
    ReserveTank_Brinstar: () => HasMorph,
    Missiles_BrinstarReserve2: () => CanDestroyBombWalls,
  },

  Missiles_BrinstarReserve2: {
    Missiles_BrinstarReserve1: true,
    ReserveTank_Brinstar: () => HasMorph,
  },

  EnergyTank_Etecoons: {
    Door_GreenElevator: () => CanUsePowerBombs,
    Supers_Etecoons: () => CanOpenGreenDoors,
    PBs_Etecoons: () => HasMorph,
  },

  Supers_Etecoons: {
    EnergyTank_Etecoons: true,
  },

  PBs_Etecoons: {
    EnergyTank_Etecoons: () => HasMorph,
  },

  DachoraRoomLeft: {
    Door_GreenElevator: true,
    DachoraRoomRight: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
  },

  DachoraRoomRight: {
    DachoraRoomLeft: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
    Missiles_BigPink: true,
  },

  Missiles_BigPink: {
    DachoraRoomRight: true,
    Missiles_Charge: true,
    EnergyTank_WaveGate: (samus) => CanUsePowerBombs && (samus.superPacks >= 1 || samus.hasWave),
    Supers_SpoSpo: () => CanOpenRedDoors,
    PBs_Impossible: () => CanUsePowerBombs && CanOpenGreenDoors,
  },

  PBs_Impossible: {
    Missiles_BigPink: (samus) => samus.canPassBombPassages,
  },

  Supers_SpoSpo: {
    Missiles_BigPink: (samus) => samus.canPassBombPassages && samus.superPacks >= 1,
  },

  Missiles_Charge: {
    Missiles_BigPink: true,
    ChargeBeam: (samus) => samus.canPassBombPassages,
    Missiles_Tube: () => CanOpenGreenDoors,
  },

  ChargeBeam: {
    Missiles_Charge: (samus) => samus.canPassBombPassages,
    EnergyTank_Waterway: () => CanUsePowerBombs && CanOpenRedDoors && HasSpeed,
  },

  EnergyTank_Waterway: {
    ChargeBeam: () => CanUsePowerBombs,
  },

  Missiles_Tube: {
    Missiles_Charge: true,
    Door_NoobBridge: () => CanOpenGreenDoors,
    Door_GreenHills: () => CanUsePowerBombs,
  },

  Door_GreenHills: {
    Missiles_Tube: true,
  },

  Door_NoobBridge: {
    Missiles_Tube: (samus) => samus.superPacks >= 1 || samus.hasWave,
  },

  EnergyTank_WaveGate: {
    Missiles_BigPink: true,
  },
};
