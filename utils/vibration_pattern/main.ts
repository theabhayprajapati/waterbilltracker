const INTER_ELEMENT_GAP = 20;
const INTER_LETTER_GAP = 50;
const DOT_DURATION = 20;
const DASH_DURATION = 50;

const MORSE_CODE = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];
type TMORSE_CODE_MAP = { [key: string]: string };
const MORSE_CODE_MAP: TMORSE_CODE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
};
function morseToVibration(morseCode: string) {
    console.log(morseCode);
    let pattern: number[] = [];
    for (const ch of morseCode) {
        if (ch === '.') {
            pattern.push(DOT_DURATION);
            pattern.push(INTER_ELEMENT_GAP);
        } else if (ch === '-') {
            pattern.push(DASH_DURATION);
            pattern.push(INTER_ELEMENT_GAP);
        }
    }
    pattern.pop();  // Remove the last inter-element gap
    pattern.push(INTER_LETTER_GAP);
    return pattern;
}
console.log('Morse code vibration pattern:');
console.log(morseToVibration(MORSE_CODE_MAP[7]));
export {
    morseToVibration,
    MORSE_CODE_MAP,
};

