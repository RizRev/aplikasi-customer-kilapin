import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={15}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1.907}
      y={2.4}
      width={11.633}
      height={12.6}
      rx={2}
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.309 1v2.8M5.138 1v2.8M1.907 6.6H13.54"
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent