/* eslint-disable spaced-comment */
import { Demo } from "./Dependencies";

export default function PackagesConfig(demo: Demo) {
    switch (demo.styleEngine) {

        case "styled-components":
            return {
                "alias": {
                    "@mui/styled-engine": "@mui/styled-engine-sc"
                }
            }

        case "emotion":
        default:
            return {}
    }
}


