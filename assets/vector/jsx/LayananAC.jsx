import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={85}
    height={80}
    fill="none"
    {...props}
  >
    <Path
      fill="#5865f2"
      d="M42.5 21.751c-7.562 0-13.691 5.787-13.691 12.926s6.13 12.926 13.69 12.926c7.562 0 13.692-5.787 13.692-12.926S50.061 21.751 42.5 21.751Zm0 22.425c-5.557 0-10.062-4.253-10.062-9.5 0-5.246 4.505-9.5 10.062-9.5 5.557 0 10.062 4.254 10.062 9.5 0 5.247-4.505 9.5-10.062 9.5Z"
    />
    <Path
      fill="#DD7DE1"
      d="M45.654 22.997H39.36c-.413 0-.716-.366-.616-.744l.673-2.54a.629.629 0 0 1 .616-.453h4.948c.291 0 .544.187.615.453l.673 2.54c.1.378-.202.744-.615.744ZM53.478 28.523l-4.45-4.201a.58.58 0 0 1 .122-.937l2.378-1.347a.66.66 0 0 1 .775.09l3.499 3.303a.574.574 0 0 1 .095.731l-1.427 2.245a.657.657 0 0 1-.992.116ZM54.872 37.654v-5.941c0-.39.388-.676.788-.581l2.69.635c.283.066.48.306.48.58v4.672a.607.607 0 0 1-.48.581l-2.69.635c-.4.095-.788-.191-.788-.58ZM53.478 40.83l-4.45 4.202a.58.58 0 0 0 .122.936l2.378 1.348c.25.141.57.104.775-.09l3.499-3.304a.574.574 0 0 0 .095-.73l-1.427-2.246a.657.657 0 0 0-.992-.116ZM31.521 28.523l4.451-4.201a.58.58 0 0 0-.122-.937l-2.378-1.347a.66.66 0 0 0-.775.09l-3.499 3.303a.574.574 0 0 0-.095.731l1.427 2.245c.212.334.7.39.992.116ZM30.128 37.654v-5.941c0-.39-.388-.676-.788-.581l-2.691.635a.606.606 0 0 0-.48.58v4.672c0 .275.198.514.48.581l2.69.635c.402.095.789-.191.789-.58ZM31.521 40.83l4.451 4.202a.58.58 0 0 1-.122.936l-2.378 1.348a.661.661 0 0 1-.775-.09l-3.499-3.304a.574.574 0 0 1-.095-.73l1.427-2.246c.212-.334.7-.39.992-.116Z"
    />
    <Path
      fill="#5865f2"
      d="m49.77 33.736-.35-1.31c-.398-1.488-1.538-2.728-3.075-3.499-.472-.236-1.04.086-1.04.59v3.696c0 1.023-.878 1.85-1.961 1.85h-1.688c-1.083 0-1.96-.827-1.96-1.85V29.52c0-.504-.57-.826-1.041-.59-1.535.77-2.673 2.007-3.072 3.493l-.352 1.308c-.919 3.414 1.032 6.63 5.454 6.63h3.63c4.418 0 6.368-3.211 5.455-6.624Z"
    />
    <Path
      fill="#DD7DE1"
      d="M45.972 57.319 44.75 40.183h-4.468l-1.24 17.135c-.089 1.864 1.488 3.422 3.465 3.422 1.977 0 3.555-1.558 3.465-3.422ZM42.5 58.813c-.911 0-1.65-.697-1.65-1.557s.739-1.557 1.65-1.557c.912 0 1.65.697 1.65 1.557s-.738 1.557-1.65 1.557Z"
    />
    <Path
      fill="#DD7DE1"
      d="M62.483 17.843c-.922-.127-1.854.249-2.643.972l-.053.049a5.973 5.973 0 0 0-1.274 1.785 7.37 7.37 0 0 0-.559 1.655l-.028.143c.009-.049.017-.095.024-.143.173-1.078.1-2.106-.171-2.973-.03-.1-.065-.197-.102-.293v-.001a4.117 4.117 0 0 0-.625-1.124 3.014 3.014 0 0 0-.175-.203c-.44-.47-.985-.778-1.61-.865.439.06.88.008 1.308-.144.06-.022.12-.045.181-.07.562-.238 1.094-.641 1.556-1.172.052-.059.102-.12.152-.181.621-.778 1.103-1.792 1.34-2.936a7 7 0 0 0-.047 2.028c.1.796.346 1.51.71 2.082a.628.628 0 0 0 .026.043c.484.742 1.168 1.237 1.99 1.35v-.002ZM60.358 23.432c.636-.043 1.252.26 1.75.791l.034.036c.306.335.566.757.756 1.239.007.013.011.027.017.041.138.358.238.747.291 1.157l.012.099-.009-.099c-.059-.745.047-1.443.279-2.021.026-.067.054-.132.085-.195a2.861 2.861 0 0 1 .618-.868 1.86 1.86 0 0 1 1.146-.513 1.882 1.882 0 0 1-1.005-.218 2.932 2.932 0 0 1-.998-.875 3.038 3.038 0 0 1-.094-.13 4.743 4.743 0 0 1-.757-2.07c.041.474.016.929-.068 1.347-.003.014-.005.027-.009.04a3.501 3.501 0 0 1-.598 1.387l-.02.028c-.37.483-.864.788-1.431.826v-.002ZM27.11 54.611c.79-.053 1.558.323 2.178.984l.042.045c.38.416.703.941.94 1.54.008.018.014.035.02.052.172.445.297.929.363 1.44.006.04.01.08.015.121l-.011-.122c-.074-.927.058-1.795.347-2.515.033-.083.067-.163.106-.242.164-.352.369-.66.608-.918.051-.057.106-.11.162-.162.404-.373.889-.602 1.426-.638a2.344 2.344 0 0 1-1.25-.272c-.461-.234-.886-.61-1.242-1.088a4.711 4.711 0 0 1-.116-.163c-.476-.697-.817-1.588-.939-2.573a5.97 5.97 0 0 1-.098 1.725c-.14.67-.397 1.262-.744 1.725a3.441 3.441 0 0 1-.025.035c-.461.602-1.075.98-1.78 1.028l-.003-.002ZM22.681 46.823c.595.162 1.05.633 1.314 1.276l.017.043c.16.402.245.87.247 1.368v.043a4.84 4.84 0 0 1-.148 1.148l-.025.093.027-.092c.213-.698.558-1.3.977-1.755.048-.053.097-.103.147-.15a2.944 2.944 0 0 1 .874-.595c.403-.17.824-.215 1.227-.105a1.752 1.752 0 0 1-.838-.518 2.685 2.685 0 0 1-.596-1.114 2.922 2.922 0 0 1-.039-.149c-.148-.632-.142-1.37.052-2.124a4.785 4.785 0 0 1-.545 1.205l-.023.035a3.62 3.62 0 0 1-1.04 1.075l-.028.019c-.511.323-1.07.445-1.6.3v-.003Z"
    />
  </Svg>
)
export default SvgComponent

