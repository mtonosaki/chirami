export type LogType = 'log' | 'info' | 'warn' | 'error';

export interface LogItem {
  id: string;
  type: LogType;
  args: any[];
  timestamp: number;
}

type Listener = (logs: LogItem[]) => void;
const MAX_LOG_COUNT = 400;

class ChiramiStore {
  private logs: LogItem[] = [];
  private totalCount: number = 0;
  private listeners = new Set<Listener>();
  private originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
  private isPatched = false;

  public init() {
    if (this.isPatched) return;

    (['log', 'info', 'warn', 'error'] as const).forEach((type) => {
      console[type] = (...args: any[]) => {
        this.originalConsole[type].apply(console, args);
        this.addLog(type, args);
      };
    });

    this.totalCount = 0;
    this.isPatched = true;
  }

  private addLog(type: LogType, args: any[]) {
    const logItem: LogItem = {
      id: Math.random().toString(36).slice(2),
      type,
      args,
      timestamp: Date.now(),
    };

    this.logs = [...this.logs.slice(-(MAX_LOG_COUNT - 1)), logItem];
    this.totalCount = this.totalCount + 1;
    this.notify();
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.logs);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.logs));
  }

  public getLogs() {
    return this.logs;
  }

  public getTotalCount(): number {
    return this.totalCount;
  }

  public clear() {
    this.logs = [];
    this.notify();
  }

  public dispose() {
    if (!this.isPatched) return;

    (['log', 'info', 'warn', 'error'] as const).forEach((type) => {
      console[type] = this.originalConsole[type];
    });

    this.logs = [];
    this.totalCount = 0;
    this.listeners.clear();
    this.isPatched = false;
  }
}

export const chiramiStore = new ChiramiStore();