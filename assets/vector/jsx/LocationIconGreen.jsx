import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={14}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M12.658 6.727c0 4.455-5.335 8.273-5.335 8.273s-5.336-3.818-5.336-8.273C1.987 3.564 4.376 1 7.323 1c2.946 0 5.335 2.564 5.335 5.727v0Z"
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Ellipse
      cx={7.323}
      cy={6.727}
      rx={1.778}
      ry={1.909}
      stroke="#54CC76"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent