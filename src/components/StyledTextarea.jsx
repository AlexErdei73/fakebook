import React, { useState, useEffect, useRef } from "react";

const StyledTextarea = (props) => {
  const { onChange, onKeyPress, value, welcomeText, ...rest } = props;

  const TEXTAREA_STYLE_INIT = {
    outline: "none",
    border: "none",
    resize: "none",
    overflow: "hidden",
    background: "#e9ecef",
    padding: "0",
    lineHeight: "0.8em",
  };
  const styleInitRef = useRef(TEXTAREA_STYLE_INIT);
  const [style, setStyle] = useState(TEXTAREA_STYLE_INIT);
  const [textarea, setTextarea] = useState(null); //We save the textarea in the state, so the effect hook can use it

  //When content changes we first change the height to auto,
  //which changes back the scrollHeight property of the textarea
  //to a low value and the component rerenders
  function restyleTextarea(textarea) {
    const newStyle = { ...style };
    newStyle.height = "auto";
    setStyle(newStyle);
  }

  //When the component has rerendered and the height is auto
  //we set the height to the scrollHeight property of textarea
  //This way when the height of the content decreses the textarea
  //can follow it down too. Without this trick the textarea can
  //grow but unable to shrink back
  useEffect(() => {
    if (style.height !== "auto") return;
    if (!textarea) return;
    const newStyle = { ...style };
    newStyle.height = textarea.scrollHeight + "px";
    setStyle(newStyle);
  }, [style, textarea]);

  //This restyles the text area, when we send the message, so the
  //value goes back to "" without executing the onChange handler
  useEffect(() => {
    if (value === "" && textarea) setStyle(styleInitRef.current);
  }, [value, textarea, styleInitRef]);

  return (
    <textarea
      type="text"
      onChange={(e) => {
        onChange(e);
        const textarea = e.target;
        setTextarea(textarea);
        restyleTextarea(textarea);
      }}
      onKeyPress={onKeyPress}
      placeholder={welcomeText}
      rows="1"
      style={style}
      value={value}
      {...rest}
    ></textarea>
  );
};

export default StyledTextarea;
