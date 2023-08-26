import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={15}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.064 15v-1.556c0-1.718-1.35-3.11-3.016-3.11H4.016C2.35 10.333 1 11.725 1 13.443V15"
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Ellipse
      cx={7.032}
      cy={4.111}
      rx={3.016}
      ry={3.111}
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent