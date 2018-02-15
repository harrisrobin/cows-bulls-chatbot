import styled, { keyframes } from "styled-components"
import { fadeInUp } from "react-animations"

const fader = keyframes`${fadeInUp}`

const from = ({ fromMe }) => {
  if (fromMe) {
    return `
      position:relative;
      padding:15px 20px;
      color:white; 
      background:#0B93F6;
      border-radius: 25px;
      float: right;
      box-shadow: 0 6px 6px 0 rgba(64, 146, 239,0.15), 0 10px 20px 0 rgba(64, 146, 239,0.10);
  `
  } else {
    return `
    position:relative;
	  padding:10px 20px;
	  background:#E5E5EA;
	  border-radius:25px;
	  color: black;
    float: left;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);

    `
  }
}

export default styled.div`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 20px;
  line-height: 24px;
  animation: 0.25s ${fader};
  ${from};
`
