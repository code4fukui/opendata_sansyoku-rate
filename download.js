import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "http://foodhub.co.jp/eat/self_sufficient/";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
const items = dom.querySelectorAll(".list-self_sufficient-archive li");
const data = [];
for (const item of items) {
  const average = item.querySelector(".avarage")?.text; // average?
  if (!average) continue;
  const url = item.querySelector(".figure img").getAttribute("src");
  const year = url.split("/")[6];
  const date0 = item.querySelector(".title").text;
  const date = year + "年" + date0.substring(0, date0.length - 1);
  console.log(date, average);
  data.push({ week: new Day(date).toString(), average });
}
await Deno.writeTextFile("sansyoku-rate_kamiyama_kamaya.csv", CSV.stringify(data));
