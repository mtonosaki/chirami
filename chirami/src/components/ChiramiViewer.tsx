import React, {useEffect, useRef, useState} from "react";
import {IconChirami} from "../assets/IconChirami";
import {LogoChirami} from "../assets/LogoChirami";
import {chiramiStore, type LogItem} from "../core/ChiramiStore";
import {safeStringify} from "../utils/safeStringify";
import {toTimestamp} from "../utils/toTimestamp";
import {styles, typeColors} from "./ChiramiViewer.styles";

export const ChiramiViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const bottomPositionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chiramiStore.init();

    const unsubscribe = chiramiStore.subscribe((newLogs) => {
      setLogs(newLogs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && bottomPositionRef.current) {
      bottomPositionRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [logs, isOpen]);

  if (!isOpen) {
    return (
      <button
        style={styles.chiramiButton}
        onClick={() => setIsOpen(true)}
      >
        <IconChirami style={styles.buttonIcon}/>
        <span style={styles.chiramiButtonCount}>{chiramiStore.getTotalCount()}</span>
      </button>
    );
  }

  return (
    <div style={styles.container} onClick={(e) => e.stopPropagation()}>
      <div style={styles.header}>
        <div style={styles.headerLogo}>
          <IconChirami style={styles.icon}/>
          <LogoChirami style={styles.logo}/>
          <div style={{whiteSpace: "nowrap"}}>({chiramiStore.getTotalCount()})</div>
        </div>
        <div style={{whiteSpace: "nowrap"}}>
          <button onClick={() => chiramiStore.clear()} style={styles.button}>Clear</button>
          <button onClick={() => setIsOpen(false)} style={styles.button}>Close ▼</button>
        </div>
      </div>

      <div style={{textAlign: "left"}}>
        {logs.map((log) => (
          <div key={log.id} style={{...styles.logRow, color: typeColors[log.type]}}>
            <span style={styles.logTimestamp}>
              {toTimestamp(new Date(log.timestamp))}
            </span>
            {log.args.map((arg, i) => (
              <span key={`log-args-${i}`} style={styles.logArgs}>
                {typeof arg === "object" ? safeStringify(arg) : String(arg)}
              </span>
            ))}
          </div>
        ))}
        <div ref={bottomPositionRef}/>
      </div>
    </div>
  );
};

