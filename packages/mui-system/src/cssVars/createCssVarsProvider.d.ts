import * as React from 'react';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

type BuildPaletteModes<
  DesignSystemMode extends string,
  ApplicationMode extends string,
  PaletteModes,
> = [ApplicationMode] extends [never]
  ? {
      palette?: PartialDeep<Record<DesignSystemMode, PaletteModes>>;
    }
  : {
      palette: PartialDeep<Record<DesignSystemMode, PaletteModes>> &
        Record<ApplicationMode, PaletteModes>;
    };

type DecideTheme<
  Theme extends { palette: Record<DesignSystemMode | ApplicationMode, any> },
  DesignSystemMode extends string,
  ApplicationMode extends string,
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
