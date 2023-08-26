import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.476 10.107a8.053 8.053 0 0 1-.857 3.637 8.12 8.12 0 0 1-2.983 3.283 8.065 8.065 0 0 1-4.255 1.216 7.95 7.95 0 0 1-3.62-.861L1.334 19.2l1.81-5.456a8.053 8.053 0 0 1-.857-3.637c0-1.51.42-2.991 1.21-4.276a8.11 8.11 0 0 1 3.266-2.998 7.949 7.949 0 0 1 3.619-.862h.476c1.985.11 3.86.953 5.266 2.365a8.135 8.135 0 0 1 2.353 5.293v.478Z"
      stroke="#ABBCCD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent