const commonAbbreviations = [
  'adr.', 'afs.', 'alm.', 'alt.', 'aut.',
  'bl.a.', 'bla.', 'ca.', 'd.', 'div.',
  'dr.', 'd.s.s.', 'dvs.', 'd.v.s.', 'eks.',
  'el.', 'e.l.', 'etc.', 'evt.', 'fhv.',
  'fr.', 'frk.', 'f.t.', 'p.t.', 'fx.',
  'f.eks.', 'gl.', 'hhv.', 'hr.', 'if.',
  'ifm.', 'i.f.m.', 'ift.', 'i.f.t.', 'inkl.',
  'jf.', 'kbh.', 'kg.', 'kl.', 'km.',
  'km/t.', 'kr.', 'lejl.', 'm.', 'maks.',
  'm.a.o.', 'md.', 'mdl.', 'mdr.', 'm.fl.',
  'mfl.', 'm.h.t.', 'mht.', 'm.h.p.', 'mhp.',
  'ml.', 'mm.', 'm.m.', 'modt.', 'm.v.', 'mvh.', 'm.v.h.',
  'nb.', 'nr.', 'o.a.', 'oa.', 'obs.',
  'o.l.', 'ol.', 'osv.', 'p.a.', 'pct.',
  'pga.', 'pkt.', 'pl.', 'pr.', 'ps.',
  'p.s.', 's.', 'str.', 'stk.', 's.u.',
  't.h.', 'th.', 't.o.m.', 't.v.', 'tv.',
  'ugtl.', 'v.', 'vedl.', 'vedr.', 'vha.',
  'vsa.'
];

function splitIntoSentences(text: string): string[] {
  // Step 1: Protect abbreviations
  let protectedText = text;
  const abbrMap = new Map<string, string>();
  commonAbbreviations.forEach((abbr, index) => {
    const safeAbbr = abbr.replace('.', '\\.');
    const regex = new RegExp(`\\b${safeAbbr}(?=\\s|$)`, 'gi');
    protectedText = protectedText.replace(regex, match => {
      const protectedAbbr = `${abbr.slice(0, -1)}PROTECTED_PERIOD${index}`;
      abbrMap.set(protectedAbbr, match);
      return protectedAbbr;
    });
  });

  // Step 2: Split sentences while keeping the ending punctuation
  const sentenceEndPattern = /([.!?])(\s+|$)/g;
  const rawSentences = protectedText.split(sentenceEndPattern);

  // Step 3: Pair sentences with their ending punctuation
  const sentences: string[] = [];
  for (let i = 0; i < rawSentences.length - 1; i += 2) {
    sentences.push(rawSentences[i] + (rawSentences[i + 1] || ''));
  }

  // Step 4: Restore abbreviations and clean up
  return sentences.map(sentence => {
    let restoredSentence = sentence.trim();
    abbrMap.forEach((original, protectedAbbr) => {
      const regex = new RegExp(protectedAbbr, 'g');
      restoredSentence = restoredSentence.replace(regex, original);
    });
    return restoredSentence;
  }).filter(Boolean);
}

document.getElementById('splitButton')?.addEventListener('click', () => {
  const inputText = (document.getElementById('inputText') as HTMLTextAreaElement).value;
  const sentences = splitIntoSentences(inputText);
  const outputText = document.getElementById('outputText') as HTMLTextAreaElement;
  outputText.value = sentences.join('\n');
});

document.getElementById('copyButton')?.addEventListener('click', () => {
  const outputText = document.getElementById('outputText') as HTMLTextAreaElement;
  outputText.select();
  document.execCommand('copy');
});
