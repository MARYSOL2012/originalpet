/**
 * SISTEMA DE LOGGING PARA PEDIDOS - THE ORIGINALS PETS
 * Registra todas las confirmaciones humanas y procesamiento de pedidos
 */

class OrderLogger {
    constructor() {
        this.logs = [];
        this.init();
    }

    init() {
        // Cargar logs existentes del localStorage
        this.loadLogs();
        
        // Configurar logging automático en consola
        this.setupConsoleLogging();
        
        console.log('📋 Sistema de Logging de Pedidos iniciado');
    }

    // Registrar confirmación humana
    logHumanConfirmation(orderData) {
        const logEntry = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: 'HUMAN_CONFIRMATION',
            status: 'PENDING',
            data: {
                cliente: orderData.nombre,
                email: orderData.correo,
                mensaje: orderData.mensaje,
                confirmado_por: 'Usuario humano',
                ip: this.getClientIP(),
                userAgent: navigator.userAgent
            }
        };

        this.logs.push(logEntry);
        this.saveLogs();
        this.printLogEntry(logEntry);
        
        return logEntry.id;
    }

    // Registrar pedido finalizado
    logOrderCompleted(orderData, confirmationId) {
        const logEntry = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: 'ORDER_COMPLETED',
            status: 'COMPLETED',
            confirmationId: confirmationId,
            data: {
                cliente: orderData.nombre,
                email: orderData.correo,
                mensaje: orderData.mensaje,
                procesado_por: 'Sistema automatizado',
                confirmacion_humana: true,
                ip: this.getClientIP(),
                userAgent: navigator.userAgent
            }
        };

        this.logs.push(logEntry);
        this.saveLogs();
        this.printLogEntry(logEntry);
        
        return logEntry.id;
    }

    // Registrar intento de confirmación fallido
    logFailedConfirmation(orderData, reason) {
        const logEntry = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: 'FAILED_CONFIRMATION',
            status: 'FAILED',
            data: {
                cliente: orderData.nombre,
                email: orderData.correo,
                mensaje: orderData.mensaje,
                razon: reason,
                ip: this.getClientIP(),
                userAgent: navigator.userAgent
            }
        };

        this.logs.push(logEntry);
        this.saveLogs();
        this.printLogEntry(logEntry);
        
        return logEntry.id;
    }

    // Generar ID único
    generateId() {
        return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Obtener IP del cliente (simulada)
    getClientIP() {
        // En un entorno real, esto vendría del servidor
        return '127.0.0.1';
    }

    // Guardar logs en localStorage
    saveLogs() {
        try {
            localStorage.setItem('the_originals_pets_logs', JSON.stringify(this.logs));
        } catch (error) {
            console.error('Error al guardar logs:', error);
        }
    }

    // Cargar logs del localStorage
    loadLogs() {
        try {
            const savedLogs = localStorage.getItem('the_originals_pets_logs');
            if (savedLogs) {
                this.logs = JSON.parse(savedLogs);
                console.log(`📚 Cargados ${this.logs.length} logs existentes`);
            }
        } catch (error) {
            console.error('Error al cargar logs:', error);
            this.logs = [];
        }
    }

    // Imprimir entrada de log en consola
    printLogEntry(logEntry) {
        const emoji = {
            'HUMAN_CONFIRMATION': '👤',
            'ORDER_COMPLETED': '✅',
            'FAILED_CONFIRMATION': '❌'
        };

        console.group(`${emoji[logEntry.type]} ${logEntry.type} - ${logEntry.id}`);
        console.log('⏰ Timestamp:', logEntry.timestamp);
        console.log('📊 Status:', logEntry.status);
        console.log('📋 Data:', logEntry.data);
        console.groupEnd();
    }

    // Obtener estadísticas de logs
    getStats() {
        const stats = {
            total: this.logs.length,
            confirmations: this.logs.filter(log => log.type === 'HUMAN_CONFIRMATION').length,
            completed: this.logs.filter(log => log.type === 'ORDER_COMPLETED').length,
            failed: this.logs.filter(log => log.type === 'FAILED_CONFIRMATION').length,
            vapiConversations: this.logs.filter(log => log.type === 'VAPI_CONVERSATION_STARTED').length,
            vapiCompleted: this.logs.filter(log => log.type === 'VAPI_CONVERSATION_ENDED').length,
            today: this.logs.filter(log => {
                const logDate = new Date(log.timestamp);
                const today = new Date();
                return logDate.toDateString() === today.toDateString();
            }).length
        };

        return stats;
    }

    // Mostrar estadísticas en consola
    showStats() {
        const stats = this.getStats();
        
        console.group('📊 ESTADÍSTICAS COMPLETAS - THE ORIGINALS PETS');
        console.log(`📈 Total de registros: ${stats.total}`);
        console.log(`👤 Confirmaciones humanas: ${stats.confirmations}`);
        console.log(`✅ Pedidos completados: ${stats.completed}`);
        console.log(`❌ Confirmaciones fallidas: ${stats.failed}`);
        console.log(`🎤 Conversaciones Vapi AI iniciadas: ${stats.vapiConversations}`);
        console.log(`📞 Conversaciones Vapi AI completadas: ${stats.vapiCompleted}`);
        console.log(`📅 Hoy: ${stats.today}`);
        console.groupEnd();
        
        return stats;
    }

    // Exportar logs como JSON
    exportLogs() {
        const dataStr = JSON.stringify(this.logs, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `the_originals_pets_logs_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('📁 Logs exportados exitosamente');
    }

    // Limpiar logs antiguos (más de 30 días)
    cleanOldLogs() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const initialCount = this.logs.length;
        this.logs = this.logs.filter(log => {
            const logDate = new Date(log.timestamp);
            return logDate > thirtyDaysAgo;
        });
        
        const removedCount = initialCount - this.logs.length;
        if (removedCount > 0) {
            this.saveLogs();
            console.log(`🧹 Limpiados ${removedCount} logs antiguos`);
        }
        
        return removedCount;
    }

    // Configurar logging automático en consola
    setupConsoleLogging() {
        // Interceptar console.log para agregar timestamp
        const originalLog = console.log;
        console.log = function(...args) {
            const timestamp = new Date().toLocaleString();
            originalLog(`[${timestamp}]`, ...args);
        };
    }

    // Buscar logs por criterio
    searchLogs(criteria) {
        return this.logs.filter(log => {
            return Object.keys(criteria).every(key => {
                if (key === 'date') {
                    const logDate = new Date(log.timestamp).toDateString();
                    const searchDate = new Date(criteria[key]).toDateString();
                    return logDate === searchDate;
                }
                return log[key] === criteria[key];
            });
        });
    }

    // Obtener logs de hoy
    getTodayLogs() {
        const today = new Date().toDateString();
        return this.logs.filter(log => {
            const logDate = new Date(log.timestamp).toDateString();
            return logDate === today;
        });
    }

    // Obtener logs de un cliente específico
    getClientLogs(email) {
        return this.logs.filter(log => 
            log.data && log.data.email === email
        );
    }
}

// Crear instancia global del logger
window.OrderLogger = new OrderLogger();

// Función de utilidad para usar en otros scripts
window.logOrderConfirmation = function(orderData) {
    return window.OrderLogger.logHumanConfirmation(orderData);
};

window.logOrderCompleted = function(orderData, confirmationId) {
    return window.OrderLogger.logOrderCompleted(orderData, confirmationId);
};

window.logFailedConfirmation = function(orderData, reason) {
    return window.OrderLogger.logFailedConfirmation(orderData, reason);
};

// Comandos de consola útiles
console.log('🔧 Comandos disponibles:');
console.log('- OrderLogger.showStats() - Ver estadísticas');
console.log('- OrderLogger.exportLogs() - Exportar logs');
console.log('- OrderLogger.cleanOldLogs() - Limpiar logs antiguos');
console.log('- OrderLogger.getTodayLogs() - Ver logs de hoy');
console.log('- OrderLogger.searchLogs({type: "ORDER_COMPLETED"}) - Buscar logs');
