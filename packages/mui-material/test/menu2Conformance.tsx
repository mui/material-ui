/**
 * Menu2 parts render inside a portal, surrounded by Base UI focus-guard nodes,
 * so no real parent element has the part's root as its `firstChild` -- the
 * contract `describeConformance` relies on. Hand the harness a stand-in
 * container pointing at the part's root instead.
 *
 * A `getRootElement` option in the shared harness would remove the need for
 * this; see the Menu2 RFC draft.
 */
export default function withPortalledRoot<Result extends { container: HTMLElement }>(
  result: Result,
  selector: string,
) {
  const { container, ...other } = result;
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`menu2Conformance: no element matched "${selector}".`);
  }

  return { ...other, container: { firstChild: root } as unknown as HTMLElement };
}
