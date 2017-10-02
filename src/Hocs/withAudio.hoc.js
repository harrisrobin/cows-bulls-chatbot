import React, { PureComponent } from "react"
import { Howl } from "howler"

export default ComposedComponent => {
  return class WithAudio extends PureComponent {
    static defaultProps = {}
    sendSound = new Howl({ src: ["send.m4a"] })
    receiveSound = new Howl({ src: ["receive.m4a"] })
    cowSound = new Howl({ src: ["cow-sound.wav"] })

    playSend = () => this.sendSound.play()
    playReceive = () => this.receiveSound.play()
    playCow = () => this.cowSound.play()

    render() {
      return (
        <ComposedComponent
          playReceiveSound={this.playReceive}
          playSendSound={this.playSend}
          playCow={this.playCow}
        />
      )
    }
  }
}
