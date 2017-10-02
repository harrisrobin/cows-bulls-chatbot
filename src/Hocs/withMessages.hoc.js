import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import uniq from "lodash.uniq"
import truncate from "lodash.truncate"
import generateCombination from "../Lib/helpers/generate-combination"

const INITIAL_STATE = {
  messages: [],
  lastMessagePreview: "Hey there 👋🏽",
  typing: true,
  tries: 0,
  secretCode: generateCombination(),
  cows: [],
  bulls: []
}

export default ComposedComponent => {
  return class WithIntro extends PureComponent {
    static propTypes = {
      playSendSound: PropTypes.func.isRequired,
      playReceiveSound: PropTypes.func.isRequired,
      playCow: PropTypes.func.isRequired
    }

    state = { ...INITIAL_STATE }

    chatAreaDiv = null // keep a reference of the chat area to auto scroll to bottom later.

    componentDidMount() {
      this.intro()
      this.chatAreaDiv = document.getElementById("chat-area")
    }

    intro = () => {
      const messages = [
        { text: "Hey there 👋" },
        {
          text:
            "Bulls and Cows is a code breaking game where you have to try and guess a 4 digit secret combination."
        },
        {
          text:
            "When you guess a correct number in it's proper position, that represents a Bull and if you guess a correct number in general, that's a Cow."
        },
        {
          text: `
              Remember, there are no repeating numbers. Now that you understand the game, I am generating the secret combination...
              
              Go ahead, try to guess the 4 digit combination that's stored in my memory ;)
            `
        }
      ]

      messages.forEach((message, index) => {
        setTimeout(() => {
          this.pushMessage(message)
          if (index === messages.length - 1) {
            this.setState({ typing: false })
          }
        }, 2000 * index)
      })
    }

    pushMessage = message => {
      this.setState(
        state => ({
          ...state,
          messages: state.messages.concat([message]),
          lastMessagePreview: truncate(message.text)
        }),
        () => {
          // auto scroll to bottom.
          this.chatAreaDiv.scrollTop = this.chatAreaDiv.scrollHeight
        }
      )
      if (message.fromMe) {
        this.processMessage(message)
        this.props.playSendSound()
      } else {
        this.props.playReceiveSound()
      }
    }

    isCorrectLength = length => {
      const errorMessage = "🤔, the amount of digits to guess are 4. Try again."
      return new Promise((resolve, reject) => {
        if (length !== 4) {
          reject(errorMessage)
          setTimeout(() => {
            this.pushMessage({ text: errorMessage })
            this.setState({ typing: false })
          }, 2000)
        } else {
          resolve(true)
        }
      })
    }

    isNonRepeating = answersArr => {
      // Make sure that the guessed digits are not repeating.
      const answerLength = answersArr.length
      const forcedUniqAnswers = uniq(answersArr)
      const uniqArrayLength = forcedUniqAnswers.length
      const hasRepeating = answerLength !== uniqArrayLength
      const errorMessage =
        "You are not allowed to guess a number with repeating digits. Every guess must be unique!"
      return new Promise((resolve, reject) => {
        if (hasRepeating) {
          reject(errorMessage)
          setTimeout(() => {
            this.pushMessage({ text: errorMessage })
            this.setState({ typing: false })
          }, 2000)
        } else {
          resolve(true)
        }
      })
    }

    calculateScore = guesses => {
      const { secretCode } = this.state
      this.setState(state => ({ ...state, tries: state.tries + 1 }))
      guesses.forEach((guess, guessIdx) => {
        secretCode.forEach((answer, answerIdx) => {
          const shouldRevealScore =
            guessIdx === guesses.length - 1 &&
            answerIdx === secretCode.length - 1

          if (guess === answer && guessIdx === answerIdx) {
            this.setState(state => ({
              ...state,
              bulls: state.bulls.concat([
                {
                  answerIdx,
                  guessIdx,
                  value: answer
                }
              ])
            }))
          } else if (guess === answer && guessIdx !== answerIdx) {
            this.setState(state => ({
              ...state,
              cows: state.cows.concat([
                {
                  answerIdx,
                  guessIdx,
                  value: answer
                }
              ])
            }))
          }

          if (shouldRevealScore) {
            this.revealScore()
          }
        })
      })
    }

    revealScore = () => {
      const { cows, bulls, tries } = this.state

      if (tries > 7) {
        this.resetGame()
        setTimeout(() => {
          this.pushMessage({
            text: `You have run out of tries. Resetting game...`
          })
        }, 2000)
      } else {
        setTimeout(() => {
          this.pushMessage({
            text: `
                Alright, here's how you did:
                
                You have ${cows.length} 🐄(s) and ${bulls.length} 🐃(s).

                You have ${7 - tries} tries left.
            `
          })
          if (cows.length > 1) {
            this.props.playCow()
          }
          this.setState({ typing: false, cows: [], bulls: [] })
        }, 2000)
      }
    }

    resetGame = () => {
      this.setState(state => ({
        ...INITIAL_STATE,
        typing: false,
        messages: state.messages
      }))
    }

    processMessage = async message => {
      const numberish = parseInt(message.text) // this returns NaN or a number.
      const coercedNumber = numberish + ""
      const arrayOfNumbers = coercedNumber.split("")
      const answerLength = arrayOfNumbers.length
      this.setState(state => ({ ...state, typing: true }))

      // Make sure the number is not NaN.
      if (!Number.isNaN(numberish)) {
        try {
          const isGuessCorrectLength = await this.isCorrectLength(answerLength)
          const isNonRepeating = await this.isNonRepeating(arrayOfNumbers)
          if (isGuessCorrectLength && isNonRepeating) {
            this.calculateScore(arrayOfNumbers)
          }
        } catch (e) {
          console.error(e)
          return e
        }
      } else {
        this.setState({ typing: true })
        setTimeout(() => {
          this.pushMessage({
            text: `I'm no expert but I'm pretty sure "${message.text}" is not a number`
          })
          this.setState({ typing: false })
        }, 2000)
      }
    }

    render() {
      return (
        <div>
          <ComposedComponent
            typing={this.state.typing}
            messages={this.state.messages}
            pushMessage={this.pushMessage}
            lastMessagePreview={this.state.lastMessagePreview}
            {...this.props}
          />
        </div>
      )
    }
  }
}
