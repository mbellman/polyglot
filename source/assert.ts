export default function assert (condition: boolean, message?: string): void {
  if (!condition) {
    if (message) {
      console.log(message);
    }

    process.exit(0);
  }
}
