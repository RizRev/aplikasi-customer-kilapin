import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 14h8v-2H6v2Zm0-3h12V9H6v2Zm0-3h12V6H6v2ZM2 22V4c0-.55.196-1.021.588-1.413A1.922 1.922 0 0 1 4 2h16c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v12c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0 1 20 18H6l-4 4Zm2-4.825L5.175 16H20V4H4v13.175Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent