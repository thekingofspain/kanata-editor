

export interface KeyboardPreset {
  name: string;
  data: (string | { x?: number; y?: number; w?: number; h?: number; w2?: number; h2?: number; x2?: number; y2?: number; r?: number; rx?: number; ry?: number; a?: number })[][];
}

export const KEYBOARD_PRESETS: KeyboardPreset[] = [
  {
    name: "Blank Layout",
    data: []
  },
  {
    name: "ANSI 104",
    data: [
      ["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12",{"x":0.25},"PrtSc","Scroll Lock","Pause\nBreak"],
      [{"y":0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace",{"x":0.25},"Insert","Home","PgUp",{"x":0.25},"Num Lock","/","*","-"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\",{"x":0.25},"Delete","End","PgDn",{"x":0.25},"7\nHome","8\nUp","9\nPgUp",{"h":2},"+"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter",{"x":3.5},"4\nLeft","5","6\nRight"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift",{"x":1.25},"Up",{"x":1.25},"1\nEnd","2\nDown","3\nPgDn",{"h":2},"Enter"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.25},"Left","Down","Right",{"x":0.25,"w":2},"0\nIns",".\nDel"]
    ]
  },
  {
    name: "Default 60%",
    data: [
      ["~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl"]
    ]
  },
  {
    name: "40%",
    data: [
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Alt",{"w":4},"",{"w":1.25},"Alt",{"w":1.25},"Menu"]
    ]
  },
  {
    name: "TKL (Tenkeyless)",
    data: [
      ["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12"],
      [{"y":0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl"]
    ]
  },
  {
    name: "Ortho 40%",
    data: [
      [{"a":7},"Tab","Q","W","E","R","T","Y","U","I","O","P","Back Space"],
      ["Esc","A","S","D","F","G","H","J","K","L",";","'"],
      ["Shift","Z","X","C","V","B","N","M",",",".","/","Return"],
      ["","Ctrl","Alt","Super","Space","Space","Space","Space","Super","Alt","Ctrl"]
    ]
  }
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function parseKeyLabel(cell: string): { label: string } {
  if (typeof cell !== 'string') return { label: '' };
  const parts = cell.split('\n');
  return { label: parts[0] || '' };
}

export interface ParsedKeyboard {
  keys: import('./index').Key[];
  width: number;
  height: number;
}

export function loadPreset(preset: KeyboardPreset): ParsedKeyboard {
  const keys: import('./index').Key[] = [];
  
  // Track accumulated position and size as we parse the row
  let currentX = 0;
  let currentY = 0;
  let maxX = 0;
  let maxY = 0;
  
  // Process each row
  for (let rowIdx = 0; rowIdx < preset.data.length; rowIdx++) {
    const row = preset.data[rowIdx];
    let rowX = 0;
    
    // Reset x at start of each row but track row-level y
    currentX = rowX;
    
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = row[colIdx];
      
      // Handle object properties (key properties like width, x offset, etc)
      if (typeof cell === 'object' && cell !== null) {
        const props = cell as Record<string, unknown>;
        
        // Apply x/y offsets
        if (typeof props.x === 'number') currentX += props.x;
        if (typeof props.y === 'number') currentY += props.y;
        
        // Skip if this is just a position marker, not a key
        // Keys with width > 1 or height > 1 are handled when we see the string
        continue;
      }
      
      // Handle string (key label)
      if (typeof cell === 'string' && cell.trim()) {
        const label = parseKeyLabel(cell).label;
        if (label) {
          // Find the most recent width/height for this key by looking backward
          let keyWidth = 1;
          let keyHeight = 1;
          
          // Check previous cells in this row for width/height
          for (let i = colIdx - 1; i >= 0; i--) {
            const prevCell = row[i];
            if (typeof prevCell === 'object' && prevCell !== null) {
              const p = prevCell as Record<string, unknown>;
              if (typeof p.w === 'number') keyWidth = p.w;
              if (typeof p.h === 'number') keyHeight = p.h;
            }
          }
          
          // Also check next cells - sometimes width comes after!
          for (let i = colIdx + 1; i < row.length; i++) {
            const nextCell = row[i];
            if (typeof nextCell === 'object' && nextCell !== null) {
              const p = nextCell as Record<string, unknown>;
              if (typeof p.w === 'number' && (p as any).x === undefined) keyWidth = p.w;
              if (typeof p.h === 'number' && (p as any).y === undefined) keyHeight = p.h;
            }
            // Stop looking once we hit another key
            if (typeof nextCell === 'string' && nextCell.trim()) break;
          }
          
          keys.push({
            id: generateId(),
            x: currentX,
            y: currentY,
            width: keyWidth,
            height: keyHeight,
            rotation: 0,
            shape: 'rounded',
            color: '#ffffff',
            hardware: { row: rowIdx, col: colIdx, layer: 0 },
            function: { keycode: '' },
            legend: { center: { text: label, color: '#000' } }
          });
          
          maxX = Math.max(maxX, currentX + keyWidth);
          maxY = Math.max(maxY, currentY + keyHeight);
        }
      }
      
      // Move to next position
      // If this was a key with width, skip that many positions
      if (typeof cell === 'string' && cell.trim()) {
        // Find width for this specific key
        let keyWidth = 1;
        for (let i = colIdx - 1; i >= 0; i--) {
          const prevCell = row[i];
          if (typeof prevCell === 'object' && prevCell !== null) {
            const p = prevCell as Record<string, unknown>;
            if (typeof p.w === 'number') keyWidth = p.w;
          }
        }
        for (let i = colIdx + 1; i < row.length; i++) {
          const nextCell = row[i];
          if (typeof nextCell === 'object' && nextCell !== null) {
            const p = nextCell as Record<string, unknown>;
            if (typeof p.w === 'number' && (p as any).x === undefined) keyWidth = p.w;
          }
          if (typeof nextCell === 'string' && nextCell.trim()) break;
        }
        currentX += keyWidth;
      }
    }
    
    // Move to next row
    currentY++;
    currentX = 0;
  }
  
  return { keys, width: maxX, height: maxY };
}