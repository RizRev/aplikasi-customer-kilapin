import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={250}
    height={250}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M125 250c69.036 0 125-55.964 125-125S194.036 0 125 0 0 55.964 0 125s55.964 125 125 125Z"
        fill="#4FC76D"
      />
      <Path
        d="M202.411 201.969H47.589a2.962 2.962 0 0 1-2.953-2.953V95.177h160.728v103.888c0 1.575-1.329 2.904-2.953 2.904Z"
        fill="#324A5E"
      />
      <Path
        d="M125 130.118 48.277 198.72c2.117 2.018 4.922 3.248 8.071 3.248h137.353c3.1 0 5.954-1.23 8.07-3.248L125 130.118Z"
        fill="#2B3B4E"
      />
      <Path
        d="M205.364 95.177 125 157.677l-80.364-62.5 75.147-58.464c3.052-2.363 7.382-2.363 10.433 0l75.148 58.464Z"
        fill="#E6E9EE"
      />
      <Path
        d="M187.303 64.764v44.439L125 157.677l-62.303-48.474v-44.44c0-1.722 1.427-3.149 3.15-3.149h118.306a3.14 3.14 0 0 1 3.15 3.15Z"
        fill="#fff"
      />
      <Path
        d="M164.616 74.95H81.693v5.217h82.923v-5.216ZM164.616 88.09H81.693v5.217h82.923v-5.216ZM136.909 101.23H81.693v5.217h55.216v-5.217Z"
        fill="#84DBFF"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h250v250H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent