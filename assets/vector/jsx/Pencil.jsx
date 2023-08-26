import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m16.3 6.175-4.25-4.2 1.4-1.4A1.92 1.92 0 0 1 14.863 0a1.92 1.92 0 0 1 1.412.575l1.4 1.4c.383.383.583.846.6 1.388a1.806 1.806 0 0 1-.55 1.387L16.3 6.175ZM14.85 7.65l-10.6 10.6H0V14L10.6 3.4l4.25 4.25Z"
    />
  </Svg>
)
export default SvgComponent
