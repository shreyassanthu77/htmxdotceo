import ceos from "./ceos.json";

const templVars = {
  ceos: async () => {
    const size = 400;
    let html = "";
    for (const ceo of ceos) {
      const imgUrl = `img/${ceo}.jpg`;
      html +=
        `<a title="${ceo}" href="https://twitter.com/${ceo}" class="img"><img width="${size}" height="${size}" src="${imgUrl}" alt="${ceo}"\n loading="lazy" /></a>\n`;
    }
    return html;
  },
};

const templates = new Bun.Glob("templ/**/*.html");
const varKeys = Object.keys(templVars) as (keyof typeof templVars)[];
for await (const templ of templates.scan()) {
  let file = await Bun.file(templ).text();
  for (const key of varKeys) {
    file = file.replace(`{{${key}}}`, await templVars[key]());
  }
  const dest = templ.replace("templ/", "public/");
  await Bun.write(dest, file);
}
export {};
