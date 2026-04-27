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
      ["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12",{"x":0.25},"PrtSc","Scroll\nLock","Pause\nBreak"],
      [{"y":0.5},"`\n~","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace",{"x":0.25},"Insert","Home","PgUp",{"x":0.25},"Num\nLock","/\n","*\n","-\n"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\",{"x":0.25},"Delete","End","PgDn",{"x":0.25},"7\nHome","8\nUp","9\nPgUp",{"h":2},"+\n"],
      [{"w":1.75},"Caps\nLock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter",{"x":3.5},"4\nLeft","5\n","6\nRight"],
      [{"w":2.25},"Shift\n","Z","X","C","V","B","N","M",",\n<",".\n>","/\n?",{"w":2.75},"Shift\n",{"x":1.25},"Up\n",{"x":1.25},"1\nEnd","2\nDown","3\nPgDn",{"h":2},"Enter\n"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.25},"Left\n","Down\n","Right\n",{"x":0.25,"w":2},"0\nIns",".\nDel"]
    ]
  },
  {
    name: "Default 60%",
    data: [
      ["`\n~","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M",",\n<",".\n>","/\n?",{"w":2.75},"Shift"],
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
      [{"y":0.5},"`\n~","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M",",\n<",".\n>","/\n?",{"w":2.75},"Shift"],
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

function parseKeyLabel(cell: string): { primary: string; secondary?: string } {
  if (typeof cell !== 'string') return { primary: '' };
  if (!cell.trim()) return { primary: '' };
  const parts = cell.split('\n');
  return { 
    primary: parts.length > 1 ? parts[1] : parts[0] || '',
    secondary: parts.length > 1 ? parts[0] : undefined
  };
}

export interface ParsedKeyboard {
  keys: import('./index').Key[];
  width: number;
  height: number;
}

export function loadPreset(preset: KeyboardPreset): ParsedKeyboard {
  const keys: import('./index').Key[] = [];
  let currentX = 0;
  let currentY = 0;
  let maxX = 0;
  let maxY = 0;
  let keyWidth = 1;
  let keyHeight = 1;

  for (let rowIdx = 0; rowIdx < preset.data.length; rowIdx++) {
    const row = preset.data[rowIdx];
    currentX = 0;
    keyWidth = 1;
    keyHeight = 1;

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = row[colIdx];

      if (typeof cell === 'object' && cell !== null && !Array.isArray(cell)) {
        const props = cell as Record<string, unknown>;
        if (typeof props.x === 'number') currentX += props.x;
        if (typeof props.y === 'number') currentY += props.y;
        if (typeof props.w === 'number') keyWidth = props.w;
        if (typeof props.h === 'number') keyHeight = props.h;
        continue;
      }

      if (typeof cell === 'string') {
        const parsed = parseKeyLabel(cell);
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
legend: {
              primary: parsed.primary,
              primaryColor: '#000',
              secondary: parsed.secondary,
              secondaryColor: '#000'
            }
          });
        maxX = Math.max(maxX, currentX + keyWidth);
        maxY = Math.max(maxY, currentY + keyHeight);
        currentX += keyWidth;
        keyWidth = 1;
        keyHeight = 1;
      }
    }
    currentY++;
  }

  return { keys, width: maxX, height: maxY };
}