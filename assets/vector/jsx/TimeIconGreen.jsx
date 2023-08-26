import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Ellipse
      cx={7.79}
      cy={8}
      rx={6.79}
      ry={7}
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.79 3.8V8l2.717 1.4"
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent