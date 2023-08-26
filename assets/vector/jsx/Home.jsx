import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={23}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 9.207 11.5 1 22 9.207v12.898c0 .622-.246 1.218-.683 1.658a2.328 2.328 0 0 1-1.65.687H3.333a2.328 2.328 0 0 1-1.65-.687A2.351 2.351 0 0 1 1 22.105V9.207Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 24.45V12.725h7V24.45"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent