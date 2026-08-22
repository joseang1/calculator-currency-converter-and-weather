# Calculadora multifuncional

> Crear una calculadora multifuncional con el framework VUE que incluya: calculadora que realice las operaciones básicas, conversor de divisas (euro, yen y dólar) y un apartado del tiempo.

## Tecnologías
 
Este proyecto se ha desarrollado con las siguientes tecnologías:
- Vue 3 (Composition API + `<script setup>`)
- Bootstrap 5
- Bootstrap Icons
- Vue Router
- Pinia
- Axios
---
 
## Calculadora
 
### Requisitos:
- Realizará las operaciones básicas
    - Suma
    - Resta
    - Multiplicación
    - División
- Teclas obligatorias:
    - Numéricas del 0 al 9
    - Suma, resta, multiplicación, división
    - Signo `igual`
    - Signo `.` para la coma
    - CE para el reseteo
- Control de errores
- Teclas extras:
    - M+ para poner en memoria el número actual. Se habrá de usar Pinia para almacenar la información
    - MR para recuperar el número en memoria
    - MC para borrar los datos guardados en memoria

### Desarrollo
 
Al principio planteé la calculadora como una única vista (`CalculatorView.vue`) que contenía tanto el estado como todo el marcado de los botones. Funcionaba, pero en cuanto añadí el conversor de divisas me di cuenta de un problema: el conversor necesitaba leer el mismo valor que se mostraba en la pantalla de la calculadora para poder convertirlo al vuelo, y ese valor vivía encerrado dentro del componente de la calculadora, inaccesible desde fuera.
 
Por eso separé la lógica en tres capas:
 
| Capa | Archivo | Responsabilidad |
| --- | --- | --- |
| Composable | `composables/useCalculator.js` | Estado (`display`, operador actual, valor previo) y toda la lógica de cálculo |
| Componente | `components/Calculator/Calculator.vue` | Solo el marcado de los botones; no conoce la lógica, únicamente emite eventos (`@number`, `@operator`, `@equals`...) |
| Vista | `views/CalculatorView.vue` | Instancia `useCalculator()` una única vez y reparte el estado como *props* tanto a `Calculator.vue` como a `Currency.vue` |
 
De esta forma, `display` es una única referencia reactiva compartida: cuando se pulsa un número, la calculadora se actualiza y el conversor de divisas ve el cambio en el mismo instante, sin duplicar estado ni arriesgarse a que ambos se desincronicen.
 
El control de errores cubre la división entre cero y cualquier resultado no finito (`Infinity`, `NaN`), mostrando `"Error"` en la pantalla y bloqueando cualquier tecla salvo `CE` hasta que se resetea.
 
Para la memoria (`M+`, `MR`, `MC`) se usa un store de Pinia (`stores/memory.js`) en lugar de una variable local del composable, ya que de esta forma el valor en memoria sobrevive aunque el usuario cambie de vista (por ejemplo, yendo a "El tiempo" y volviendo a la calculadora).
 
---
 
## Conversor de divisas
 
### Requisitos:
- Deberá estar integrado en la calculadora
- Divisas a utilizar: `euro (€)`, `dólar ($)` y `yen (¥)`
- Se deberá utilizar la siguiente API: [currencyfreaks.com](https://currencyfreaks.com/)

### Desarrollo
 
Siguiendo la misma separación de capas que en la calculadora:
 
| Capa | Archivo | Responsabilidad |
| --- | --- | --- |
| Servicio | `services/currencyApi.js` | Llamada a la API de currencyfreaks vía Axios |
| Composable | `composables/useCurrencyConverter.js` | Estado (`rates`, `loading`, `error`) y la función `convert()` |
| Componente | `components/Calculator/Currency.vue` | Selectores de divisa origen/destino y resultado |
 
La clave de la API se guarda en un archivo `.env` (variable `VITE_CURRENCYFREAKS_API_KEY`) y nunca se sube al repositorio, siguiendo la convención de Vite de exponer al cliente únicamente las variables prefijadas con `VITE_`.
 
El componente recibe el valor `display` de la calculadora como *prop* de solo lectura: no lo modifica, simplemente lo transforma según la tasa de cambio actual. Esto es lo que satisface el requisito de "estar integrado en la calculadora" sin necesidad de duplicar el teclado numérico ni mantener dos estados independientes.
 
Un detalle que tuve que resolver: la tasa que devuelve currencyfreaks usa el dólar como base por defecto, así que `convert()` primero pasa el importe a dólares y después a la divisa destino, en lugar de asumir una conversión directa entre dos divisas cualesquiera.
 
---
 
## El tiempo
 
### Requisitos:
- Se deberá utilizar la siguiente API: [el-tiempo.net/api](https://www.el-tiempo.net/api)
- Mostrar una imagen en función del `stateSky`
- Se puede elegir entre la información nacional o de una provincia (Asturias)

### Desarrollo
 
La documentación pública de la API no detalla los valores exactos que puede tomar `stateSky`, así que antes de escribir ningún código inspeccioné la respuesta real con Postman contra los endpoints:
 
- Nacional: `https://api.el-tiempo.net/json/v3/general`
- Provincia (Asturias, código `33`): `https://api.el-tiempo.net/json/v3/provincias/33`
Descubrí que `stateSky` no es una cadena de texto simple, sino un objeto anidado dentro de cada ciudad del array `ciudades`:
 
```json
"stateSky": {
  "description": "Muy nuboso",
  "id": "15"
}
```
 
El campo `id` corresponde a la codificación estándar de estado del cielo de AEMET, por lo que decidí mapear los iconos por `id` en lugar de por `description`, ya que el primero es un código estable y el segundo es texto libre en español que podría variar ligeramente.
 
| Capa | Archivo | Responsabilidad |
| --- | --- | --- |
| Servicio | `services/weatherApi.js` | Llamadas a `/general` y `/provincias/:codProv` vía Axios |
| Composable | `composables/useWeather.js` | Estado (`weatherData`, `scope`) y la función `setScope()` para alternar entre nacional y Asturias |
| Componente | `components/Weather/WeatherIcon.vue` | Traduce el `id` de `stateSky` a un icono de Bootstrap Icons |
| Vista | `views/WeatherView.vue` | Selector de ámbito (nacional/Asturias) y listado de tarjetas por ciudad |
 
Al usar Bootstrap Icons en lugar de imágenes propias, no hace falta gestionar ni alojar ningún archivo `.svg` o `.png`: el icono es simplemente una clase CSS (`<i class="bi bi-cloud-rain-fill">`), lo cual encaja bien con el resto del proyecto, que ya usa Bootstrap como sistema de diseño.