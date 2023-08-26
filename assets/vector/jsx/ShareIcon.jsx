import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={15}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={11.5}
      cy={3.1}
      r={2.1}
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={3.1}
      cy={8}
      r={2.1}
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={11.5}
      cy={12.9}
      r={2.1}
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m4.913 9.057 4.781 2.786M9.687 4.157 4.913 6.943"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent