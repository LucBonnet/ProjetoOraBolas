async function fileContent(path) {
  let file = await fetch(path);
  file = await file.text();

  let content = file.replace(/(\r)/gm, "").trim().split("\n");
  content.shift();
  content = content.map(line => line.split("\t"));
 
  let t = content.map(line => line[0]);
  let x = content.map(line => line[1]);
  let y = content.map(line => line[2]);

  return {t, x, y};
}