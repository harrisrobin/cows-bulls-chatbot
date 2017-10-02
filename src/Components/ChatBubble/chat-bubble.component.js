import styled, { keyframes } from "styled-components"
import { fadeInUp } from "react-animations"

const fader = keyframes`${fadeInUp}`

const from = ({ fromMe }) => {
  if (fromMe) {
    return `
      position:relative;
      padding:10px 20px;
      color:white; 
      background:#0B93F6;
      border-radius:25px;
      float: right;
      
    &:before {
      content:"";
      position:absolute;
      z-index:-1;
      bottom:-2px;
      right:-7px;
      height:20px;
      border-right:20px solid #0B93F6;
      border-bottom-left-radius: 16px 14px;
      -webkit-transform:translate(0, -2px);
    }

    &:after {
      content:"";
      position:absolute;
      z-index:1;
      bottom:-2px;
      right:-56px;
      width:26px;
      height:20px;
      background:white;
      border-bottom-left-radius: 10px;
      -webkit-transform:translate(-30px, -2px);
    }
  `
  } else {
    return `
    position:relative;
	  padding:10px 20px;
	  background:#E5E5EA;
	  border-radius:25px;
	  color: black;
    float: left;
		
    &:before {
      content:"";
      position:absolute;
      z-index:2;
      bottom:-2px;
      left:-7px;
      height:20px;
      border-left:20px solid #E5E5EA;
      border-bottom-right-radius: 16px 14px;
      -webkit-transform:translate(0, -2px);
    }

    &:after {
      content:"";
      position:absolute;
      z-index:3;
      bottom:-2px;
      left:4px;
      width:26px;
      height:20px;
      background:white;
      border-bottom-right-radius: 10px;
      -webkit-transform:translate(-30px, -2px);
    }
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
