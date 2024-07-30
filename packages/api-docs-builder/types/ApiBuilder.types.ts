import { ReactDocgenApi } from 'react-docgen';
import { JSDocTagInfo } from 'typescript';
import { ComponentClassDefinition } from '@mui/internal-docs-utils';
import { ComponentInfo, Slot, HookInfo, SeeMore } from './utils.types';

export type AdditionalPropsInfo = {
  cssApi?: boolean;
  sx?: boolean;
  slotsApi?: boolean;
  'joy-size'?: boolean;
  'joy-color'?: boolean;
  'joy-variant'?: boolean;
};

/**
 * Common interface for both Component and Hook API builders.
 */
interface CommonReactApi extends ReactDocgenApi {
  demos: ReturnType<HookInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  description: string;
  /**
   * Different ways to import components
   */
  imports: string[];
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  /**
   * The folder used to store the API translation.
   */
  apiDocsTranslationFolder?: string;
  deprecated: true | undefined;
}

export interface ComponentReactApi extends CommonReactApi {
  forwardsRefTo: string | undefined;
  inheritance: ReturnType<ComponentInfo['getInheritance']>;
  /**
   * react component name
   * @example 'Accordion'
   */
  name: string;
  muiName: string;
  spread: boolean | undefined;
  /**
   * If `true`, the component supports theme default props customization.
   * If `null`, we couldn't infer this information.
   * If `undefined`, it's not applicable in this context, for example Base UI components.
   */
  themeDefaultProps: boolean | undefined | null;
  classes: ComponentClassDefinition[];
  slots: Slot[];
  propsTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
    signature: undefined | { type: string; describedArgs?: string[]; returned?: string };
    additionalInfo?: AdditionalPropsInfo;
    seeMoreLink?: SeeMore['link'];
  }>;
  translations: {
    componentDescription: string;
    deprecationInfo: string | undefined;
    propDescriptions: {
      [key: string]: {
        description: string;
        requiresRef?: boolean;
        deprecated?: string;
        typeDescriptions?: { [t: string]: string };
        seeMoreText?: string;
      };
    };
    classDescriptions: {
      [key: string]: {
        description: string;
        conditions?: string;
        nodeName?: string;
        deprecationInfo?: string;
      };
    };
    slotDescriptions?: { [key: string]: string };
  };
}

export interface ParsedProperty {
  name: string;
  description: string;
  tags: { [tagName: string]: JSDocTagInfo };
  required: boolean;
  typeStr: string;
}

export interface HookReactApi extends CommonReactApi {
  parameters?: ParsedProperty[];
  returnValue?: ParsedProperty[];
  /**
   * hook name
   * @example 'useButton'
   */
  name: string;

  parametersTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  returnValueTable: _.Dictionary<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>;
  translations: {
    hookDescription: string;
    deprecationInfo: string | undefined;
    parametersDescriptions: {
      [key: string]: {
        description: string;
        deprecated?: string;
      };
    };
    returnValueDescriptions: {
      [key: string]: {
        description: string;
        deprecated?: string;
      };
    };
  };
}
