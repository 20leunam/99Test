<div align="center">
  <br>
  <h1>🧪 99Test</h1>
  <p><strong>Un test nuevo cada día. Diez preguntas. Todos los temas.</strong></p>
  <br>
  <a href="https://20leunam.github.io/99Test/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Ir_a_99Test-1a1a1f?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=b8943e" alt="Ir a 99Test" width="320" height="50" style="border-radius:8px;">
  </a>
  <br><br>
</div>

---

## ✨ Qué es

**99Test** es una web de tests diarios con una mecánica sencilla:

> 🗓️ **Cada día** se publica un nuevo test de **10 preguntas**  
> ✅ Puedes **repetirlo** las veces que quieras  
> 🔥 Lleva la cuenta de tu **racha de días**  
> 📚 Los tests pasados **siempre están disponibles**  
> 🌙 Tema claro/oscuro con un solo clic

Las preguntas son **mixtas**: geografía, historia, ciencia, lengua, arte, lógica y curiosidades. Cada categoría de test tiene su propio color para que sea fácil identificarlos.

---

## 🗂️ Estructura del proyecto

```
📁 99Test/
├── 📄 index.html              → Página principal (test del día)
├── 📄 archivo.html            → Calendario con tests anteriores
├── 📄 categorias.html         → Preguntas agrupadas por tema
├── 📁 compartido/
│   ├── 🎨 estilos.css         → Estilos (claro + oscuro)
│   └── ⚙️ motor.js            → Motor del quiz, menú y temas
├── 📁 tests/
│   ├── 🔥 0-mezcla-explosiva/       #d47a4a
│   ├── 🔬 1-ciencia-y-curiosidades/ #4a9bd4
│   ├── 🌍 2-viaje-por-el-mundo/     #5a9e6f
│   ├── 📖 3-palabras-y-arte/        #9a7ac4
│   ├── 🧮 4-piensa-rapido/          #d4a43e
│   ├── 🌟 5-variado-selecto/        #d46a8a
│   └── ⭐ especiales/               → Tests temáticos
│       ├── 📖 test-catala.html      → Paraules rares del català
│       ├── 📖 test-espanol.html     → Palabras raras del español
│       └── 🤖 test-oprobots-*.html  → Robótica (OPRobots)
```

Cada test está en su propia carpeta con su `index.html` independiente.  
Abrir uno es tan fácil como ir a `tests/3-palabras-y-arte/` y ver las 10 preguntas en el código.

---

## 🚀 Cómo usarlo

1. Abre **[20leunam.github.io/99Test/](https://20leunam.github.io/99Test/)**
2. Haz clic en **"Comenzar test"** para el test de hoy
3. Responde las 10 preguntas → recibe feedback al instante
4. Vuelve mañana para un test nuevo, o repasa desde **"Tests anteriores"**

También puedes abrir un test directamente desde su carpeta:
- `tests/2-viaje-por-el-mundo/` para el test de geografía e historia
- `tests/especiales/test-catala.html` para vocabulario en catalán
- `tests/especiales/test-oprobots-hardware.html` para robótica

---

## 🎨 Personalización

Cada test tiene su propio **color de acento** que se ve en botones, barras de progreso y bordes.  
Si quieres cambiar el color de un test, abre su `index.html` y busca el bloque `<style>` con las variables `--accent`.

Ejemplo para el test naranja:

```css
:root {
  --accent: #d47a4a;
  --accent-glow: rgba(212, 122, 74, 0.2);
  --gold-gradient: linear-gradient(135deg, #d47a4a, #e8a87c, #d47a4a);
}
```

---

## 🛠️ Añadir un test nuevo

1. Crea una carpeta en `tests/` con el número siguiente
2. Copia el `index.html` de otro test como plantilla
3. Cambia las preguntas en `const QUESTIONS = [...]`
4. Pon los colores que quieras en el `<style>`
5. Añade la entrada en `TEST_MANIFEST` dentro de `compartido/motor.js`

Cada pregunta tiene este formato:

```javascript
{
  q: "¿Texto de la pregunta?",
  opts: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correct: 2,             // índice de la opción correcta (0-3)
  cat: "🌍 Geografía",    // categoría visible
  exp: "Explicación breve" // se muestra al responder
}
```

---

## 💛 Apoyar

Si te gusta el proyecto, puedes invitarme a un café:

<div align="center">
  <a href="https://paypal.me/20leunam" target="_blank">
    <img src="https://img.shields.io/badge/Donar_con_PayPal-003087?style=for-the-badge&logo=paypal&logoColor=white" alt="Donar con PayPal">
  </a>
</div>

---

<div align="center">
  <sub>Desarrollado por <strong>20leunam</strong> &bull; 2026</sub>
  <br>
  <sub>
    <a href="https://20leunam.github.io/99Test/">🌐 99Test</a> &nbsp;·&nbsp;
    <a href="https://github.com/20leunam/99Test">📦 Repositorio</a>
  </sub>
</div>
