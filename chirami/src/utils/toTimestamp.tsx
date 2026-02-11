import {type ReactElement} from "react";
import {styles} from "../components/ChiramiViewer.styles";
import {pad, pad3} from "./pads";

export function toTimestamp(date: Date): ReactElement {
  const d = new Date(date.getTime());
  return (
    <>
      <span>{`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDay())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`}</span>
      <span style={styles.milliSecond}>.{pad3(d.getMilliseconds())}</span>
    </>
  );
}