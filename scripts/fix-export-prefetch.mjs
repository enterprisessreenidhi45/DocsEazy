// Next.js 16.4 static export writes nested segment prefetch files as folders
// (`__next.!KHNpdGUp/__PAGE__.txt`), but the client requests them with every `/` turned
// into `.` (`__next.!KHNpdGUp.__PAGE__.txt`), so each prefetch 404s. This copies every
// such file to the name the client asks for. It skips files that already exist, so it
// becomes a no-op once Next.js writes the dotted names itself.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

function visit(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory() || name === "_next") continue;
    if (!name.startsWith("__next.")) {
      visit(path);
      continue;
    }
    for (const file of filesUnder(path)) {
      const dotted = join(dir, `${name}.${relative(path, file).split(sep).join(".")}`);
      if (!existsSync(dotted)) {
        copyFileSync(file, dotted);
        copied++;
      }
    }
  }
}

visit(OUT);
console.log(`fix-export-prefetch: added ${copied} prefetch file(s)`);
