import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, HeadContent, Scripts, createFileRoute, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState, useRef, useCallback, useEffect } from "react";
import { useReactFlow, NodeResizeControl, Handle, Position, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, ReactFlow, Controls, Background, Panel } from "@xyflow/react";
import { cva } from "class-variance-authority";
import { Slot, AlertDialog as AlertDialog$1, Dialog as Dialog$1 } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Editor } from "@monaco-editor/react";
import { Trash2Icon, XIcon } from "lucide-react";
function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error("DefaultCatchBoundary Error:", error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    scripts: [
      {
        src: "/customScript.js",
        type: "text/javascript"
      }
    ]
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function ResizeIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "#ff0071",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("polyline", { points: "16 20 20 20 20 16" }),
        /* @__PURE__ */ jsx("line", { x1: "14", y1: "14", x2: "20", y2: "20" }),
        /* @__PURE__ */ jsx("polyline", { points: "8 4 4 4 4 8" }),
        /* @__PURE__ */ jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" })
      ]
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function AddNode({ id, data, getNode }) {
  return /* @__PURE__ */ jsx("div", { className: "shrink-0 p-3 bg-slate-900 border-t border-slate-800", children: /* @__PURE__ */ jsx(
    Button,
    {
      size: "sm",
      className: "nodrag w-full bg-blue-600 hover:bg-blue-500 text-white",
      onClick: () => {
        const currentNode = getNode(id);
        if (currentNode && data.onAdd) {
          data.onAdd({ old_id: currentNode.id, old_pos: currentNode.position });
        }
      },
      children: "Add Node"
    }
  ) });
}
function CodeEditor({ id, data, updateNodeData }) {
  return /* @__PURE__ */ jsx("div", { className: "grow min-h-0 w-full relative nodrag nowheel", children: /* @__PURE__ */ jsx(
    Editor,
    {
      height: "100%",
      defaultValue: data.content || "//Your Code here...",
      theme: "vs-dark",
      onChange: (val) => updateNodeData(id, { content: val }),
      options: {
        minimap: { enabled: false },
        fontSize: 12,
        padding: { top: 10 },
        scrollBeyondLastLine: false,
        automaticLayout: true
      }
    }
  ) });
}
function TitleBar({ id }) {
  return /* @__PURE__ */ jsxs("div", { className: "shrink-0 bg-slate-950 p-2 border-b border-slate-800 flex justify-between items-center handle", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-slate-200 pl-2", children: [
      "Controller ",
      id
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-500", children: [
      "ID: ",
      id
    ] })
  ] });
}
const Controllernode = ({ id, data }) => {
  const { updateNodeData, getNode } = useReactFlow();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden", children: [
    /* @__PURE__ */ jsx(NodeResizeControl, { style: { border: "2px solid black" }, minWidth: 300, minHeight: 300, children: /* @__PURE__ */ jsx(ResizeIcon, {}) }),
    /* @__PURE__ */ jsx(TitleBar, { id }),
    /* @__PURE__ */ jsx(CodeEditor, { id, data, updateNodeData }),
    /* @__PURE__ */ jsx(AddNode, { id, data, getNode }),
    /* @__PURE__ */ jsx(Handle, { position: Position.Left, type: "target" }),
    /* @__PURE__ */ jsx(Handle, { position: Position.Right, type: "source" })
  ] });
};
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialog$1.Content,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogMedia({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: cn(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      ),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx(
    AlertDialog$1.Action,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  ) });
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx(
    AlertDialog$1.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props
    }
  ) });
}
function ResetFlow(flowKey2) {
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "destructive", children: "Reset Flow" }) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { size: "sm", children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogMedia, { className: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive", children: /* @__PURE__ */ jsx(Trash2Icon, {}) }),
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Reset flow?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This will remove reset flow to its original state and may delete any node that you have added. Are you sure you want to continue?" })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            variant: "destructive",
            onClick: () => {
              localStorage.removeItem(flowKey2);
              window.location.reload();
            },
            children: "Reset Flow"
          }
        )
      ] })
    ] })
  ] });
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      Dialog$1.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            Dialog$1.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsx(Dialog$1.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function HelpBox() {
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "default", children: "Help" }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Help" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "These are the basics of how to use the React Flow editor. For more detailed information, please refer to the documentation." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "-mx-4 max-h-[50vh] overflow-y-auto px-4", children: /* @__PURE__ */ jsxs("p", { className: "mb-4 leading-normal", children: [
        'To add a new node, click on the "Add Node" button on the bottom of an existing node. The new node will be connected to that node',
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "To edit a node's content, simply click on the node and start typing in the code editor that appears.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        'You can also delete a node by selecting it and pressing the "Delete" or "Backspace" key on your keyboard.'
      ] }) }),
      /* @__PURE__ */ jsx(DialogFooter, { className: "sm:justify-end", children: /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", children: "Close" }) }) })
    ] })
  ] });
}
const Route = createFileRoute("/")({
  component: Home
});
const initialEdges = [];
const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1", onAdd: () => {
    }, content: "Type or Paste code here..." },
    type: "controllernode",
    style: { width: 400, height: 400 }
  }
];
const flowKey = "xyflow-demo";
const nodeTypes = {
  controllernode: Controllernode
};
function InnerHome() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const idcounter = useRef(2);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const addNode = useCallback(({ old_id, old_pos }) => {
    const newId = `${idcounter.current++}`;
    const newNode = {
      id: newId,
      position: { x: old_pos.x + 450, y: old_pos.y + (Math.random() - 0.5) * 200 },
      data: {
        label: `Node ${newId}`,
        onAdd: addNode,
        content: "// Type or Paste code here..."
      },
      type: "controllernode",
      style: { width: 400, height: 300 }
    };
    const newEdge = {
      id: `${newId}-${old_id}`,
      source: old_id,
      target: newId
    };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  }, []);
  const onRestore = useCallback(() => {
    const flowdata = localStorage.getItem(flowKey);
    const flow = flowdata ? JSON.parse(flowdata) : null;
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      let maxId = 0;
      (flow.nodes || []).forEach((node) => {
        const nId = parseInt(node.id);
        if (!isNaN(nId)) maxId = Math.max(maxId, nId);
      });
      idcounter.current = maxId + 1;
      const restoredNodes = (flow.nodes || []).map((node) => ({
        ...node,
        data: { ...node.data, onAdd: addNode }
      }));
      setNodes(restoredNodes);
      setEdges(flow.edges || []);
      setTimeout(() => setViewport({ x, y, zoom }), 0);
    }
  }, [addNode, setViewport]);
  useEffect(() => {
    onRestore();
  }, [onRestore]);
  useEffect(() => {
    if (rfInstance && nodes.length > 0) {
      const saveInterval = setInterval(() => {
        const flow = rfInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
      }, 1e3);
      return () => clearInterval(saveInterval);
    }
  }, [rfInstance, nodes, edges]);
  useEffect(() => {
    setNodes((nds) => nds.map((node) => ({
      ...node,
      data: { ...node.data, onAdd: addNode }
    })));
  }, [addNode]);
  return /* @__PURE__ */ jsx("div", { style: { width: "100vw", height: "100vh" }, children: /* @__PURE__ */ jsxs(
    ReactFlow,
    {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onInit: setRfInstance,
      nodeTypes,
      fitView: true,
      fitViewOptions: { maxZoom: 1 },
      colorMode: "dark",
      children: [
        /* @__PURE__ */ jsx(Controls, {}),
        /* @__PURE__ */ jsx(Background, {}),
        /* @__PURE__ */ jsxs(Panel, { position: "top-center", className: "pt-1 gap-2 flex", children: [
          /* @__PURE__ */ jsx(ResetFlow, { flowKey }),
          /* @__PURE__ */ jsx(HelpBox, {})
        ] })
      ]
    }
  ) });
}
function Home() {
  return /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(InnerHome, {}) });
}
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  return router;
}
export {
  getRouter
};
