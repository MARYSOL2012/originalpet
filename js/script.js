// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.experiencia-card, .contact-method, .presentacion-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Manejo del formulario de contacto con confirmación humana
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const formData = new FormData(this);
    const nombre = formData.get('nombre');
    const correo = formData.get('correo');
    const mensaje = formData.get('mensaje');
    
    // Validación básica
    if (!nombre || !correo || !mensaje) {
        showMessage('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(correo)) {
        showMessage('Por favor, ingresa un correo electrónico válido', 'error');
        return;
    }
    
    // Mostrar modal de confirmación humana
    showHumanConfirmationModal({
        nombre: nombre,
        correo: correo,
        mensaje: mensaje,
        formElement: this
    });
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar mensajes
function showMessage(message, type) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos del mensaje
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#66BB6A' : '#FF6B6B'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(messageDiv);
    
    // Animar entrada
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Función para mostrar modal de confirmación humana
function showHumanConfirmationModal(orderData) {
    // Crear overlay del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'confirmation-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="modal-header">
            <h3><i class="fas fa-user-check"></i> Confirmación Humana Requerida</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
            <div class="confirmation-info">
                <p><strong>🐾 THE ORIGINALS PETS</strong></p>
                <p>Se requiere confirmación humana para procesar este pedido:</p>
                <div class="order-details">
                    <p><strong>Cliente:</strong> ${orderData.nombre}</p>
                    <p><strong>Email:</strong> ${orderData.correo}</p>
                    <p><strong>Mensaje:</strong> ${orderData.mensaje}</p>
                </div>
            </div>
            <div class="confirmation-input">
                <label for="human-confirmation">
                    <i class="fas fa-key"></i> Escriba "OK CONFIRMADO" para finalizar el pedido:
                </label>
                <input type="text" id="human-confirmation" placeholder="Escriba aquí: OK CONFIRMADO" autocomplete="off">
                <div class="confirmation-status" id="confirmation-status"></div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-cancel">Cancelar</button>
            <button class="btn-confirm" disabled>
                <i class="fas fa-check"></i> Finalizar Pedido
            </button>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        background: white;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Agregar estilos CSS para el modal
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-modal-overlay {
            font-family: 'Poppins', sans-serif;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 20px;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.3rem;
            font-weight: 600;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .confirmation-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #FF6B6B;
        }
        
        .order-details p {
            margin: 8px 0;
            color: #333;
        }
        
        .confirmation-input label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #333;
        }
        
        .confirmation-input input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
        }
        
        .confirmation-input input:focus {
            outline: none;
            border-color: #FF6B6B;
            box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
        }
        
        .confirmation-status {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .modal-footer {
            padding: 20px 25px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }
        
        .btn-cancel, .btn-confirm {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-cancel {
            background: #6c757d;
            color: white;
        }
        
        .btn-cancel:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }
        
        .btn-confirm {
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
        }
        
        .btn-confirm:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        
        .btn-confirm:disabled {
            background: #ccc;
            cursor: not-allowed;
            opacity: 0.6;
        }
    `;
    
    document.head.appendChild(style);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Animar entrada
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 100);
    
    // Elementos del modal
    const confirmInput = modal.querySelector('#human-confirmation');
    const confirmBtn = modal.querySelector('.btn-confirm');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const closeBtn = modal.querySelector('.close-btn');
    const statusDiv = modal.querySelector('#confirmation-status');
    
    // Función para validar confirmación
    function validateConfirmation() {
        const inputValue = confirmInput.value.trim().toUpperCase();
        const requiredText = 'OK CONFIRMADO';
        
        if (inputValue === requiredText) {
            confirmBtn.disabled = false;
            statusDiv.innerHTML = '<i class="fas fa-check-circle" style="color: #66BB6A;"></i> Confirmación válida - Listo para finalizar';
            statusDiv.style.color = '#66BB6A';
        } else {
            confirmBtn.disabled = true;
            if (inputValue.length > 0) {
                statusDiv.innerHTML = '<i class="fas fa-times-circle" style="color: #FF6B6B;"></i> Texto incorrecto - Escriba exactamente: OK CONFIRMADO';
                statusDiv.style.color = '#FF6B6B';
            } else {
                statusDiv.innerHTML = '';
            }
        }
    }
    
    // Event listeners
    confirmInput.addEventListener('input', validateConfirmation);
    
    confirmBtn.addEventListener('click', function() {
        if (!confirmBtn.disabled) {
            // Registrar confirmación en el sistema de logging
            const confirmationId = window.logOrderConfirmation(orderData);
            
            // Log de confirmación
            console.log('✅ PEDIDO CONFIRMADO POR HUMANO:', {
                timestamp: new Date().toISOString(),
                cliente: orderData.nombre,
                email: orderData.correo,
                mensaje: orderData.mensaje,
                confirmado_por: 'Usuario humano',
                confirmationId: confirmationId
            });
            
            // Procesar el pedido
            processOrder(orderData, orderData.formElement, confirmationId);
            
            // Cerrar modal
            closeModal();
        }
    });
    
    cancelBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Función para cerrar modal
    function closeModal() {
        modalOverlay.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
            document.head.removeChild(style);
        }, 300);
    }
    
    // Enfocar el input
    setTimeout(() => {
        confirmInput.focus();
    }, 500);
}

// Función para procesar el pedido después de la confirmación
function processOrder(orderData, formElement, confirmationId) {
    const submitBtn = formElement.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar estado de carga
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    // Simular procesamiento del pedido
    setTimeout(() => {
        // Registrar pedido completado en el sistema de logging
        const completedId = window.logOrderCompleted(orderData, confirmationId);
        
        // Mostrar mensaje de éxito
        showMessage('✅ ¡Pedido confirmado y procesado exitosamente! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        formElement.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log final del pedido procesado
        console.log('🎯 PEDIDO FINALIZADO:', {
            timestamp: new Date().toISOString(),
            cliente: orderData.nombre,
            email: orderData.correo,
            mensaje: orderData.mensaje,
            estado: 'CONFIRMADO Y PROCESADO',
            confirmacion_humana: true,
            confirmationId: confirmationId,
            completedId: completedId
        });
        
        // Mostrar estadísticas actualizadas
        if (window.OrderLogger) {
            setTimeout(() => {
                window.OrderLogger.showStats();
            }, 1000);
        }
        
    }, 2000);
}

// Efectos adicionales para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Efecto de hover en las tarjetas de experiencia
    const experienceCards = document.querySelectorAll('.experiencia-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de typing en el título del hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efecto de typing después de un breve delay
        setTimeout(typeWriter, 500);
    }
});

// Función para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '573052163863';
    const message = 'Hola! Me interesa conocer más sobre los productos de THE ORIGINALS PETS para mi mascota. 🐾';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Función para abrir redes sociales (simuladas)
function openInstagram() {
    showMessage('Redirigiendo a Instagram... (Simulado)', 'info');
}

function openTikTok() {
    showMessage('Redirigiendo a TikTok... (Simulado)', 'info');
}

// Agregar event listeners a los enlaces de contacto
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('.contact-method');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-whatsapp')) {
                openWhatsApp();
            } else if (icon.classList.contains('fa-instagram')) {
                openInstagram();
            } else if (icon.classList.contains('fa-tiktok')) {
                openTikTok();
            }
        });
    });
});

// Función para agregar efectos de partículas en el hero
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Función para agregar efectos de hover a las tarjetas
function addCardEffects() {
    const cards = document.querySelectorAll('.experiencia-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(255, 140, 66, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Función para agregar contador de visitantes (simulado)
function addVisitorCounter() {
    const visitorCount = Math.floor(Math.random() * 1000) + 500;
    const counter = document.createElement('div');
    counter.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--gradient-pet);
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: bounce 2s infinite;
        ">
            👥 ${visitorCount} mascotas felices
        </div>
    `;
    document.body.appendChild(counter);
}

