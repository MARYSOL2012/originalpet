# 🎓 PROMPT PARA CURSO: Integración de Vapi AI Widget en "THE ORIGINALS PETS"

## 📋 DESCRIPCIÓN DEL PROYECTO
**Título:** Integración de Vapi AI Widget para Asistente Virtual Inteligente  
**Empresa:** THE ORIGINALS PETS - Alimentos y Accesorios para Mascotas  
**Contexto:** Tienda especializada en productos para mascotas que busca mejorar la atención al cliente mediante inteligencia artificial conversacional.

## 🎯 OBJETIVOS DEL CURSO

### Objetivo Principal
Enseñar cómo integrar y personalizar el widget de Vapi AI en una página web de comercio electrónico para mascotas, creando un asistente virtual que pueda:
- Responder consultas sobre productos para mascotas
- Brindar asesoría personalizada sobre cuidados de animales
- Proporcionar información sobre servicios de postventa
- Generar confianza y conexión emocional con los clientes

### Objetivos Específicos
1. **Configuración Técnica:** Implementar correctamente el widget de Vapi AI
2. **Personalización:** Adaptar el asistente al contexto de mascotas y cuidado animal
3. **Optimización UX:** Integrar el widget de manera fluida con el diseño existente
4. **Funcionalidades Avanzadas:** Configurar respuestas inteligentes y flujos conversacionales

## 🔧 CONFIGURACIÓN TÉCNICA ACTUAL

### Información del Widget Vapi AI
```html
<vapi-widget 
    assistant-id="ac6c607b-e630-4090-af6e-f26c728b24f4" 
    public-key="c51f67b8-24bd-4901-a1e4-a19a5ba00747">
</vapi-widget>

<script
  src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
  async
  type="text/javascript">
</script>
```

### Contexto de la Página Web
- **Framework:** HTML5 + CSS3 + JavaScript Vanilla
- **Estilo:** Diseño moderno con gradientes y animaciones
- **Tema:** Mascotas y cuidado animal
- **Colores principales:** #FF6B6B (rojo coral), #4ECDC4 (turquesa), #45B7D1 (azul)
- **Chatbot existente:** Chatbase ya integrado

## 📚 CONTENIDO DEL CURSO

### Módulo 1: Introducción a Vapi AI
**Duración:** 30 minutos

#### 1.1 ¿Qué es Vapi AI?
- Definición de Vapi AI como plataforma de asistentes virtuales
- Diferencias entre Vapi AI y otros chatbots (Chatbase, ChatGPT, etc.)
- Ventajas específicas para comercio electrónico de mascotas

#### 1.2 Casos de Uso para THE ORIGINALS PETS
- **Asesoría de productos:** "¿Qué alimento es mejor para mi perro de 2 años?"
- **Consultas médicas básicas:** "Mi gato no come, ¿qué puedo hacer?"
- **Información de servicios:** "¿Ofrecen servicio de postventa?"
- **Soporte emocional:** "Estoy preocupado por la salud de mi mascota"

### Módulo 2: Configuración e Integración
**Duración:** 45 minutos

#### 2.1 Configuración Inicial
```html
<!-- Paso 1: Agregar el widget al HTML -->
<vapi-widget 
    assistant-id="ac6c607b-e630-4090-af6e-f26c728b24f4" 
    public-key="c51f67b8-24bd-4901-a1e4-a19a5ba00747">
</vapi-widget>

<!-- Paso 2: Incluir el script de Vapi AI -->
<script
  src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
  async
  type="text/javascript">
</script>
```

#### 2.2 Posicionamiento y Estilo
- Ubicación recomendada: esquina inferior derecha
- Integración con el diseño existente de THE ORIGINALS PETS
- Personalización de colores para coincidir con la marca

#### 2.3 Configuración de JavaScript
```javascript
// Configuración específica para THE ORIGINALS PETS
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el widget de Vapi AI
    const vapiWidget = document.querySelector('vapi-widget');
    
    if (vapiWidget) {
        // Personalizar comportamiento del widget
        vapiWidget.addEventListener('open', function() {
            console.log('Asistente de mascotas activado');
        });
        
        vapiWidget.addEventListener('close', function() {
            console.log('Asistente de mascotas cerrado');
        });
    }
});
```

### Módulo 3: Personalización del Asistente
**Duración:** 60 minutos

#### 3.1 Personalidad del Asistente
**Nombre sugerido:** "Luna" o "Max" (nombres amigables para mascotas)

