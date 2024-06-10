export function invariant(
  condition: unknown,
  message?: string,
): asserts condition {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!condition) {
    throw new Error(message);
  }
}
