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

export interface ModeContextValue<DesignSystemMode extends string> {
  allModes: Array<DesignSystemMode>;
  mode: DesignSystemMode | undefined;
  setMode: React.Dispatch<React.SetStateAction<DesignSystemMode | undefined>>;
}

export default function createCssVarsProvider<
  Theme extends { palette: Record<string, any> },
  DesignSystemMode extends string,
  ApplicationMode extends string = never,
>(
  ThemeContext: React.Context<Theme | undefined>,
  options: {
    theme: Omit<Theme, 'palette'> & {
      palette: Record<DesignSystemMode, Theme['palette']> &
        Partial<Record<ApplicationMode, Theme['palette']>>;
    };
    defaultMode: DesignSystemMode;
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<{
      defaultMode?: DesignSystemMode | ApplicationMode;
      theme?: PartialDeep<Omit<Theme, 'palette'>> &
        BuildPaletteModes<DesignSystemMode, ApplicationMode, Theme['palette']>;
      storageKey?: string;
      dataAttribute?: string;
    }>,
  ) => React.ReactElement;
  useMode: () => ModeContextValue<DesignSystemMode | ApplicationMode>;
  getInitModeScript: () => React.ReactElement;
};
