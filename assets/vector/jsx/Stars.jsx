import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={26}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m5.281 24.5 2.032-8.781L.5 9.813l9-.782L13 .75l3.5 8.281 9 .781-6.813 5.907L20.72 24.5 13 19.844 5.281 24.5Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
