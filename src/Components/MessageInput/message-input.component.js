import React, { PureComponent } from "react"
import styled from "styled-components"
import { transitions } from "polished"
import Validator from "../../Lib/helpers/validators"

const Input = styled.input`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  outline: none;
  border: none;
  background: #ffffff;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.15), 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5000px;
  padding-left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont;
  font-size: 16px;
  ${transitions(
    "width 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "box-shadow 0.2s ease-in-out"
  )};
  &:focus {
    width: 500px;
    box-shadow: 0 10px 10px 0 rgba(64, 146, 239, 0.12),
      0 14px 28px 0 rgba(64, 146, 239, 0.25);
  }
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
      <Input
        type="text"
        autoFocus
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        placeholder="Message"
      />
    )
  }
}

export default MessageInput
