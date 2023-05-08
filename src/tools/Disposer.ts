export type CleanupFn = CallableFunction

/**
 * A class that can be used to manage a set of disposable resources.
 *
 * @example
 * ```ts
 * const disposer = new Disposer();
 * disposer.add(() => setTimeout(() => console.log('Hello'), 1000));
 * disposer.dispose();
 * ```
 */
export class Disposer {
  private readonly _disposables: Set<CleanupFn> = new Set()

  public add(disposable: CleanupFn): void {
    this._disposables.add(disposable)
  }

  public dispose(): void {
    this._disposables.forEach((dispose) => void dispose())
    this._disposables.clear()
  }
}
