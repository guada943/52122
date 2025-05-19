import antlr4 from 'antlr4';
import fs from 'fs';
import vm from 'node:vm';

// Importá como default o usando * as
import * as LexerModule from './LenguajeLexer.js';
import * as ParserModule from './LenguajeParser.js';
import * as ListenerModule from './LenguajeListener.js';

// Usar la clase dentro del módulo
const LenguajeLexer = LexerModule.LenguajeLexer || LexerModule.default || LexerModule;
const LenguajeParser = ParserModule.LenguajeParser || ParserModule.default || ParserModule;
const LenguajeListener = ListenerModule.LenguajeListener || ListenerModule.default || ListenerModule;

const input = fs.readFileSync('analizadorLenguaje/grammar/input.txt', 'utf8');
const chars = antlr4.CharStreams.fromString(input);
const lexer = new LenguajeLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new LenguajeParser(tokens);
parser.buildParseTrees = true;

const treeRoot = parser.programa();

class InterpretadorListener extends LenguajeListener {
  constructor() {
    super();
    this.codigoJS = '';
    this.indent = '';
  }
  indentar() { this.indent += '  '; }
  desindentar() { this.indent = this.indent.slice(0, -2); }
  enterFuncion(ctx) {
    const nombre = ctx.nombre().getText();
    const argsCtx = ctx.argumentos();
    let args = '';
    if (argsCtx) args = argsCtx.valor().map(v => v.getText()).join(', ');
    this.codigoJS += `${this.indent}function ${nombre}(${args}) {\n`;
    this.indentar();
  }
  exitFuncion(ctx) {
    this.desindentar();
    this.codigoJS += `${this.indent}}\n\n`;
  }
  enterImpresion(ctx) {
    const val = ctx.valor().getText();
    this.codigoJS += `${this.indent}console.log(${val});\n`;
  }
  enterRetorno(ctx) {
    const val = ctx.valor().getText();
    this.codigoJS += `${this.indent}return ${val};\n`;
  }
  enterDeclaracion(ctx) {
    const nombre = ctx.nombre().getText();
    if (ctx.valor()) {
      const val = ctx.valor().getText();
      this.codigoJS += `${this.indent}let ${nombre} = ${val};\n`;
    } else {
      this.codigoJS += `${this.indent}let ${nombre};\n`;
    }
  }
  enterOperacion_texto(ctx) {
    const varName = ctx.variable().getText();
    const trans = ctx.transformacion().getText();
    const cadena = ctx.cadena().getText();
    let jsExp = '';
    switch (trans) {
      case 'mayúsculas': jsExp = `${cadena}.toUpperCase()`; break;
      case 'minúsculas': jsExp = `${cadena}.toLowerCase()`; break;
      case 'longitud': jsExp = `${cadena}.length`; break;
      case 'invertir': jsExp = `${cadena}.split('').reverse().join('')`; break;
      case 'reemplazar': jsExp = `${cadena}.replace(...)`; break;
      default: jsExp = cadena;
    }
    this.codigoJS += `${this.indent}let ${varName} = ${jsExp};\n`;
  }
}

const listener = new InterpretadorListener();
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, treeRoot);

console.log('\nCódigo JavaScript generado:\n');
console.log(listener.codigoJS);

try {
  vm.runInNewContext(listener.codigoJS, { console });
} catch (e) {
  console.error('Error al ejecutar el código generado:', e.message);
}
