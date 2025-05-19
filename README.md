# CONSTRUCCIÓN DE UN ANALIZADOR CON ANTLR4 Y JAVASCRIPT
Guadalupe Santibañez

Legajo: 52122

Tema: 25914_11

En este README se podrá observar: INSTALACIÓN, ARCHIVOS DEL PROYECTO E INSTRUCCIONES DE USO

En este README toda explicación importante está acompañada de imágenes del ejemplo input_correcto_2; para mejor comprensión del proyecto.

# DESCRIPCIÓN DEL PROYECTO
Este proyecto es un analizador léxico y sintáctico desarrollado en ANTLR4 y Node.js
Podrá observarse que el sistema:

	-Genera un análisis léxico y sintáctico.

	-Genera una tabla de lexemas y tokens.

	-Construye un árbol de derivación(perteneciente al análisis sintáctico).
 
 	-traduce el código fuente, al lenguaje JavaScript; y lo ejecuta como lo haría un intérprete básico.

Los tres primeros items se encuentran dentro de un mismo archivo llamado index.js

En un archivo distinto, llamado interp.js se encuentra:

-Intérprete: traduce el código fuente, al lenguaje JavaScript; y lo ejecuta como lo haría un intérprete básico.


# INSTALACIÓN
Hay dos opciones de instralación:

1- Descargando el archivo ZIP. Desde este repositorio, ir el botón verde que dice 'Code', y luego a 'Download ZIP'.
Una vez ddescargado, se extraen los ficheros y ya se puede utilizar el analizador.

2- Clonar este repositorio: git clone https://github.com/guada943/52122.git

Es importante ya tener tener instalado:
-Node.js (v16 o superior)
-Java (JDK)
-ANTLR 4 (versión 4.13 o superior)

# Archivos del proyecto
(Presionar Ctrl + Shift + V para ver imagenes)

-Lenguaje.g4: contiene la gramática ANTLR en español utilizada por el lexer y parser.

-input.txt: se encuentra con el contenido del archivo input_correcto_2. En este archivo(input.txt) se deberán pegar los contenidos de los archivos: input_correcto_1, input_correcto_2, input_incorrecto_1, input_incorrecto_2; para poder ejecutar el analizador.

-index.js: Realiza:

	- Análisis léxico
 
	- Análisis sintáctico
 
	- Generación de tabla de tokens
 
	- Generación de árbol de análisis sintáctico. 
 
 -interp.js: Ejecuta la traducción del código fuente al lenguaje JavaScript y lo interpreta.
 
# INSTRUCCIONES DE USO
(Presionar Ctrl + Shift + V para ver imagenes)

1-Descargar como ZIP.

2-Extraer los ficheros.

3-Abrir la carpeta AnalizadorLenguaje:

![alt text](image-5.png)

En el caso de haberlo clonado y no descargado como ZIP, se abrirá la carpeta  directamente; y deberá poder ver los archivos como en la imagen anterior.

4- EL archivo input.txt se encuentra con el contenido del archivo input_correcto_2. Es importante aclarar que si se desea cambiar su contenido por alguno de los archivos adjuntos, debe luego hacer click en ctrl+s; porque si no, se hace la ejecución con el contenido original, y no sobre el elegido.

5-Ejecutar el analizador sintáctico y árbol: 
	
 	-se abre el archivo index.js
 	
  	-Se abre la terminal (ctrl+ñ)
  	
   	-Se ejecuta el  comando: node index.js (no olvidad hacer click en enter): Esto realiza el análisis léxico y sintáctico, muestra la tabla de tokens y genera el árbol de análisis sintáctico.
   
![alt text](image.png)
![alt text](image-2.png)
![alt text](image-3.png)
6-Ejecutar el intérprete: se ejecutará completo con los inputs correctos, en  el caso de los incorrectos, quedará en blanco la traducción.
	
 	-Se abre el achivo interp.js
 	
  	-Se abre la terminal (ctrl+ñ)
  	
   	-Se ejecuta el  comando: node interp.js (no olvidad hacer click en enter): Esto traduce el código fuente al lenguaje JavaScript y lo ejecuta como si fuera un intérprete real.

![alt text](image-4.png)
No olide que parar poder ejecutar correctamente los archivos en necesario que los comandos ingresados sean:
	
 	node index.js

	node interp.js

Recuerde, que este procedimiento lo puede hacer con cualquiera de los archivos de texto que contienen distintos inputs. SIEMPRE que copie y pegue alguno de ellos en el archivo input.txt debe actualizarlo con ctrl+s para que ejecuten correctamente.

