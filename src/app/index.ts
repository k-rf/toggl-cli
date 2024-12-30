import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const main = async () => {
  const files = await readdir(path.join(process.cwd(), "csv"), {
    encoding: "utf-8",
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.isFile() && file.name.endsWith(".csv")) {
      const raw = await readFile(path.join(file.parentPath, file.name), "utf-8");
      const [, ...contents] = raw
        .split("\n")
        .map((row) => row.split(",").map((col) => col.trim().replaceAll('"', "")));

      const dayEvents = new Set(
        contents
          // TODO: 外部ファイルから読み取る
          .filter((row) => [""].includes(row[2] ?? ""))
          .map((row) => `  - "[[${row[5]}]]"`),
      ).values();

      console.log(`### ${file.name}`);
      console.log([...dayEvents].join("\n"));
    }
  }
};

await main();
