"use client";
import { CodeBlock } from "@/components/ui/code-block";

export function NodeCodeBlock(inner_code: any) {
  const code = inner_code;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock
        language="jsx"
        filename="DummyComponent.jsx"
        highlightLines={[9, 13, 14, 18]}
        code={code}
      />
    </div>
  );
}
