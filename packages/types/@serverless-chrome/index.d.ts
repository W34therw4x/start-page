declare module '@serverless-chrome/lambda' {
  export default function IServerlessChromeLambda(
    options?: IOption
  ): Promise<IServerLessChrome>;

  interface IOption {
    flags?: string[];
    chromePath?: string;
    port?: number;
    forceLambdaLauncher?: boolean;
  }

  interface IServerLessChrome {
    pid: number;
    port: number;
    url: string;
    log: string;
    errorLog: string;
    pidFile: string;
    metaData: {
      launchTime: number;
      didLaunch: boolean;
    };
    kill: () => void;
  }
}
