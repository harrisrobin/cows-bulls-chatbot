import React from "react"
import styled from "styled-components"
import Text from "../Text"

const ContactWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #c5cbcb;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${props => (props.active ? "#2D6BD3" : "transparent")};
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  flex-direction: column;
  align-self: center;
  cursor: not-allowed;
  box-shadow: ${props =>
    props.active
      ? "0 6px 6px 0 rgba(60, 108, 204, 0.1), 0 10px 20px 0 rgba(60, 108, 204, 0.1)"
      : "none"};

  @media (min-width: 768px) {
    flex-direction: row;
    padding-left: 20px;
    padding-right: 14px;
  }
`

const Photo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffffff;
  background-image: url(${props => props.imageURL});
  background-size: cover;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`

const MessageData = styled.div`
  display: none;
  margin-left: 7px;
  flex: 1;
  @media (min-width: 768px) {
    display: block;
  }
`

const NameTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const MessagePreview = styled.div`padding-top: 4px;`

const Contact = ({ active, imageURL, preview, name }) => {
  return (
    <ContactWrapper active={active}>
      <Photo imageURL={imageURL} />
      <MessageData>
        <NameTime>
          <Text bold color={active ? "white" : "treehouse"}>
            {name}
          </Text>
          <Text color={active ? "white" : "treehouse"}>5:56pm</Text>
        </NameTime>
        <MessagePreview>
          <Text color={active ? "white" : "scorpion"}>{preview}</Text>
        </MessagePreview>
      </MessageData>
    </ContactWrapper>
  )
}

export default Contact
