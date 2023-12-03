const Regex = RegExp;

const i_and = "Ⰻ";

// The dictionary contains all capitals
// Add the charcode by 48 to get the small letters

// ć from czi, dź from dżi, gi, chi, ki, ri, ś from szi, ść from szczi, źi from rzi/żi
const special_pairs = {
	szcz: "Ⱋ",
	
	chi: "ⰘⰋ",  // /xi/
	// ści: "ⰛⰋ",  ś + ć
	dzi: "ⰌⰋ",
	
	ci: "ⰝⰋ",
	gi: "ⰃⰋ",
	ki: "ⰍⰋ",
	ni: "ⰐⰋ",
	ri: "ⰓⰋ",
	si: "ⰞⰋ",
	ść: "ⰛⰋ",
	zi: "ⰆⰋ"
}

const digraph_pairs = {
	ch: "Ⱈ",
	cz: "Ⱍ",
	dz: "Ⰷ",
	dź: "ⰌⰋ",
	dż: "Ⰼ",
	ie: "Ⱔ",
	je: "Ⱔ",
	ję: "Ⱗ",
	ią: "Ⱙ",
	ię: "Ⱗ",
	ja: "Ⱑ",  //  /æ/ or /jɑ/
	ją: "Ⱙ",
	jo: "Ⱖ",
	jó: "Ⱓ",  // same as ju
	ju: "Ⱓ",
	rz: "Ⰶ",
	sz: "Ⱎ",
	ti: "Ⱋ",
	yi: "ⰟⰊ",  // Russian Ы
	th: "Ⱚ",  // Greek Theta
	ue: "Ⱏ",  //  /ɯ/
	// Ⱛ  // Greek Upsilon
}

const single_pairs = {
	a: "Ⰰ",
	ą: "Ⱘ",  // /ɔ̃/
	b: "Ⰱ",
	c: "Ⱌ",
	ć: "ⰝⰋ",
	e: "Ⰵ",
	ę: "Ⱕ",
	d: "Ⰴ",
	f: "Ⱇ",
	g: "Ⰳ",
	h: "Ⱈ",
	i: "Ⰹ", // Ⰺ, Ⰹ  // Ⰻ i (and)
	j: "Ⰺ",
	k: "Ⰽ",
	l: "Ⰾ",
	ł: "Ⱉ",
	m: "Ⰿ",
	n: "Ⱀ",
	ń: "ⰐⰋ",
	o: "Ⱁ",  // Ⱁ: /o/, Ⱉ: /ɔ/
	ó: "Ⱆ",  // same as u
	p: "Ⱂ",
	r: "Ⱃ",
	s: "Ⱄ",
	ś: "ⰞⰋ",
	t: "Ⱅ",
	u: "Ⱆ",
	y: "Ⱏ",  // schwa
	v: "Ⰲ",
	w: "Ⰲ",
	z: "Ⰸ",
	ź: "ⰆⰋ",
	ż: "Ⰶ",
}

function capitalise(s) {
	return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()
}

function isUpper(s) {
	return isNaN(s) && s === s.toUpperCase()
}

function get_glagolitic(input_str) {
	let ans = input_str;
	console.log(ans)
	
	// replace special cases, digraphs, then single letters
	for (const dict of [special_pairs, digraph_pairs, single_pairs])
		for (const [k, v] of Object.entries(dict)) {
			ans = ans.replace(new Regex(k, "gi"), m =>
				isUpper(m[0])
				? capitalise(v) : v.toLowerCase()
			);
		}
	
	// console.log(ans[0]?.charCodeAt(0))
	
	// console.log(`<ruby>${ans}</ruby>`)
	
	return ans
}


function handle_change(e) {
	result.innerText = get_glagolitic(e.currentTarget.value)
}

const sample_str = "Wszyscy ludzie rodzą się wolni i równi w swojej godności i prawach. Są obdarzeni rozumem i sumieniem i powinni postępować wobec siebie w duchu braterstwa."
sample_text.innerText = get_glagolitic(sample_str)

pl_name.innerText = get_glagolitic("Konwerter Głagoliczny")
