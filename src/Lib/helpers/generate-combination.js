import shuffle from "lodash.shuffle"

export default () => {
  const shuffledArray = shuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
  return shuffledArray.splice(0, 4)
}
