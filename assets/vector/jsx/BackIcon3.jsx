import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M25 13.5H2M13.5 25 2 13.5 13.5 2"
    />
  </Svg>
)
export default SvgComponent
