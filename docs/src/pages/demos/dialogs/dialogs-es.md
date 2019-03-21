---
title: Componente React Dialog
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# Diálogos

<p class="description">Los diálogos informan a los usuarios sobre una tarea y pueden contener información importante, requerir decisiones, o involucrar múltiples tareas.</p>

Un [Diálogo](https://material.io/design/components/dialogs.html)es una clase de [ventana modal](/utils/modal/) que aparece encima del contenido para proveer información importante o pedir que el usuario tome una decision. Los diálogos deshabilitan todas las funcciones de la aplicación cuando aparecen, y se quedan visibles hasta que se confirman, se descartan, o se toma alguna acción necesaria.

Los diálogos están diseñados para interrumpir el usuario, por eso deben usarse sólo cuando sean necesarios.

## Diálogos simples

Los diálogos simples pueden proveer detalles adicionales o acciones acerca de un elemento de lista. Por ejemplo, pueden desplegar avatares, íconos, subtexto aclarativo, o acciones ortogonales (como agregar una cuenta).

Mecánica táctil:

- Elegir una opción confirma inmediatamente la opción y cierra el menú
- Tocar fuera del diálogo, o presionar Atrás, cancela la acción y cierra el cuadro de diálogo

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## Alertas

Las alertas son interrupciones urgentes, que requieren reconocimiento, que informan al usuario sobre una situación.

La mayoría de las alertas no necesitan títulos. Ellas resumen una decisión en una oración o dos ya sea por:

- Hacer una pregunta (por ejemplo, "¿Eliminar esta conversación?")
- Hacer una declaración relacionada con los botones de acción

Utilice las alertas de la barra de título solo para situaciones de alto riesgo, como la posible pérdida de conectividad. Los usuarios deben poder entender las opciones basadas solo en el título y el texto del botón.

Si se necesita un título:

- Use una pregunta o afirmación clara con una explicación en el área de contenido, tal como "¿Borrar el almacenamiento USB?".
- Evite disculpas, ambigüedades o preguntas, como "¡Advertencia!" O "¿Está seguro?"

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

También puede intercambiar la transición, el siguiente ejemplo utiliza `Slide`.

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## Diálogos de formularios

Los diálogos de formulario permiten a los usuarios llenar campos dentro de un cuadro de diálogo. Por ejemplo, si su sitio solicita a los potenciales suscriptores completar su dirección de correo electrónico, pueden completar el campo y tocar 'Enviar'.

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## Diálogo personalizado

Si ha estado leyendo la [página de documentación de anulaciones](/customization/overrides/) pero no se siente seguro de cómo hacerlo, aquí hay un ejemplo de cómo puede personalizar el componente `DialogTitle` para soportar un botón de cerrado.

⚠️ A pesar de que la especificación de material design anima a usar temas, este ejemplo no es común.

{{"demo": "pages/demos/dialogs/CustomizedDialog.js"}}

## Diálogos de pantalla completa

{{"demo": "pages/demos/dialogs/FullScreenDialog.js"}}

## Tamaños opcionales

Puede establecer un ancho máximo de diálogo utilizando el enumerable `maxWidth` en combinación con el boleano `fullWidth`. Cuando la propiedad `fullWidth` es verdadera, el diálogo se adaptará según el valor de `maxWidth`.

{{"demo": "pages/demos/dialogs/MaxWidthDialog.js"}}

## Pantalla completa responsiva

Puede hacer un cuadro de diálogo responsivo a pantalla completa utilizando `withMobileDialog`. Por defecto, `withMobileDialog()(Dialog)` para pantallas completas responsivas cuyo [tamaño de pantalla](/layout/basics/) sea *menor o igual* al tamaño `sm`. Puede elegir su propio punto de quiebre por ejemplo `xs` pasando el argumento `breakpoint`, de la siguiente forma: `withMobileDialog({breakpoint: 'xs'})(Dialog)`.

{{"demo": "pages/demos/dialogs/ResponsiveDialog.js"}}

## Diálogos de confirmación

Los diálogos de confirmación requieren que los usuarios confirmen explícitamente su elección antes de que se confirme una opción. Por ejemplo, los usuarios pueden escuchar varios tonos de llamada, pero solo hacer una selección final al tocar "Aceptar".

Al tocar "Cancelar" en un cuadro de diálogo de confirmación, o al presionar Atrás, se cancela la acción, se descartan los cambios y se cierra el cuadro de diálogo.

{{"demo": "pages/demos/dialogs/ConfirmationDialog.js"}}

## Accesibilidad

Sigue la [Sección de accesibilidad de Modal](/utils/modal/#accessibility).

## Desplazando contenido largo

Cuando los diálogos se vuelven demasiado largos para la ventana o el dispositivo del usuario, se desplazan.

- `scroll=paper` el contenido del diálogo se desplaza dentro del elemento Paper.
- `scroll=body` el contenido del diálogo se desplaza dentro del elemento body.

Prueba la demostración de abajo para ver lo que queremos decir:

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}

## Diálogo arrastrable

Puede crear un cuadro de diálogo arrastrable utilizando [react-draggable](https://github.com/mzabriskie/react-draggable). Para hacerlo, puede pasar el componente importado `Draggable` como `PaperComponent` del componente `Dialog`. Esto hará que todo el diálogo se pueda arrastrar.

{{"demo": "pages/demos/dialogs/DraggableDialog.js"}}

## Rendimiento

Sigue la [Sección de rendimiento de Modal](/utils/modal/#performance).