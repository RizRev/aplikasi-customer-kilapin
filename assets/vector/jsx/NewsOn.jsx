import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.25 3.375h3.563A1.188 1.188 0 0 1 20 4.563v13.062A2.375 2.375 0 0 1 17.625 20m0 0a2.375 2.375 0 0 1-2.375-2.375V2.187A1.187 1.187 0 0 0 14.062 1H2.188A1.188 1.188 0 0 0 1 2.188v14.25A3.563 3.563 0 0 0 4.563 20h13.062ZM5.75 5.75h4.75M5.75 10.5h4.75m-4.75 4.75h4.75"
      stroke="#5865F2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent