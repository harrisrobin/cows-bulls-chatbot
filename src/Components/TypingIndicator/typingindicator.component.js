import React from "react"

export default () => {
  return (
    <div
      style={{
        transform: "translateX(-20px)"
      }}
    >
      <svg
        id="typing_bubble"
        data-name="typing bubble"
        width="100"
        height="46"
        viewBox="0 0 100 66"
      >
        <g id="bubble">
          <path
            className="cls-1"
            d="M152,166H108a29.848,29.848,0,0,1-16.03-4.647,10.993,10.993,0,1,1-12.7-16.692A30.008,30.008,0,0,1,108,106h44A30,30,0,0,1,152,166Zm-85,6a5,5,0,1,1,5-5A5,5,0,0,1,67,172Z"
            transform="translate(-62 -106)"
          />
        </g>
        <g>
          <circle className="dot" cx="46" cy="30" r="8" />
          <circle className="dot" cx="68" cy="30" r="8" />
          <circle className="dot" cx="90" cy="30" r="8" />
        </g>
      </svg>
    </div>
  )
}
