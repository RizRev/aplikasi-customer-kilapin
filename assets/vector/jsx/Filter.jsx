import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#1E2022" d="M0 7h20v2H0z" />
    <Rect
      x={5.5}
      y={6.5}
      width={3}
      height={3}
      rx={1.5}
      fill="#fff"
      stroke="#1E2022"
    />
    <Path fill="#1E2022" d="M0 1h20v2H0z" />
    <Rect
      x={11.5}
      y={0.5}
      width={3}
      height={3}
      rx={1.5}
      fill="#fff"
      stroke="#1E2022"
    />
  </Svg>
)

export default SvgComponent