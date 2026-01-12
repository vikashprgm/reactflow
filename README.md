# ReactFlow Graph Editor

A interactive graph editing application built with React, TypeScript, and [@xyflow/react](https://www.xyflow.com/). Create, connect, and manage nodes in a visual canvas with persistent local storage.

## Features

- **Interactive Node Canvas** — Pan, zoom, and drag nodes on a visual graph
- **Dynamic Node Creation** — Add nodes from within existing nodes via the "Add Node" button
- **Node Connections** — Draw edges between nodes to establish relationships
- **Persistent Storage** — Auto-save graph state to browser localStorage
- **Dark Mode** — Built-in dark theme for comfortable editing
- **Reset Flow** — Clear the canvas and start fresh

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** TanStack Router
- **Graph UI:** @xyflow/react
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React hooks (useState, useCallback)

## Getting Started

### Prerequisites

- Node.js 16+ (recommend using pnpm as package manager)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development Server

Start the local dev server with hot module reload:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
pnpm build
```

This runs both Vite bundling and TypeScript type checking (`tsc --noEmit`). Fix any type errors before deployment.

### Preview Production Build

```bash
pnpm preview
```

Serves the built output locally to simulate production.

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root route (shell, layout, error boundary)
│   └── index.tsx           # Main page with ReactFlow canvas
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Textarea, etc.)
│   └── [other components]
├── graph/
│   ├── nodes.ts            # Initial nodes configuration
│   └── edges.ts            # Initial edges configuration
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Root component wrapper
└── main.tsx                # Entry point
```

## Key Concepts

### Node Types

Currently supports the `controllernode` type — a custom node with:
- Textarea input for node content
- "Add Node" button to create child nodes
- Visual handles (left for input, right for output)

### State Management

Graph state (nodes, edges) is lifted to the `InnerHome` component using React hooks:
- `nodes` and `edges` state
- `onNodesChange`, `onEdgesChange`, `onConnect` handlers
- `addNode` callback that creates new nodes with automatic positioning

### Persistence

The graph is automatically saved to localStorage under the key `xyflow-demo`:
- Saves on node/edge changes
- Restores on page load
- "Reset Flow" button clears storage and reloads the page

## Usage

1. **Add a Node:** Click the "Add Node" button inside any node to create a child node positioned to the right.
2. **Connect Nodes:** Click and drag from one node's right handle (green dot) to another's left handle to create an edge.
3. **Pan & Zoom:** Click and drag the canvas background to pan; use scroll wheel or pinch to zoom.
4. **Drag Nodes:** Click and drag nodes to reposition them.
5. **Reset:** Click "Reset Flow" at the top to clear all nodes and edges.

## Customization

### Adding a New Node Type

1. Create a new component in `src/components/graph/` (e.g., `CustomNode.tsx`)
2. Register it in `nodeTypes` in `src/routes/index.tsx`
3. Set `type: 'customnode'` when creating nodes

Example:
```typescript
const nodeTypes = {
  controllernode: Controllernode,
  customnode: CustomNode,
};
```

### Styling

- Tailwind CSS is configured; use utility classes (e.g., `className="w-64 p-4"`)
- Dark mode is enabled by default (`colorMode='dark'` on ReactFlow)
- Component-level styles can override defaults

## Development Tips

- Run `pnpm build` locally before committing to catch TypeScript errors
- Use React DevTools to inspect component state and props
- Check browser DevTools Network tab if localStorage restore seems slow
- @xyflow/react exports all necessary types; use them for full type safety

## Deployment

The app is a static Vite build and can be deployed to any static hosting:
- **Netlify:** Drag & drop the `dist/` folder or connect your Git repo
- **Vercel:** Same setup as Netlify
- **GitHub Pages / S3 / etc.:** Serve the `dist/` folder as static files

For environment-specific configs, see `vite.config.ts`.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Button clicks not registering inside ReactFlow | Buttons are inside custom nodes which have `nodrag` class; click propagation is handled by `stopPropagation()` in the node component. |
| Graph not persisting after refresh | Check browser localStorage is enabled; look for `xyflow-demo` key in DevTools Storage tab. |
| Types not checking | Run `pnpm build` to see full errors; fix TypeScript errors before deploying. |
| Nodes appear but don't render content | Ensure `nodeTypes` object includes the node's `type` and the component is exported. |

## License

MIT (or your preferred license)

## Support

For issues or feature requests, please open an issue in the repository.
