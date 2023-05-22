import { performVerifiedFill, getMajorMinorPrePool, isValidMajorMinor } from "./dash/itemPlacement";
import { getLocations } from "./dash/locations";
import Loadout from "./dash/loadout";
import ModeStandard from "./dash/modes/modeStandard";

const mapLocation = (name) => {
  const mappings = [
    ["Supers (WS Right)", "Supers_RightSide"],
    ["Supers (WS Left)", "Supers_LeftSide"],
    ["Missiles (Sky)", "Missiles_Sky"],
    ["Missiles (Spooky)", "Missiles_Spooky"],
    ["Missiles (Attic)", "Missiles_Attic"],
    ["Morphing Ball", "MorphBall"],
    ["Missiles (Moat)", "Missiles_Moat"],
    ["Bombs", "Bombs"],
    ["Energy Tank (Brinstar Ceiling)", "EnergyTank_Ceiling"],
    ["Space Jump", "Boss_Draygon"],
    ["Energy Tank (Ridley)", "Boss_Ridley"],
    ["Varia Suit", "Boss_Kraid"],
    ["Energy Tank (Gauntlet)", "EnergyTank_Gauntlet"],
    ["Missiles (Gauntlet Right)", "Missiles_GauntletRight"],
    ["Missiles (Gauntlet Left)", "Missiles_GauntletLeft"],
    ["Energy Tank (Terminator)", "EnergyTank_Terminator"],
    ["Missiles (230)", "Missiles_230"],
    ["Power Bombs (Landing Site)", "PBs_LandingSite"],
    ["Supers (Climb)", "Supers_Climb"],
    ["Missiles (Alpha)", "Missiles_Alpha"],
    ["Power Bombs (Alpha)", "PBs_Alpha"],
    ["Missiles (Alpha PBs)", "Missiles_AlphaPBs"],
    ["Missiles (Beta)", "Missiles_Beta"],
    ["Power Bombs (Beta)", "PBs_Beta"],
    ["Missiles (Ocean Bottom)", "Missiles_Ocean"],
    ["Missiles (Ocean Middle)", "Missiles_OceanMiddle"],
    ["Missiles (Mother Brain)", "Missiles_OldMB"],
    ["Missiles (Billy Mays 1)", "Missiles_BillyMays1"],
    ["Missiles (Billy Mays 2)", "Missiles_BillyMays2"],
    ["Power Bombs (Etecoons)", "PBs_Etecoons"],
    ["Energy Tank (Etecoons)", "EnergyTank_Etecoons"],
    ["Supers (Etecoons)", "Supers_Etecoons"],
    ["Supers (Spore Spawn)", "Supers_SpoSpo"],
    ["Power Bombs (Morph)", "PBs_Retro"],
    ["Missiles (Early Bridge)", "Missiles_EarlySupers"],
    ["Supers (Early Bridge)", "Supers_EarlySupers"],
    ["Reserve Tank (Brinstar)", "ReserveTank_Brinstar"],
    ["Missiles (Brin Reserve 2)", "Missiles_BrinstarReserve2"],
    ["Missiles (Brin Reserve 1)", "Missiles_BrinstarReserve1"],
    ["Missiles (Big Pink)", "Missiles_BigPink"],
    ["Missiles (Charge)", "Missiles_Charge"],
    ["Charge Beam", "ChargeBeam"],
    ["Power Bombs (Mission Impossible)", "PBs_Impossible"],
    ["Missiles (Brin Tube)", "Missiles_Tube"],
    ["Energy Tank (Waterway)", "EnergyTank_Waterway"],
    ["Energy Tank (Wave Gate)", "EnergyTank_WaveGate"],
    ["Energy Tank (Crocomire)", "EnergyTank_Croc"],
    ["Grapple Beam", "GrappleBeam"],
    ["Xray Scope", "XrayScope"],
    ["Spazer", "Spazer"],
    ["Missiles (Cosine)", "Missiles_Cosine"],
    ["Missiles (Indiana Jones)", "Missiles_IndianaJones"],
    ["Missiles (Croc Escape)", "Missiles_CrocEscape"],
    ["Power Bombs (Crocomire)", "PBs_Croc"],
    ["Energy Tank (Botwoon)", "EnergyTank_Botwoon"],
    ["Missiles (Aqueduct)", "Missiles_Aqueduct"],
    ["Supers (Aqueduct)", "Supers_Aqueduct"],
    ["Missiles (Precious)", "Missiles_Precious"],
    ["Energy Tank (Kraid)", "EnergyTank_Kraid"],
    ["Missiles (Kraid)", "Missiles_Kraid"],
    ["Missiles (Cathedral)", "Missiles_Cathedral"],
    ["Missiles (Mainstreet)", "Missiles_MainStreet"],
    ["Supers (Crab)", "Supers_Crab"],
    ["Energy Tank (Mama Turtle)", "EnergyTank_MamaTurtle"],
    ["Missiles (Mama Turtle)", "Missiles_MamaTurtle"],
    ["Supers (Watering Hole)", "Supers_WateringHole"],
    ["Missiles (Watering Hole)", "Missiles_WateringHole"],
    ["Missiles (Beach)", "Missiles_Beach"],
    ["Plasma Beam", "PlasmaBeam"],
    ["Missiles (Sand Pit Left)", "Missiles_LeftSandPit"],
    ["Reserve Tank (Maridia)", "ReserveTank_LeftSandPit"],
    ["Missiles (Sand Pit Right)", "Missiles_RightSandPit"],
    ["Power Bombs (Sand Pit Right)", "PBs_RightSandPit"],
    ["Spring Ball", "SpringBall"],
    ["Energy Tank (Firefleas)", "EnergyTank_Firefleas"],
    ["Ice Beam", "IceBeam"],
    ["Missiles (Crumble Shaft)", "Missiles_CrumbleShaft"],
    ["Missiles (GT)", "Missiles_GT"],
    ["Supers (GT)", "Supers_GT"],
    ["Missiles (Maze)", "Missiles_Maze"],
    ["Power Bombs (Maze)", "PBs_Maze"],
    ["HiJump Boots", "HiJumpBoots"],
    ["Missiles (HJB)", "Missiles_HiJump"],
    ["Energy Tank (HJB)", "EnergyTank_HiJump"],
    ["Missiles (Mickey Mouse)", "Missiles_MickeyMouse"],
    ["Reserve Tank (Norfair)", "ReserveTank_Norfair"],
    ["Missiles (Norfair Reserve 2)", "Missiles_NorfairReserve2"],
    ["Missiles (Norfair Reserve 1)", "Missiles_NorfairReserve1"],
    ["Missiles (Bubble Mountain)", "Missiles_BubbleMountain"],
    ["Missiles (Speed)", "Missiles_SpeedBooster"],
    ["Speed Booster", "SpeedBooster"],
    ["Missiles (Three Muskateers)", "Missiles_Muskateers"],
    ["Missiles (Wave)", "Missiles_Wave"],
    ["Wave Beam", "WaveBeam"],
    ["Power Bombs (Shame)", "PBs_Shame"],
    ["Screw Attack", "ScrewAttack"],
    ["Reserve Tank (Wrecked Ship)", "ReserveTank_Ship"],
    ["Missiles (Bowling)", "Missiles_Bowling"],
    ["Energy Tank (Wrecked Ship)", "EnergyTank_Ship"],
    ["Gravity Suit", "GravitySuit"],
  ];

  const mapped = mappings.find((m) => m[0] == name);
  if (mapped != undefined) {
    return mapped[1];
  }
  throw new Error("missing " + name);
};

export const standardMajorMinor = (seed) => {
  const mode = new ModeStandard(seed, getLocations());
  const getPrePool = getMajorMinorPrePool;
  const canPlaceItem = isValidMajorMinor;

  // Setup the initial loadout.
  let initLoad = new Loadout();
  initLoad.hasCharge = true;

  // Place the items.
  performVerifiedFill(seed, mode.nodes, mode.itemPool, getPrePool, initLoad, canPlaceItem);
  mode.nodes.forEach((n) => (n.location.name = mapLocation(n.location.name)));
  return mode.nodes;
};
