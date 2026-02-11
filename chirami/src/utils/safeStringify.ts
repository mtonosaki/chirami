export function safeStringify(value: any, space: number = 2): string {
  const seen = new WeakSet();

  return JSON.stringify(value, (_key, val) => {
    if (val === null || typeof val !== "object") {
      return val;
    }
    if (seen.has(val)) {
      return "[Circular]";
    }
    seen.add(val);

    if (typeof HTMLElement !== "undefined" && val instanceof HTMLElement) {
      const id = val.id ? `#${val.id}` : "";
      const className = val.className ? `.${val.className.split(" ").join(".")}` : "";
      return `<${val.tagName.toLowerCase()}${id}${className}>`;
    }

    if (val instanceof Error) {
      return {message: val.message, stack: val.stack};
    }

    return val;
  }, space);
}
