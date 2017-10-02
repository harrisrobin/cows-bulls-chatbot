import React from "react"
import styled from "styled-components"
import Contact from "../ContactItem"
import SearchBar from "../SearchBar"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
  background-color: #edebed;
  height: 100%;
  border-right: 1px solid #d8d8d8;
  align-items: center;
  max-width: 75px;
  @media (min-width: 768px) {
    max-width: 420px;
    min-width: 240px;
  }
`

const ContactList = ({ lastMessagePreview }) => {
  return (
    <Wrapper>
      <SearchBar />
      <Contact
        name="Cow"
        preview={lastMessagePreview}
        active
        imageURL="https://pbs.twimg.com/profile_images/791067045991358464/yy_F__YU.jpg"
      />
      <Contact
        name="Bull"
        preview="Want to play?"
        imageURL="https://www.publicdomainpictures.net/pictures/20000/nahled/running-bull-122451296680388mHW.jpg"
      />
    </Wrapper>
  )
}

export default ContactList