// Función para coordinar Vapi AI con confirmación humana
function setupVapiIntegration() {
    // Esperar a que Vapi AI se cargue
    setTimeout(function() {
        const vapiWidget = document.querySelector('vapi-widget');
        
        if (vapiWidget) {
            // Interceptar conversaciones de Vapi AI que requieran confirmación
            vapiWidget.addEventListener('vapi:assistant-message', function(event) {
                const message = event.detail?.message?.toLowerCase() || '';
                
                // Detectar si el asistente sugiere hacer un pedido
                if (message.includes('pedido') || message.includes('orden') || message.includes('comprar')) {
                    console.log('🎯 Vapi AI detectó intención de pedido');
                    
                    // Mostrar notificación al usuario sobre confirmación
                    setTimeout(() => {
                        showMessage('💡 Recuerda que todos los pedidos requieren confirmación humana escribiendo "OK CONFIRMADO"', 'info');
                    }, 1000);
                }
            });
        }
    }, 3000);
}

// Función para mostrar información sobre los dos sistemas
function showSystemInfo() {
    console.group('🤖 SISTEMAS INTEGRADOS - THE ORIGINALS PETS');
    console.log('🎤 Vapi AI: Asistente de voz especializado en mascotas');
    console.log('👤 Confirmación Humana: Sistema de validación para pedidos');
    console.log('📊 Sistema de Logging: Registro completo de todas las actividades');
    console.log('💬 Chatbase: Chatbot de texto para consultas rápidas');
    console.groupEnd();
    
    // Mostrar estadísticas si están disponibles
    if (window.OrderLogger) {
        setTimeout(() => {
            window.OrderLogger.showStats();
        }, 1000);
    }
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    addCardEffects();
    addVisitorCounter();
    setupVapiIntegration();
    
    // Mostrar información del sistema después de un delay
    setTimeout(showSystemInfo, 2000);
});

