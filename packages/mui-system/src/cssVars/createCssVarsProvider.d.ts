import * as React from 'react';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

/**
 * DesignSystemMode: is what a design system provide by default. Mostly, `light` and `dark`
 * ApplicationMode: is what developer can extend from a design system. Ex, `comfort` `trueDark` ...any name that they want
 *
 * This type enhance customization experience by checking if developer has extended the mode or not (usually via module augmentation)
 * If yes, they must provide the palette of the extended mode. Otherwise `theme` is optional.
 */
type DecideTheme<
  Theme extends { palette: Record<DesignSystemMode | ApplicationMode, any> },
  DesignSystemMode extends string,
  ApplicationMode extends string | never,
> = [ApplicationMode] extends [never]
  ? { theme?: PartialDeep<Theme> }
  : {
      theme: PartialDeep<Omit<Theme, 'palette'>> & {
        palette: PartialDeep<Record<DesignSystemMode, Theme['palette'][DesignSystemMode]>> &
          Record<ApplicationMode, Theme['palette'][ApplicationMode]>;
      };
    };
export interface ModeContextValue<DesignSystemMode extends string> {
  allModes: DesignSystemMode[];
  mode: DesignSystemMode | undefined;
  setMode: React.Dispatch<React.SetStateAction<DesignSystemMode | undefined>>;
}

export default function createCssVarsProvider<
  Theme extends { palette: Record<DesignSystemMode | ApplicationMode, any> },
  DesignSystemMode extends string,
  ApplicationMode extends string = never,
>(
  ThemeContext: React.Context<Theme | undefined>,
  options: {
    theme: Omit<Theme, 'palette'> & {
      palette: Record<DesignSystemMode, Theme['palette'][DesignSystemMode | ApplicationMode]> &
        Partial<Record<ApplicationMode, Theme['palette'][DesignSystemMode | ApplicationMode]>>;
    };
    defaultMode: DesignSystemMode;
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      {
        defaultMode?: DesignSystemMode | ApplicationMode;
        storageKey?: string;
        dataAttribute?: string;
      } & DecideTheme<Theme, DesignSystemMode, ApplicationMode>
    >,
  ) => React.ReactElement;
  useMode: () => ModeContextValue<DesignSystemMode | ApplicationMode>;
  getInitModeScript: () => React.ReactElement;
};

// disable automatic export
export {};
