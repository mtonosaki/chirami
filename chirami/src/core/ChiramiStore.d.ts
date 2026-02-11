export type LogType = 'log' | 'info' | 'warn' | 'error';
export interface LogItem {
    id: string;
    type: LogType;
    args: any[];
    timestamp: number;
}
type Listener = (logs: LogItem[]) => void;
declare class ChiramiStore {
    private logs;
    private totalCount;
    private listeners;
    private originalConsole;
    private isPatched;
    init(): void;
    private addLog;
    subscribe(listener: Listener): () => void;
    private notify;
    getLogs(): LogItem[];
    getTotalCount(): number;
    clear(): void;
}
export declare const chiramiStore: ChiramiStore;
export {};
