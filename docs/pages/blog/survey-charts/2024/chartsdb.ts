import CommunityJobs from "./CommunityJobs";
import FirstHearAboutMUI from "./FirstHearAboutMUI";
import HowDisappointingWithoutMUI from "./HowDisappointingWithoutMUI";
import HowLikelyToRecommend from "./HowLikelyToRecommend";
import BenefitsDataGrid from "./BenefitsDataGrid";
import HowCanWeImproveMUIX from "./HowCanWeImproveMUIX";
import HowComfortableWithTechnologies from "./HowComfortableWithTechnologies";
import WhatStylingSolutions from "./WhatStylingSolutions";
import WhatCommunityIsBuilding from "./WhatCommunityIsBuilding";
import WhoCommunityBuildsFor from "./WhoCommunityBuildsFor";
import MostImportantCriteriaToPickLibrary from "./MostImportantCriteriaToPickLibrary";
import HowSatisfied from "./HowSatisfied";
import MUIDiferentiators from "./MUIDiferentiators";
import MUIInitiatives from "./MUIInitiatives";
import WhereAreCompaniesBased from "./WhereAreCompaniesBased";
import HowManyFETeam from "./HowManyFETeam";
import HowManyFECompany from "./HowManyFECompany";
import HowManyEmployeesTotal from "./HowManyEmployeesTotal";
import UsingMUIX from "./UsingMUIX";
import PerpetualLicenseImportance from "./PerpetualLicenseImportance";
import LowCodeToolsFamiliarity from "./LowCodeToolsFamiliariy";
import MostImportantLowCodeTools from "./MostImportantLowCodeTools";
import HowManyInternalApps from "./HowManyInternalApps";
import ServerAPIs from "./ServerAPIs";
import HowManyInternalAppUsers from "./HowManyInternalAppUsers";
import BenefitsMUI from "./BenefitsMUI";
import HowCanWeImproveMUI from "./HowCanWeImproveMUI";
import WhatOtherLibrariesDoYouUse from "./WhatOtherLibrariesDoYouUse";
import WhatChallengesMakeYouConsiderCommercialLicense from "./WhatChallengesMakeYouConsiderCommercialLicense";
import LowCodeToolsNames from "./LowCodeToolsNames";

export type AvailableChart = {
  qid: number;
  name: string;
  component: () => React.JSX.Element;
};

export const availableCharts: AvailableChart[] = [
  { qid: 1, name: "The role of community members", component: CommunityJobs },
  { qid: 2, name: "First hear about MUI", component: FirstHearAboutMUI },
  {
    qid: 3,
    name: "What the community is building",
    component: WhatCommunityIsBuilding
  },
  {
    qid: 4,
    name: "Who the community builds for",
    component: WhoCommunityBuildsFor
  },
  {
    qid: 5,
    name: "How disappointing without MUI",
    component: HowDisappointingWithoutMUI
  },
  { qid: 6, name: "How likely to recommend", component: HowLikelyToRecommend },
  {
    qid: 7,
    name: "Most important criteria to pick a library",
    component: MostImportantCriteriaToPickLibrary
  },
  { qid: 8, name: "Satisfaction with products", component: HowSatisfied },
  { qid: 9, name: "Benefits of MUI", component: BenefitsMUI },
  { qid: 10, name: "How can we improve MUI", component: HowCanWeImproveMUI },
  { qid: 11, name: "MUI Diferentiators", component: MUIDiferentiators },
  { qid: 12, name: "MUI Initiatives", component: MUIInitiatives },

  {
    qid: 13,
    name: "Where are the companies based",
    component: WhereAreCompaniesBased
  },

  { qid: 14, name: "How many FE on the team", component: HowManyFETeam },
  { qid: 15, name: "How many FE on the company", component: HowManyFECompany },
  {
    qid: 16,
    name: "How many employess total",
    component: HowManyEmployeesTotal
  },

  {
    qid: 17,
    name: "How comfortable with the technologies",
    component: HowComfortableWithTechnologies
  },
  { qid: 18, name: "What styling solutions", component: WhatStylingSolutions },
  {
    qid: 19,
    name: "What other libraries are used",
    component: WhatOtherLibrariesDoYouUse
  },
  { qid: 20, name: "How many are using MUIX", component: UsingMUIX },
  { qid: 21, name: "Benefits of the DataGrid", component: BenefitsDataGrid },
  { qid: 22, name: "How can we improve MUIX", component: HowCanWeImproveMUIX },
  {
    qid: 23,
    name: "What Challenges make you consider a Commercial plan",
    component: WhatChallengesMakeYouConsiderCommercialLicense
  },
  {
    qid: 24,
    name: "Perpetual license importance",
    component: PerpetualLicenseImportance
  },
  {
    qid: 25,
    name: "Low code tools familiarity",
    component: LowCodeToolsFamiliarity
  },
  {
    qid: 26,
    name: "Most important lowcode features",
    component: MostImportantLowCodeTools
  },
  {
    qid: 27,
    name: "How many internal apps",
    component: HowManyInternalApps
  },
  {
    qid: 28,
    name: "How many internal AppUsers",
    component: HowManyInternalAppUsers
  },
  {
    qid: 29,
    name: "Server APIs",
    component: ServerAPIs
  },
  {
    qid: 30,
    name: "Low code tools names",
    component: LowCodeToolsNames
  }
];
