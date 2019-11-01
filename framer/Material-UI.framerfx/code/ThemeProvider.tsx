import * as React from "react"
import { PropertyControls, ControlType } from "framer"
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

// Define type of property
interface Props {
    children: React.ReactNode
    paletteType: "dark" | "light"
    primary: string
    secondary: string
    error: string
}

export class Theme extends React.Component<Props> {
    // Set default properties
    static defaultProps = {
        paletteType: "light",
        primary: "#3f51b5",
        secondary: "#f50057",
        error: "#f44336",
    }

    // Items shown in property panel
    static propertyControls: PropertyControls<Props> = {
        paletteType: {
            type: ControlType.SegmentedEnum,
            title: "Palette type",
            options: ["dark", "light"],
        },
        primary: {
            type: ControlType.Color,
            title: "Primary",
        },
        secondary: {
            type: ControlType.Color,
            title: "Secondary",
        },
        error: {
            type: ControlType.Color,
            title: "Error",
        },
    }

    render() {
        const {
            children,
            error,
            paletteType,
            primary,
            secondary,
            ...other
        } = this.props

        const theme = createMuiTheme({
            palette: {
                type: paletteType,
                primary: { main: primary },
                secondary: { main: secondary },
                error: { main: error },
            },
        })

        return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    }
}
