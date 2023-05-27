'use client'

import theme from "@/src/styles/theme";
import createCache from "@emotion/cache";
import { ReactNode, useState } from "react";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const [cache] = useState(() => {
        const cache = createCache({ key: "css" });
        cache.compat = true;
        return cache;
    });

    useServerInsertedHTML(() => {
        return (
            <style
                data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: Object.values(cache.inserted).join(" "),
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </CacheProvider>
    )
}

export default ThemeProvider;
