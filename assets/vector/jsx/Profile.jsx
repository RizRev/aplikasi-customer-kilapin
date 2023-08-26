import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={19}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.65 19.08v-1.994a3.998 3.998 0 0 0-1.161-2.82 3.958 3.958 0 0 0-2.806-1.168H5.746c-1.052 0-2.062.42-2.806 1.168a3.998 3.998 0 0 0-1.162 2.82v1.994M9.714 9.11c2.192 0 3.969-1.785 3.969-3.988 0-2.203-1.777-3.988-3.969-3.988-2.191 0-3.968 1.785-3.968 3.988 0 2.203 1.777 3.988 3.968 3.988Z"
      stroke="#ABBCCD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent