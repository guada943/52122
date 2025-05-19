grammar Lenguaje;

// Parser rules
programa: (declaracion | funcion)* ;

declaracion: 'variable' nombre ('=' valor)? ';' ;

funcion: 'función' nombre '(' argumentos? ')' '{' instrucciones '}' ;

argumentos: valor (',' valor)* ; // ← cambiado

instrucciones: (operacion_texto | impresion | retorno)* ;

operacion_texto: variable '=' transformacion '(' cadena ')' ';' ;

transformacion:
      'mayúsculas'
    | 'minúsculas'
    | 'longitud'
    | 'invertir'
    | 'reemplazar'
    ;

impresion: 'imprimir' '(' valor ')' ';' ;

retorno: 'devolver' valor ';' ;

valor: texto | NUMERO | variable ;

cadena: texto | variable ;

texto: CADENA ;

nombre: ID ;

variable: ID ;

// Lexer rules
CADENA: '"' ~["\r\n]* '"' ;
ID: [a-zA-Z_][a-zA-Z_0-9]* ;
NUMERO: [0-9]+ ;

// ← Agregá estos si los usás
LBRACK: '[' ;
RBRACK: ']' ;
PLUS: '+' ;

WS: [ \t\r\n]+ -> skip ;
