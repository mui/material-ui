/* eslint-disable global-require */
const iconsByEntrywayId = {
  1: require('./images/ill_ovriga_besvar.svg'),
  2: require('./images/ill_urinvagsbesvar.svg'),
  3: require('./images/ill_ont_i_halsen.svg'),
  4: require('./images/ill_somnsvarigheter.svg'),
  // psykolog
  102: require('./images/ill_somnsvarigheter.svg'),
  5: require('./images/ill_bihalebesvar.svg'),
  6: require('./images/ill_magbesvar_ovre.svg'),
  7: require('./images/ill_receptfornyelse.svg'),
  8: require('./images/ill_hudbesvar.svg'),
  9: require('./images/ill_fodelsemarke.svg'),
  10: require('./images/ill_magbesvar_nedre.svg'),
  11: require('./images/ill_huvudvark.svg'),
  12: require('./images/ill_hosta.svg'),
  13: require('./images/ill_ryggont.svg'),
  14: require('./images/ill_erektionsbesvar.svg'),
  15: require('./images/ill_ledbesvar.svg'),
  16: require('./images/ill_ogoninflammation.svg'),
  17: require('./images/ill_borrelia.svg'),
  18: require('./images/ill_preventivmedel.svg'),
  19: require('./images/ill_stress_oro_depression.svg'),
  20: require('./images/ill_allergi.svg'), // allergy B2B
  21: require('./images/ill_allergi.svg'), // allergy B2C
  22: require('./images/ill_barn_eksem.svg'),
  23: require('./images/ill_barn_forstoppning.svg'),
  24: require('./images/ill_barn_ont_i_halsen.svg'),
  25: require('./images/ill_barn_diarre_och_krakningar.svg'),
  26: undefined, // deprecated mental health
  27: undefined, // general health
  28: undefined, // physio therapi
  29: require('./images/ill_forskjuta_mens.svg'),
  30: require('./images/ill_urinvagsbesvar.svg'), // uti youth
  31: require('./images/ill_ont_i_halsen.svg'), // tonsillitis youth
  32: require('./images/ill_bihalebesvar.svg'), // sinusitisYoth
  33: require('./images/ill_magbesvar_ovre.svg'), // gastricProblemsUpperYouth
  34: require('./images/ill_hudbesvar.svg'), // rashYouth
  35: require('./images/ill_fodelsemarke.svg'), // birthmarkSkinTumorYouth
  36: require('./images/ill_magbesvar_nedre.svg'), // gastricProblemsLowerYouth
  37: require('./images/ill_huvudvark.svg'), // headacheYouth
  38: require('./images/ill_hosta.svg'), // coughYouth
  39: require('./images/ill_ogoninflammation.svg'), // conjunctivitisYouth
  40: require('./images/ill_borrelia.svg'), // borreliaYouth
  41: require('./images/ill_allergi.svg'), // allergyYouth
  42: require('./images/ill_barn_vattkoppor.svg'),
  43: require('./images/ill_barn_ogoninflammation.svg'),
  44: require('./images/ill_akne.svg'),
  45: require('./images/ill_klamydia.svg'),
  46: require('./images/ill_muskelochledbesvar.svg'),
  47: require('./images/ill_herpes.svg'),
  48: require('./images/ill_receptfornyelse.svg'), // renewalApoteket
  49: require('./images/ill_preventivmedel.svg'), // anticonceptionApoteket
  50: require('./images/ill_barn_borrelia.svg'),
  51: require('./images/ill_barn_akne.svg'),
  // 52: require('./images/ic_revisit.svg'),
  // 53: require('./images/ic_revisit.svg'), // revisit under 18
  54: require('./images/ill_barn_klada_i_rumpan.svg'),
  55: require('./images/ill_illaluktande_flytningar.svg'),
  56: require('./images/ill_nagelsvamp.svg'),
  57: require('./images/ill_barn_insektsbett.svg'),
  58: require('./images/ill_klada_i_underlivet.svg'),
  59: require('./images/ill_vartor_i_underlivet.svg'),
  60: require('./images/ill_insektsbett.svg'),
  61: require('./images/ill_premens_besvar.svg'),
  62: require('./images/ill_klimakteriebesvar.svg'),
  63: require('./images/ill_haravfall.svg'),
  64: require('./images/ill_barn_ovriga_besvar.svg'),
  65: require('./images/ill_fortidigutlosning.svg'),
  66: require('./images/ill_muskelochledbesvar.svg'), // physio
  67: require('./images/ill_muskelochledbesvar.svg'), // physioRevisitCaregiver
  68: undefined, // invitationFromPhysioToDoctor
  69: require('./images/ill_muskelochledbesvar.svg'), // invitationFromDoctorToPhysio
  70: require('./images/ill_muskelochledbesvar.svg'), // invitationFromDoctorToPhysioFull
  71: require('./images/ill_muskelochledbesvar.svg'), // physioRevisitPatient
  73: require('./images/ill_thyroid.svg'), // thyroid
  103: require('./images/ill_adult_pregnancy.svg'),
};

export const fallbackIcon = require('./images/ill_placeholder.svg');

export function getIconByEntrywayId(id) {
  return iconsByEntrywayId[id] || fallbackIcon;
}

export default getIconByEntrywayId;
