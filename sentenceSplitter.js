var _a;
var commonAbbreviations = [
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
function splitIntoSentences(text) {
    // Step 1: Protect abbreviations
    var protectedText = text;
    commonAbbreviations.forEach(function (abbr, index) {
        var safeAbbr = abbr.replace('.', '\\.');
        var regex = new RegExp("\\b".concat(safeAbbr, "(?=\\s|$)"), 'gi');
        protectedText = protectedText.replace(regex, "".concat(abbr.slice(0, -1), "PROTECTED_PERIOD").concat(index));
    });
    // Step 2: Split sentences while keeping the ending punctuation
    var sentenceEndPattern = /([.!?])\s+/g;
    var rawSentences = protectedText.split(sentenceEndPattern);
    // Step 3: Pair sentences with their ending punctuation
    var sentences = [];
    for (var i = 0; i < rawSentences.length - 1; i += 2) {
        sentences.push(rawSentences[i] + (rawSentences[i + 1] || ''));
    }
    // Step 4: Restore abbreviations and clean up
    return sentences.map(function (sentence) {
        var restoredSentence = sentence.trim();
        commonAbbreviations.forEach(function (abbr, index) {
            var protectedAbbr = "".concat(abbr.slice(0, -1), "PROTECTED_PERIOD").concat(index);
            var regex = new RegExp(protectedAbbr, 'gi');
            restoredSentence = restoredSentence.replace(regex, abbr);
        });
        return restoredSentence;
    }).filter(Boolean);
}
(_a = document.getElementById('splitButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var inputText = document.getElementById('inputText').value;
    var sentences = splitIntoSentences(inputText);
    var outputList = document.getElementById('outputList');
    outputList.innerHTML = '';
    sentences.forEach(function (sentence, index) {
        var listItem = document.createElement('li');
        listItem.textContent = "".concat(index + 1, ". ").concat(sentence);
        outputList.appendChild(listItem);
    });
});
