import { Global } from "@mantine/core";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "normal",
            fontWeight: "300",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-300.woff2') format('woff2'), url('../fonts/jost-v9-latin-300.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "normal",
            fontWeight: "400",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-regular.woff2') format('woff2'), url('../fonts/jost-v9-latin-regular.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "normal",
            fontWeight: "500",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-500.woff2') format('woff2'), url('../fonts/jost-v9-latin-500.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "normal",
            fontWeight: "600",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-600.woff2') format('woff2'), url('../fonts/jost-v9-latin-600.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "italic",
            fontWeight: "300",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-300italic.woff2') format('woff2'), url('../fonts/jost-v9-latin-300italic.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "italic",
            fontWeight: "400",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-italic.woff2') format('woff2'), url('../fonts/jost-v9-latin-italic.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "italic",
            fontWeight: "500",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-500italic.woff2') format('woff2'), url('../fonts/jost-v9-latin-500italic.woff') format('woff');",
          },
        },
        {
          "@font-face": {
            fontFamily: "Jost",
            fontStyle: "italic",
            fontWeight: "600",
            fontDisplay: "optional",
            src: "local('Jost'), url('/fonts/jost-v9-latin-600italic.woff2') format('woff2'), url('../fonts/jost-v9-latin-600italic.woff') format('woff');",
          },
        },
      ]}
    />
  );
}
