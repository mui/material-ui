import * as icons from './icons';

export const iconsByEntrywayId = {
  1: icons.OvrigaBesvar,
  2: icons.Urinvagsbesvar,
  3: icons.OntIHalsen,
  4: icons.Somnsvarigheter,
  102: icons.Somnsvarigheter, // psykolog
  5: icons.Bihalebesvar,
  6: icons.MagbesvarOvre,
  7: icons.Receptfornyelse,
  8: icons.Hudbesvar,
  9: icons.Fodelsemarke,
  10: icons.MagbesvarNedre,
  11: icons.Huvudvark,
  12: icons.Hosta,
  13: icons.Ryggont,
  14: icons.Erektionsbesvar,
  15: icons.Ledbesvar,
  16: icons.Ogoninflammation,
  17: icons.Borrelia,
  18: icons.Preventivmedel,
  19: icons.StressOroDepression,
  20: icons.Allergi, // allergy B2B
  21: icons.Allergi, // allergy B2C
  22: icons.BarnEksem,
  23: icons.BarnForstoppning,
  24: icons.BarnOntIHalsen,
  25: icons.BarnDiarreOchKrakningar,
  26: undefined, // deprecated mental health
  27: undefined, // general health
  28: undefined, // physio therapi
  29: icons.ForskjutaMens,
  30: icons.Urinvagsbesvar, // uti youth
  31: icons.OntIHalsen, // tonsillitis youth
  32: icons.Bihalebesvar, // sinusitisYoth
  33: icons.MagbesvarOvre, // gastricProblemsUpperYouth
  34: icons.Hudbesvar, // rashYouth
  35: icons.Fodelsemarke, // birthmarkSkinTumorYouth
  36: icons.MagbesvarNedre, // gastricProblemsLowerYouth
  37: icons.Huvudvark, // headacheYouth
  38: icons.Hosta, // coughYouth
  39: icons.Ogoninflammation, // conjunctivitisYouth
  40: icons.Borrelia, // borreliaYouth
  41: icons.Allergi, // allergyYouth
  42: icons.BarnVattkoppor,
  43: icons.BarnOgoninflammation,
  44: icons.Akne,
  45: icons.Klamydia,
  46: icons.Muskelochledbesvar,
  47: icons.Herpes,
  48: icons.Receptfornyelse, // renewalApoteket
  49: icons.Preventivmedel, // anticonceptionApoteket
  50: icons.BarnBorrelia,
  51: icons.BarnAkne,
  // 52: icons.require('./images/ic_revisit.svg'),
  // 53: icons.require('./images/ic_revisit.svg'), // revisit under 18
  54: icons.BarnKladaIRumpan,
  55: icons.IllaluktandeFlytningar,
  56: icons.Nagelsvamp,
  57: icons.BarnInsektsbett,
  58: icons.KladaIUnderlivet,
  59: icons.VartorIUnderlivet,
  60: icons.Insektsbett,
  61: icons.PremensBesvar,
  62: icons.Klimakteriebesvar,
  63: icons.Haravfall,
  64: icons.BarnOvrigaBesvar,
  65: icons.Fortidigutlosning,
  66: icons.Muskelochledbesvar, // physio
  67: icons.Muskelochledbesvar, // physioRevisitCaregiver
  68: undefined, // invitationFromPhysioToDoctor
  69: icons.Muskelochledbesvar, // invitationFromDoctorToPhysio
  70: icons.Muskelochledbesvar, // invitationFromDoctorToPhysioFull
  71: icons.Muskelochledbesvar, // physioRevisitPatient
  73: icons.Thyroid, // thyroid
  103: icons.AdultPregnancy,
};

export function getIconByEntrywayId(id) {
  if (iconsByEntrywayId[id]) {
    return iconsByEntrywayId[id];
  }
  return icons.Placeholder;
}

export default getIconByEntrywayId;
