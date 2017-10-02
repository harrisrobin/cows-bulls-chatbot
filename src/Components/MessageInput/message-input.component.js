import React, { PureComponent } from "react"
import styled from "styled-components"
import Validator from "../../Lib/helpers/validators"

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 42px;
  background-color: whitesmoke;
  padding-left: 18px;
  padding-right: 24px;
  display: flex;
  align-items: center;
  z-index: 10;
`

const Input = styled.input`
  border-radius: 15px;
  outline: none;
  border: none;
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  width: 100%;
`

class MessageInput extends PureComponent {
  state = {
    value: ""
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({
      value: e.target.value
    })
  }

  handleKeyPress = e => {
    const { value } = this.state
    if (e.key === "Enter") {
      if (Validator.minLength(2)(value)) {
        this.setState({ value: "" }, () => {
          this.props.pushMessage({ text: value, fromMe: true })
        })
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Message"
        />
      </Wrapper>
    )
  }
}

export default MessageInput