**Características de personalidad:**
- **Tono:** Cálido, empático y experto en mascotas
- **Lenguaje:** Profesional pero cercano, con emojis de mascotas 🐾🐱🐶
- **Conocimiento:** Especializado en cuidado animal y productos para mascotas
- **Actitud:** Siempre dispuesto a ayudar y generar confianza

#### 3.2 Respuestas Personalizadas

**Saludo inicial:**
```
¡Hola! 🐾 Soy Luna, tu asistente virtual especializada en mascotas de THE ORIGINALS PETS. 

Estoy aquí para ayudarte con:
• Asesoría sobre productos para tu mascota
• Consejos de cuidado y bienestar animal
• Información sobre nuestros servicios
• Cualquier duda sobre tu peludo compañero

¿En qué puedo ayudarte hoy? 😊
```

**Respuestas frecuentes:**
- **Productos:** "Te recomiendo este alimento premium que es perfecto para [tipo de mascota] de [edad]. ¿Te gustaría conocer más detalles?"
- **Salud:** "Entiendo tu preocupación por tu mascota. Te sugiero consultar con un veterinario, pero mientras tanto puedo darte algunos consejos básicos..."
- **Servicios:** "En THE ORIGINALS PETS ofrecemos asesoría personalizada, servicio de postventa y seguimiento continuo. ¿Te interesa alguno en particular?"

#### 3.3 Flujos Conversacionales

**Flujo de consulta de producto:**
1. Cliente pregunta sobre producto
2. Asistente solicita información de la mascota (edad, tamaño, raza)
3. Proporciona recomendación personalizada
4. Ofrece enlace directo al producto o contacto con asesor

**Flujo de emergencia:**
1. Cliente expresa preocupación por salud de mascota
2. Asistente evalúa gravedad
3. Si es urgente: recomienda veterinario inmediatamente
4. Si no es urgente: proporciona consejos básicos y seguimiento

### Módulo 4: Integración con el Diseño Existente
**Duración:** 45 minutos

#### 4.1 Estilos CSS Personalizados
```css
/* Personalización del widget Vapi AI para THE ORIGINALS PETS */
vapi-widget {
    --vapi-primary-color: #FF6B6B;
    --vapi-secondary-color: #4ECDC4;
    --vapi-accent-color: #45B7D1;
    --vapi-border-radius: 15px;
    --vapi-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Posicionamiento del widget */
vapi-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
}

/* Animación de entrada */
@keyframes vapi-bounce {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}

vapi-widget[data-state="open"] {
    animation: vapi-bounce 0.3s ease-out;
}
```

#### 4.2 Responsive Design
- Adaptación para dispositivos móviles
- Posicionamiento en tablets
- Optimización para pantallas pequeñas

#### 4.3 Integración con Funcionalidades Existentes
- Coordinación con el chatbot de Chatbase
- Integración con formulario de contacto
- Conexión con enlaces de WhatsApp

### Módulo 5: Configuración Avanzada
**Duración:** 60 minutos

#### 5.1 Configuración del Asistente en Vapi AI Dashboard
- Configuración de voz y personalidad
- Entrenamiento con datos específicos de mascotas
- Configuración de respuestas automáticas
- Integración con base de conocimientos

#### 5.2 APIs y Webhooks
```javascript
// Configuración de webhooks para seguimiento
const vapiWebhook = {
    url: 'https://theoriginalspets.com/api/vapi-webhook',
    events: ['call.ended', 'transcript.updated', 'assistant.message'],
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
};
```

#### 5.3 Métricas y Analytics
- Seguimiento de conversaciones
- Análisis de consultas más frecuentes
- Métricas de satisfacción del cliente
- Optimización basada en datos

### Módulo 6: Pruebas y Optimización
**Duración:** 30 minutos

#### 6.1 Casos de Prueba
1. **Prueba de integración:** Verificar que el widget se carga correctamente
2. **Prueba de funcionalidad:** Comprobar respuestas del asistente
3. **Prueba de diseño:** Verificar integración visual
4. **Prueba de rendimiento:** Optimizar velocidad de carga

#### 6.2 Escenarios de Prueba Específicos
- Cliente busca alimento para perro cachorro
- Cliente tiene emergencia con su gato
- Cliente pregunta sobre servicios de postventa
- Cliente quiere conocer productos premium

## 🛠️ IMPLEMENTACIÓN PRÁCTICA

