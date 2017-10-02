import styled from "styled-components"

export default styled.div`
  position: relative;
  display: flex;
  flex: 3;
  flex-direction: column;
  padding-top: 50px;
`

export const ChatBody = styled.div`
  display: block;
  padding-left: 36px;
  padding-right: 20px;
  padding-top: 36px;
  padding-bottom: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 100%;
`

export const Clear = styled.div`clear: both;`
