<img width="1314" height="264" alt="BannerChirami" src="https://github.com/user-attachments/assets/3c3db6f2-ac7e-4ffd-8d79-98dcc098023f" />  

Chirami, a lightweight, overlay-style console log viewer for React applications.  
Perfect for debugging on mobile devices or environments without DevTools.

## Features

- 📱 **Mobile Friendly**: View console logs directly on the UI.
- 🛡️ **Safe**: Handles circular references and prevents XSS.
- ⚡ **Zero Config**: Just import and place the component.
- ⚛️ **React**: Built for React 18+.

## Installation

```bash
npm install chirami
```

# Usage
Import ChiramiViewer and place it anywhere in your app (usually at the root level).

```typescript
import { ChiramiViewer } from 'chirami';

function App() {
  return (
    <div>
      <h1>My App</h1>
      
      {/* Place it here! */}
      <ChiramiViewer />
    </div>
  );
}
```

It automatically captures:
- console.log
- console.warn
- console.error
- console.info

# License
MIT
