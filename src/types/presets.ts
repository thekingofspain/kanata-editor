

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
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\",{"x":0.25},"Delete","End","PgDn",{"x":0.25},"7\nHome","8\n↑","9\nPgUp",{"h":2},"+"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter",{"x":3.5},"4\n←","5","6\n→"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift",{"x":1.25},"↑",{"x":1.25},"1\nEnd","2\n↓","3\nPgDn",{"h":2},"Enter"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.25},"←","↓","→",{"x":0.25,"w":2},"0\nIns",".\nDel"]
    ]
  },
  {
    name: "ISO 105",
    data: [
      ["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12",{"x":0.25},"PrtSc","Scroll Lock","Pause\nBreak"],
      [{"y":0.5},"¬\n`","!\n1","\"\n2","£\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace",{"x":0.25},"Insert","Home","PgUp",{"x":0.25},"Num Lock","/","*","-"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.25,"w2":1.5,"h":2,"h2":1,"x":0.25,"x2":-0.25},"Enter",{"x":0.25},"Delete","End","PgDn",{"x":0.25},"7\nHome","8\n↑","9\nPgUp",{"h":2},"+"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","@\n'","~\n#",{"x":4.75},"4\n←","5","6\n→"],
      [{"w":1.25},"Shift","|\n\\","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift",{"x":1.25},"↑",{"x":1.25},"1\nEnd","2\n↓","3\nPgDn",{"h":2},"Enter"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"AltGr",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.25},"←","↓","→",{"x":0.25,"w":2},"0\nIns",".\nDel"]
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
    name: "ISO 60%",
    data: [
      ["¬\n`","!\n1","\"\n2","£\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"x":0.25,"w":1.25,"h":2,"w2":1.5,"h2":1,"x2":-0.25},"Enter"],
      [{"a":4,"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","@\n'","~\n#"],
      [{"w":1.25},"Shift","|\n\\","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift"],
      [{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"a":7,"w":6.25},"",{"a":4,"w":1.25},"AltGr",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl"]
    ]
  },
  {
    name: "ErgoDox",
    data: [
      [{"x":3.5},"#\n3",{"x":10.5},"*\n8"],
      [{"y":-0.875,"x":2.5},"@\n2",{"x":1},"$\n4",{"x":8.5},"&\n7",{"x":1},"(\n9"],
      [{"y":-0.875,"x":5.5},"%\n5","",{"x":4.5},"","^\n6"],
      [{"y":-0.875,"w":1.5},"","!\n1",{"x":14.5},")\n0",{"w":1.5},""],
      [{"y":-0.375,"x":3.5},"E",{"x":10.5},"I"],
      [{"y":-0.875,"x":2.5},"W",{"x":1},"R",{"x":8.5},"U",{"x":1},"O"],
      [{"y":-0.875,"x":5.5},"T",{"h":1.5},"",{"x":4.5,"h":1.5},"","Y"],
      [{"y":-0.875,"w":1.5},"","Q",{"x":14.5},"P",{"w":1.5},""],
      [{"y":-0.375,"x":3.5},"D",{"x":10.5},"K"],
      [{"y":-0.875,"x":2.5},"S",{"x":1},"F",{"x":8.5},"J",{"x":1},"L"],
      [{"y":-0.875,"x":5.5},"G",{"x":6.5},"H"],
      [{"y":-0.875,"w":1.5},"","A",{"x":14.5},":\n;",{"w":1.5},""],
      [{"y":-0.625,"x":6.5,"h":1.5},"",{"x":4.5,"h":1.5},""],
      [{"y":-0.75,"x":3.5},"C",{"x":10.5},"<\n,"],
      [{"y":-0.875,"x":2.5},"X",{"x":1},"V",{"x":8.5},"M",{"x":1},">\n."],
      [{"y":-0.875,"x":5.5},"B",{"x":6.5},"N"],
      [{"y":-0.875,"w":1.5},"","Z",{"x":14.5},"?\n/",{"w":1.5},""],
      [{"y":-0.375,"x":3.5},"",{"x":10.5},""],
      [{"y":-0.875,"x":2.5},"",{"x":1},"",{"x":8.5},"",{"x":1},""],
      [{"y":-0.75,"x":0.5},"","",{"x":14.5},"",""],
      [{"r":30,"rx":6.5,"ry":4.25,"y":-1,"x":1},"",""],
      [{"h":2},"",{"h":2},"",""],
      [{"x":2},""],
      [{"r":-30,"rx":13,"y":-1,"x":-3},"",""],
      [{"x":-3},"",{"h":2},"",{"h":2},""],
      [{"x":-3},""]
    ]
  },
  {
    name: "Atreus",
    data: [
      [{"r":10,"rx":1},{"y":0.5},"Q",{"y":-0.25},"W",{"y":-0.35},"E",{"y":0.35},"R",{"y":0.35},"T"],
      [{"y":-0.1},"A",{"y":-0.25},"S",{"y":-0.35},"D",{"y":0.35},"F",{"y":0.35},"G"],
      [{"y":-0.1},"Z",{"y":-0.25},"X",{"y":-0.35},"C",{"y":0.35},"V",{"y":0.35},"B"],
      [{"y":-0.1},"Esc",{"y":-0.25},"Tab",{"y":-0.35},"super",{"y":0.35},"Shift",{"y":0.35},"Bksp",{"y":-0.75,"h":1.5},"Ctrl"],
      [{"r":-10,"rx":7,"ry":0.965},{"y":0.5},"Y",{"y":-0.35},"U",{"y":-0.35},"I",{"y":0.35},"O",{"y":0.25},"P"],
      [{"y":0.1},"H",{"y":-0.35},"J",{"y":-0.35},"K",{"y":0.35},"L",{"y":0.25},":\n;"],
      [{"y":0.1},"N",{"y":-0.35},"M",{"y":-0.35},"<\n,",{"y":0.35},">\n.",{"y":0.25},"?\n/"],
      [{"y":-0.65,"x":-1,"h":1.5},"Alt",{"y":0.75},"Space",{"y":-0.35},"fn",{"y":-0.35},"_\n-",{"y":0.35},"\"\n'",{"y":0.25},"Enter"]
    ]
  },
  {
    name: "Planck",
    data: [
      [{"a":7},"Tab","Q","W","E","R","T","Y","U","I","O","P","Back Space"],
      ["Esc","A","S","D","F","G","H","J","K","L",";","'"],
      ["Shift","Z","X","C","V","B","N","M",",",".","/","Return"],
      ["","Ctrl","Alt","Super","&dArr;",{"w":2},"","&uArr;","&larr;","&darr;","&uarr;","&rarr;"]
    ]
  },
  {
    name: "Leopold FC660m",
    data: [
      ["~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace",{"x":0.5},"Insert"],
      [{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\",{"x":0.5},"Delete"],
      [{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter"],
      [{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.25},"Shift","↑"],
      [{"w":1.25},"Ctrl","Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Ctrl",{"w":1.25},"Menu","←","↓","→"]
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
  let currentX = 0;
  let currentY = 0;
  let maxX = 0;
  let maxY = 0;
  
  // Simple first pass: parse strings to keys
  for (const row of preset.data) {
    let rowStartX = currentX;
    for (const cell of row) {
      if (typeof cell === 'string' && cell.trim()) {
        const { label } = parseKeyLabel(cell);
        if (label) {
          // Determine key width from any preceding objects in row
          let width = 1;
          let height = 1;
          for (const c of row) {
            if (typeof c === 'object' && c !== null) {
              if ((c as any).w) width = (c as any).w;
              if ((c as any).h) height = (c as any).h;
            }
          }
          
          keys.push({
            id: generateId(),
            x: currentX,
            y: currentY,
            width,
            height,
            rotation: 0,
            shape: 'rounded',
            color: '#ffffff',
            hardware: { row: 0, col: 0, layer: 0 },
            function: { keycode: '' },
            legend: { center: { text: label, color: '#000' } }
          });
        }
      }
      
      // Handle position changes
      if (typeof cell === 'object' && cell !== null) {
        const props = cell as any;
        if (props.x) currentX += props.x;
        if (props.y) currentY += props.y;
        if (props.w) currentX += props.w - 1; // width consumes space
      } else if (typeof cell === 'string') {
        currentX++;
      }
    }
    currentY++;
    currentX = rowStartX;
  }
  
  maxX = Math.max(...keys.map(k => k.x + k.width));
  maxY = Math.max(...keys.map(k => k.y + k.height));
  
  return { keys, width: maxX, height: maxY };
}