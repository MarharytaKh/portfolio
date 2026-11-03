
const ICONS = {
  gear: `
.....##.....
..#.####.#..
.##########.
..###..###..
.###....###.
####....####
####....####
.###....###.
..###..###..
.##########.
..#.####.#..
.....##.....`,
  glass: `
..####......
.#oooo#.....
#oo..oo#....
#o....o#....
#o....o#....
#oo..oo#....
.#oooo#.....
..####.#....
.......##...
........##..
.........##.
..........##`,
  bubble: `
############
#oooooooooo#
#o##o###o#o#
#oooooooooo#
#o####o##oo#
#oooooooooo#
############
...##.......
...#........`,
  brush: `
.........###
........#oo#
.......#oo#.
......#oo#..
.....#oo#...
....#oo#....
..###.#.....
.#####......
.####.......
#####.......
###.........`,
  chip: `
..#.#.#.#...
.#########..
##.......##.
.#.#####.#..
##.#ooo#.##.
.#.#ooo#.#..
##.#####.##.
.#.......#..
.#########..
..#.#.#.#...`,
  star: `
.....##.....
.....##.....
....#oo#....
############
.#oooooooo#.
..#oooooo#..
...#oooo#...
..#oo##oo#..
.#oo#..#oo#.
.##......##.`,
  cube: `
.....##.....
...##oo##...
.##oooooo##.
#.##oooo##.#
#...####...#
#....#.....#
#....#.....#
#....#.....#
.##..#...##.
...###.##...
.....##.....`,
  sword: `
..........##
.........#o#
........#o#.
.......#o#..
......#o#...
.#...#o#....
..#.#o#.....
...#o#......
..#.##......
.#...#......
#...........`,
  mail: `
############
##oooooooo##
#o#oooooo#o#
#oo#oooo#oo#
#ooo####ooo#
#oooooooooo#
############`,
  phone: `
.####.......
#oooo#......
#oo#o#......
#o##.#......
#o#..#......
#o#...#.....
#oo#...#.##.
.#oo#...#oo#
..#oo###oo#.
...#oooooo#.
....######..`,
  chart: `
#...........
#.......###.
#.......#o#.
#...###.#o#.
#...#o#.#o#.
#...#o#.#o#.
#.###o#.#o#.
#.#o#o#.#o#.
#.#o#o#.#o#.
############`,
  db: `
..########..
.#oooooooo#.
#oooooooooo#
#.########.#
#oooooooooo#
#.########.#
#oooooooooo#
#.########.#
#oooooooooo#
.#oooooooo#.
..########..`,
  board: `
############
#o.o.o.o.o.#
#.o.o.o.o.o#
#o.o.##o.o.#
#.o.#oo#.o.#
#o.o.##o.o.#
#.o.o.o.o.o#
#o.o.o.o.o.#
############`,
  pin: `
..####..
.#oooo#.
#oo##oo#
#oo##oo#
#oooooo#
.#oooo#.
..#oo#..
...##...`,
  crown: `
#.....#.....#
##...###...##
#o#.#ooo#.#o#
#oo#ooooo#oo#
#ooooooooooo#
#ooooooooooo#
#############
#o#o#o#o#o#o#
#############`
};

function pixelSVG(map) {
  const rows = map.trim().split("\n");
  const h = rows.length;
  const w = Math.max(...rows.map(r => r.length));
  let rects = "";
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === "#") rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="currentColor"/>`;
      else if (c === "o") rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="var(--px-accent)"/>`;
    });
  });
  const size = Math.max(w, h);
  const ox = (size - w) / 2, oy = (size - h) / 2;
  return `<svg viewBox="${-ox} ${-oy} ${size} ${size}" aria-hidden="true" focusable="false">${rects}</svg>`;
}

document.querySelectorAll("[data-px]").forEach(el => {
  const map = ICONS[el.dataset.px];
  if (map) el.innerHTML = pixelSVG(map);
});

const OLD_SITE  = "https://marharytakh.github.io/portfolio/";
document.querySelectorAll(".slot img").forEach(img => {
  const src = img.getAttribute("src");
  const queue = [];
  if (src.startsWith("images/") && !location.href.startsWith(OLD_SITE)) queue.push(OLD_SITE + src);
  if (img.dataset.fallback) queue.push(img.dataset.fallback);
  const onFail = () => {
    if (queue.length) img.src = queue.shift();
    else if (img.closest("[data-optional]")) img.closest("[data-optional]").remove()
    else img.closest(".slot").classList.add("is-empty");
  };
  img.addEventListener("error", onFail);
  if (img.complete && img.naturalWidth === 0) onFail();
});

const projects = document.querySelector(".projects");
const switchBtns = document.querySelectorAll(".switch__btn");

function setMode(mode) {
  if (!projects) return
  projects.dataset.mode = mode;
  switchBtns.forEach(b => b.setAttribute("aria-checked", String(b.dataset.mode === mode)));
  try{ localStorage.setItem("explainMode", mode) }catch(e){}
}

switchBtns.forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
document.querySelectorAll("[data-set-mode]").forEach(a =>
  a.addEventListener("click", () => setMode(a.dataset.setMode))
);
try {
  const saved = localStorage.getItem("explainMode");
  if (saved === "tech" || saved === "plain") setMode(saved);
} catch (e) {}

document.querySelectorAll(".lvl").forEach(el => {
  const n = Number(el.dataset.lvl) || 0;
  el.innerHTML = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? "" : "off"}"></i>`).join("");
});

const clock = document.getElementById('clock')
function tick(){
  clock.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Warsaw"
  }).format(new Date());
}
if (clock) { tick(); setInterval(tick, 15000); }

const copyBtn = document.getElementById("copy-mail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      copyBtn.textContent = "copied!";
    } catch (e) {
      copyBtn.textContent = "select & copy";
    }
    setTimeout(() => (copyBtn.textContent = "copy"), 1800);
  });
}

let year=document.getElementById('year')

if(year) year.textContent=new Date().getFullYear()


document.querySelectorAll('.video[data-yt]').forEach(box => {
  const id = (box.dataset.yt || '').trim()
  if (!id) return
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${box.dataset.title || 'Video'}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`
})
