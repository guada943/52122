import antlr4 from 'antlr4';
import fs from 'fs';
import { CharStreams, CommonTokenStream } from 'antlr4';
import LenguajeLexer from './LenguajeLexer.js';
import LenguajeParser from './LenguajeParser.js';

// Listener de errores personalizado
class CustomErrorListener extends antlr4.error.ErrorListener {
  constructor(errorArray) {
    super();
    this.errors = errorArray;
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg) {
    this.errors.push(`(Línea ${line}:${column}) Error: ${msg}`);
  }
}

// Leer archivo de entrada
const input = fs.readFileSync('input.txt', 'utf8');
const chars = CharStreams.fromString(input);
const lexer = new LenguajeLexer(chars);
const tokens = new CommonTokenStream(lexer);

// Capturar errores
const lexingErrors = [];
const syntaxErrors = [];

const lexerErrorListener = new CustomErrorListener(lexingErrors);
const parserErrorListener = new CustomErrorListener(syntaxErrors);

lexer.removeErrorListeners();
lexer.addErrorListener(lexerErrorListener);

const parser = new LenguajeParser(tokens);
parser.buildParseTrees = true;

parser.removeErrorListeners();
parser.addErrorListener(parserErrorListener);

// Ejecutar análisis sintáctico
const tree = parser.programa();

// Mostrar resultados
if (lexingErrors.length === 0 && syntaxErrors.length === 0) {
  console.log('\n La entrada es correcta: no hay errores.\n');
} else {
  console.log('\n Se encontraron errores en la entrada:\n');
  lexingErrors.forEach(e => console.error(e));
  syntaxErrors.forEach(e => console.error(e));
}

if (lexingErrors.length > 0) {
  console.log('Error léxico:\n');
  lexingErrors.forEach(e => console.error(e));
}

if (syntaxErrors.length > 0) {
  console.log('\nError sintáctico:\n');
  syntaxErrors.forEach(e => console.error(e));
}

// Tabla de lexemas - tokens
console.log('\n Tabla de Lexemas - Tokens\n');
console.log('+------------------------+------------------------+');
console.log('| Lexema                 | Token                  |');
console.log('+------------------------+------------------------+');

const tokenTypeMap = {};
LenguajeLexer.symbolicNames.forEach((name, index) => {
  if (name) tokenTypeMap[index] = name;
});

tokens.fill();
tokens.tokens.forEach(token => {
  if (token.type !== -1) {
    const tokenName = LenguajeLexer.symbolicNames[token.type] || `Token_${token.type}`;
    const lexema = token.text.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    const lexemaCol = lexema.padEnd(23).slice(0, 23);
    const tokenCol = tokenName.padEnd(23).slice(0, 23);
    console.log(`| ${lexemaCol} | ${tokenCol} |`);
  }
});

console.log('+------------------------+------------------------+');

// Árbol de análisis sintáctico
function imprimirArbol(node, parser, nivel = 0) {
  const indent = '  '.repeat(nivel);
  const ruleNames = parser.ruleNames;

  if (node.children && node.children.length > 0) {
    const ruleName = ruleNames[node.ruleIndex];
    console.log(`${indent}${ruleName}`);
    node.children.forEach(child => imprimirArbol(child, parser, nivel + 1));
  } else {
    const text = node.getText().replace(/\n/g, "\\n");
    console.log(`${indent}"${text}"`);
  }
}

console.log('\n Árbol de Análisis Sintáctico:\n');
imprimirArbol(tree, parser);
