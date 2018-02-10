export default class Logger {
  private static _startTime: number;

  public static start (): void {
    Logger._startTime = Date.now();
  }

  public static finish (): void {
    console.log(`Transpiled in ${Date.now() - Logger._startTime}ms!`);
  }
}
