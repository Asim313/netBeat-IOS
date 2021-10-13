export declare class OpenViduLogger {
    private logger;
    private LOG_FNS;
    private isProdMode;
    constructor();
    log(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    enableProdMode(): void;
}
