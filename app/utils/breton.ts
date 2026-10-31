const months: Record<string, string> = {
  January: 'Genver',
  February: 'C\'hwevrer',
  March: 'Meurzh',
  April: 'Ebrel',
  May: 'Mae',
  June: 'Mezheven',
  July: 'Gouere',
  August: 'Eost',
  September: 'Gwengolo',
  October: 'Here',
  November: 'Du',
  December: 'Kerzu',
}
const date = (d: string, m: string, y: string) => `${d} a viz ${months[m] ?? m} ${y}`

export const bretonPatterns: [RegExp, (...m: string[]) => string][] = [
  [/^([\d,]+) commits?$/, (_, n) => `${n} kemmadenn`],
  [/^(.+), ([\d,]+) commits?, on GitHub$/, (_, who, n) => `${who}, ${n} kemmadenn, war GitHub`],
  [/^(\d+) contributors? on GitHub$/, (_, n) => `${n} kenlabourer war GitHub`],
  [/^© (\d{4}) QxChat contributors\. Free software under the MIT licence\.$/, (_, y) => `© ${y} kenlabourerien QxChat. Meziant frank dindan al lañvaz MIT.`],
  [/^Version (v[\d.]+), (\d+) (\w+) (\d{4}) ·$/, (_, v, d, m, y) => `Handelv ${v}, ${date(d, m, y)} ·`],
  [/^Updated (\d+) (\w+) (\d{4})$/, (_, d, m, y) => `Hizivaet d'an ${date(d, m, y)}`],
  [/^(\d+) min read$/, (_, n) => `${n} munutenn lenn`],
  [/^(\d+) sections$/, (_, n) => `${n} rann`],
  [/^Nothing matches “(.*)”\.$/, (_, q) => `Netra ne glot gant “${q}”.`],
  [/^(#[0-9a-f]{6}) copied$/, (_, h) => `${h} eilet`],
  [/^Download for (.+)$/, (_, os) => `Pellgargañ evit ${os}`],
]

export const bretonHero = { start: 'Kaozeal e prevez,', end: 'war ho servijer deoc\'h.' }
