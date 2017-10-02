import React, { PureComponent } from "react"
import styled from "styled-components"
import { transitions } from "polished"
import SearchIconPath from "./ic_search_black_24px.svg"

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  visibility: hidden;
  padding-right: 6px;
  padding-left: 6px;
  @media (min-width: 768px) {
    visibility: visible;
  }
`

const SearchInput = styled.input`
  background-color: #dfd7d7;
  border-radius: 5px;
  width: 100%;
  outline: none;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 22px;
  padding-right: 22px;
  font-size: 13px;
  max-width: 320px;
  border: 4px solid transparent;
  ${transitions("border 0.25s ease-in-out", "text-indent 0.25s ease-in-out")};
  text-align: center;
`

const SearchIcon = styled.img`
  height: 16px;
  opacity: 0.5;
  margin-right: 4px;
`

const Marquee = styled.div`
  display: flex;
  will-change: transform, left;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transition: transform 0.3s;
  left: ${props => (props.isFocused ? "10%" : "43%")};
  transform: translateY(-50%)
    ${props => (props.isFocused ? "translateX(-57%)" : "translateX(-90%)")};
  ${transitions("transform 0.25s ease-in-out", "left 0.25s ease-in-out")};
`

class SearchBar extends PureComponent {
  state = {
    isFocused: false,
    value: ""
  }

  handleFocus = () =>
    this.setState(state => ({ ...this.state, isFocused: true }))

  handleBlur = () =>
    this.setState(state => ({ ...this.state, isFocused: false }))

  handleOnChange = e => this.setState({ value: e.target.value })

  render() {
    return (
      <Wrapper>
        <Marquee isFocused={this.state.isFocused}>
          <SearchIcon src={SearchIconPath} />
        </Marquee>
        <SearchInput
          disabled={true}
          onChange={this.handleOnChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder="Search"
          type="text"
        />
      </Wrapper>
    )
  }
}

export default SearchBar
