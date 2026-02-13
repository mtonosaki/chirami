import React from "react";

export const typeColors = {
  log: "#d4d4d4",
  info: "#66e3f3",
  warn: "#ffe267",
  error: "#ff68ca",
};


export const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "300px",
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    fontFamily: "monospace",
    fontSize: "12px",
    overflowY: "auto",
    zIndex: 9999,
    borderTop: "1px solid #333",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    pointerEvents: "auto",
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
    backgroundColor: "#333",
    fontFamily: "system-ui",
    fontWeight: "700",
    position: "sticky",
    top: 0,
    boxSizing: "border-box",
    margin: 0,
  } as React.CSSProperties,

  headerLogo: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  button: {
    appearance: "none",
    border: "none",
    marginLeft: 8,
    backgroundColor: "#ffffff11",
    color: "inherit",
    fontFamily: "system-ui",
    fontSize: "inherit",
    cursor: "pointer",
    padding: 4,
    borderRadius: "2px",
    lineHeight: "inherit",
    boxSizing: "border-box",
  } as React.CSSProperties,

  icon: {
    width: "14px",
    height: "14px",
    marginRight: "-4px",
    boxSizing: "border-box",
  } as React.CSSProperties,

  logo: {
    width: "80px",
    height: "14px",
    boxSizing: "border-box",
  } as React.CSSProperties,

  logRow: {
    padding: "4px 8px",
    borderBottom: "1px solid #333",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    boxSizing: "border-box",
    margin: 0,
  } as React.CSSProperties,

  logTimestamp: {
    color: "#777",
    fontFamily: "monospace",
    marginRight: "1em",
    boxSizing: "border-box",
  } as React.CSSProperties,

  milliSecond: {
    fontSize: "10px",
  } as React.CSSProperties,

  logArgs: {
    marginRight: "8px",
    boxSizing: "border-box",
  } as React.CSSProperties,

  chiramiButton: {
    appearance: "none",
    position: "fixed",
    bottom: "10px",
    right: "10px",
    zIndex: 9999,
    padding: "0 8px",
    backgroundColor: "#333",
    opacity: "0.5",
    color: "#ccc",
    border: "none",
    borderRadius: "12px",
    boxShadow: "#00000033 1px 1px 2px 2px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    fontWeight: "400",
    boxSizing: "border-box",
    margin: 0,
    lineHeight: "normal",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "inherit",
  } as React.CSSProperties,

  buttonIcon: {
    width: "12px",
    boxSizing: "border-box",
  } as React.CSSProperties,



  chiramiButtonCount: {
    color: "#f40",
    fontFamily: "monospace",
    fontWeight: "700",
  } as React.CSSProperties,
};