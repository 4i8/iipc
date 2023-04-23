declare module "iipc" {
  interface On {
    res: any;
    resolve: (data: any) => void;
  }
  type events = "receive" | "listening";
  export class ipc {
    /**
     *
     * @param Secret Secret key Or Port
     */
    constructor(Secret?: string | number);
    public on(event: events, callback: (req: On) => void): void;
    public port: number;
  }
  export function client(secret: string, res: any): Promise<any>;
}
