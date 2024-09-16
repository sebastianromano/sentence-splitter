import * as readline from 'readline';

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
  commonAbbreviations.forEach((abbr, index) => {
    const safeAbbr = abbr.replace('.', '\\.');
    const regex = new RegExp(`\\b${safeAbbr}(?=\\s|$)`, 'g');
    protectedText = protectedText.replace(regex, `${abbr.slice(0, -1)}PROTECTED_PERIOD${index}`);
  });

  // Step 2: Split sentences while keeping the ending punctuation
  const sentenceEndPattern = /([.!?])\s+/g;
  const rawSentences = protectedText.split(sentenceEndPattern);

  // Step 3: Pair sentences with their ending punctuation
  const sentences: string[] = [];
  for (let i = 0; i < rawSentences.length - 1; i += 2) {
    sentences.push(rawSentences[i] + (rawSentences[i + 1] || ''));
  }

  // Step 4: Restore abbreviations and clean up
  return sentences.map(sentence => {
    let restoredSentence = sentence.trim();
    commonAbbreviations.forEach((abbr, index) => {
      const protectedAbbr = `${abbr.slice(0, -1)}PROTECTED_PERIOD${index}`;
      restoredSentence = restoredSentence.replace(new RegExp(protectedAbbr, 'g'), abbr);
    });
    return restoredSentence;
  }).filter(Boolean);
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Welcome to the Sentence Splitter!");
  console.log("Enter your text below. Press Enter twice to process the input.");
  console.log("To exit the program, type 'exit' and press Enter.");

  let inputText = '';

  rl.on('line', (line) => {
    if (line.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    if (line === '') {
      if (inputText.trim() !== '') {
        const sentences = splitIntoSentences(inputText);
        console.log("\nSplit Sentences:");
        sentences.forEach((sentence, index) => {
          console.log(`${index + 1}. ${sentence}`);
        });
        console.log("\nEnter your next text or type 'exit' to quit:");
        inputText = '';
      }
    } else {
      inputText += line + ' ';
    }
  });

  rl.on('close', () => {
    console.log('Thank you for using the Sentence Splitter. Goodbye!');
    process.exit(0);
  });
}

main();
