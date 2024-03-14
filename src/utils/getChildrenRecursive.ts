export function getChildrenRecursive(element: HTMLElement) {
  const children: HTMLElement[] = [];
  const toCheck: HTMLElement[] = [element];

  while (toCheck.length) {
    const current = toCheck.shift()!;
    const currentChildren = current.children;
    for (let i = 0; i < currentChildren.length; i++) {
      const currentChild = currentChildren.item(i) as HTMLElement;
      children.push(currentChild);
      if (currentChild.children.length) toCheck.push(currentChild);
    }
  }

  return children;
}
