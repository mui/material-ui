interface NavigatorClipboard {
  clipboard: {
    writeText: (value: string) => Promise<void>;
  };
}

interface Navigator extends NavigatorClipboard {}
