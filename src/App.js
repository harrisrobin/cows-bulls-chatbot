import "normalize.css/normalize.css"
import "./App.css"

import React, { Component } from "react"
import { compose } from "recompose"
import PropTypes from "prop-types"

import ToolBar from "./Components/Toolbar"
import MessageInput from "./Components/MessageInput"
import ChatBubble from "./Components/ChatBubble"
import Text from "./Components/Text"
import TypingIndicator from "./Components/TypingIndicator"
import ContactList from "./Components/ContactList"
import Chat, { ChatBody, Clear } from "./Components/Chat"

import WithAudio from "./Hocs/withAudio.hoc"
import WithMessages from "./Hocs/withMessages.hoc"

class App extends Component {
  static propTypes = {
    playSendSound: PropTypes.func,
    playReceiveSound: PropTypes.func,
    pushMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    typing: PropTypes.bool.isRequired,
    lastMessagePreview: PropTypes.string
  }

  static defaultProps = {
    messages: []
  }

  state = {
    shadows: false
  }

  render() {
    const { lastMessagePreview } = this.props
    return (
      <div className="App">
        <div className="mobile-overlay">
          <Text fontSize={[4]} color="white">
            The Bulls and Cows bot is not available on your screensize. Please
            try again on a desktop.
          </Text>
        </div>
        <ContactList lastMessagePreview={lastMessagePreview} />
        <Chat>
          <ToolBar>
            <Text fontSize={[2]} centered>
              Cow
            </Text>
            <Text fontSize={[0]} color="subtle">
              Active now
            </Text>
          </ToolBar>
          <ChatBody id="chat-area">
            {this.props.messages.map((message, index) => {
              return [
                <ChatBubble key={index} fromMe={message.fromMe}>
                  <Text fontSize={[1]}>{message.text}</Text>
                </ChatBubble>,
                <Clear />
              ]
            })}

            {this.props.typing ? <TypingIndicator /> : null}
          </ChatBody>
          <MessageInput pushMessage={this.props.pushMessage} />
        </Chat>
      </div>
    )
  }
}

export default compose(WithAudio, WithMessages)(App)
