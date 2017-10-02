import styled from "styled-components"
import { fontSize, space, width } from "styled-system"
import { Colors } from "../../Lib/Theme"

const mapFontColorToProps = prop => Colors[prop]

const Text = styled.div`
  ${fontSize};
  ${space};
  ${width};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  color: ${props =>
    props.color ? mapFontColorToProps(props.color) : Colors.dark};
  text-transform: ${props => (props.uppercase ? "uppercase" : "none")};
  font-family: -apple-system, BlinkMacSystemFont;
`

export default Text