### Código HTML Completo
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Head existente de THE ORIGINALS PETS -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THE ORIGINALS PETS - Alimentos y Accesorios para Mascotas</title>
    <!-- CSS existente -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Contenido existente de la página -->
    
    <!-- Scripts existentes -->
    <script src="js/script.js"></script>
    
    <!-- Chatbase existente -->
    <script>
    (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="TNQ7IvsGog3BDA0O2rFh9";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    </script>
    
    <!-- Widget Vapi AI -->
    <vapi-widget 
        assistant-id="ac6c607b-e630-4090-af6e-f26c728b24f4" 
        public-key="c51f67b8-24bd-4901-a1e4-a19a5ba00747">
    </vapi-widget>
    
    <script
      src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
      async
      type="text/javascript">
    </script>
    
    <!-- Script de configuración personalizada -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Configuración específica para THE ORIGINALS PETS
        console.log('THE ORIGINALS PETS - Vapi AI Widget cargado');
        
        // Personalizar comportamiento del widget
        const vapiWidget = document.querySelector('vapi-widget');
        
        if (vapiWidget) {
            // Event listeners personalizados
            vapiWidget.addEventListener('vapi:call-started', function(event) {
                console.log('Llamada iniciada con asistente de mascotas');
                // Aquí puedes agregar tracking personalizado
            });
            
            vapiWidget.addEventListener('vapi:call-ended', function(event) {
                console.log('Llamada finalizada');
                // Aquí puedes agregar seguimiento post-conversación
            });
        }
    });
    </script>
</body>
</html>
```

### CSS Personalizado Adicional
```css
/* Estilos específicos para Vapi AI Widget */
:root {
    --vapi-brand-primary: #FF6B6B;
    --vapi-brand-secondary: #4ECDC4;
    --vapi-brand-accent: #45B7D1;
}

vapi-widget {
    --vapi-primary-color: var(--vapi-brand-primary);
    --vapi-secondary-color: var(--vapi-brand-secondary);
    --vapi-accent-color: var(--vapi-brand-accent);
    --vapi-border-radius: 15px;
    --vapi-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    --vapi-font-family: 'Poppins', sans-serif;
}

/* Animación de notificación */
@keyframes vapi-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

vapi-widget[data-has-notification="true"] {
    animation: vapi-pulse 2s infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    vapi-widget {
        bottom: 15px;
        right: 15px;
        --vapi-size: 60px;
    }
}
```

## 📊 MÉTRICAS DE ÉXITO

### KPIs a Monitorear
1. **Engagement:** Tiempo promedio de conversación
2. **Satisfacción:** Calificaciones del asistente
3. **Conversión:** Consultas que se convierten en ventas
4. **Eficiencia:** Reducción en consultas repetitivas al equipo

### Herramientas de Análisis
- Dashboard de Vapi AI
- Google Analytics con eventos personalizados
- Encuestas de satisfacción post-conversación

## 🚀 PRÓXIMOS PASOS

### Fase 1: Implementación Básica (Semana 1)
- Integración del widget básico
- Configuración inicial del asistente
- Pruebas de funcionalidad

### Fase 2: Personalización (Semana 2)
- Personalización de respuestas
- Integración con diseño
- Optimización de UX

### Fase 3: Optimización (Semana 3)
- Análisis de métricas
- Refinamiento de respuestas
- Implementación de mejoras

### Fase 4: Escalamiento (Semana 4)
- Integración con CRM
- Automatización avanzada
- Expansión de funcionalidades

## 📞 SOPORTE Y RECURSOS

### Documentación Oficial
- [Vapi AI Documentation](https://docs.vapi.ai/)
- [Widget Integration Guide](https://docs.vapi.ai/widget)
- [API Reference](https://docs.vapi.ai/api)

### Contacto de Soporte
- **Email técnico:** soporte@theoriginalspets.com
- **WhatsApp Business:** +57 305 216 3863
- **Instagram:** @theoriginalspets

---

## 🎯 RESUMEN EJECUTIVO

Este curso proporciona una guía completa para integrar Vapi AI en THE ORIGINALS PETS, creando un asistente virtual especializado en mascotas que complementa perfectamente el servicio existente. La implementación mejorará significativamente la experiencia del cliente, proporcionando asesoría 24/7 y generando mayor confianza en la marca.

**Beneficios esperados:**
- ✅ Atención al cliente 24/7
- ✅ Asesoría especializada en mascotas
- ✅ Reducción de carga de trabajo del equipo
- ✅ Mejora en la experiencia del usuario
- ✅ Mayor conversión de consultas a ventas

**Tiempo estimado de implementación:** 2-3 semanas  
**Inversión:** Tiempo de desarrollo + suscripción Vapi AI  
**ROI esperado:** Mejora del 30-50% en satisfacción del cliente

