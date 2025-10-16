# 💰 FinanceHub - Global Banking

Una aplicación financiera moderna y elegante construida con React, TypeScript y Tailwind CSS. Gestiona tu cartera, realiza transferencias internacionales y monitorea tipos de cambio en tiempo real.

![FinanceHub Preview](https://via.placeholder.com/800x400/65A30D/FFFFFF?text=FinanceHub+Preview)

## ✨ Características Principales

### 🏦 Gestión de Cartera
- **Vista de portafolio completo** con múltiples monedas
- **Balances en tiempo real** con opción de ocultar/mostrar
- **Seguimiento de cambios** y tendencias de mercado
- **Diseño responsivo** para todos los dispositivos

### 💱 Tipos de Cambio
- **Tasas en tiempo real** vs bancos principales
- **Comparación de ventajas** competitivas
- **Calculadora de intercambio** integrada
- **Actualización automática** de datos

### 🌍 Transferencias Internacionales
- **Formulario multi-paso** con validación completa
- **Soporte para múltiples países** y monedas
- **Validación en tiempo real** de datos
- **Resumen de transferencia** antes del envío

### 📱 Experiencia de Usuario
- **Diseño glassmorphism** moderno y elegante
- **Animaciones fluidas** con Framer Motion
- **Tema claro/oscuro** con persistencia
- **Soporte multiidioma** (ES, EN, FR, DE)
- **PWA completa** con service worker

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **React Hook Form** - Manejo de formularios
- **React Hot Toast** - Notificaciones

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **PWA Plugin** - Progressive Web App

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/financiera-pagina.git
   cd financiera-pagina
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza la build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run type-check   # Verifica tipos de TypeScript
npm run format       # Formatea código con Prettier
npm run format:check # Verifica formato de código
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ErrorBoundary.tsx
│   ├── LoadingStates.tsx
│   ├── LanguageSelector.tsx
│   ├── ToastProvider.tsx
│   ├── TransferForm.tsx
│   └── ...
├── contexts/            # Contextos de React
│   ├── ThemeContext.tsx
│   ├── AppDataContext.tsx
│   └── LanguageContext.tsx
├── hooks/               # Hooks personalizados
│   └── useLocalStorage.ts
└── main.tsx            # Punto de entrada
```

## 🎨 Sistema de Diseño

### Colores
- **Tema Claro**: Base #FAFAFA, Superficie #FFFFFF
- **Tema Oscuro**: Base #0D1412, Superficie #1A1F1D
- **Acento**: #65A30D (Verde lima)
- **Estados**: Éxito, Error, Advertencia, Info

### Tipografía
- **Fuente Principal**: System UI Stack
- **Pesos**: 400 (normal), 500 (medium), 700 (bold)

### Componentes
- **Glassmorphism**: Efectos de vidrio con backdrop-blur
- **Animaciones**: Transiciones suaves con Framer Motion
- **Responsive**: Mobile-first approach

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas:

- 🇪🇸 **Español** (por defecto)
- 🇺🇸 **English**
- 🇫🇷 **Français**
- 🇩🇪 **Deutsch**

### Agregar un nuevo idioma

1. Agrega las traducciones en `src/contexts/LanguageContext.tsx`
2. Añade el idioma a `availableLanguages`
3. Actualiza el tipo `Language` si es necesario

## 📱 Progressive Web App (PWA)

La aplicación está configurada como PWA con:

- **Service Worker** para caché offline
- **Manifest** para instalación
- **Iconos** en múltiples tamaños
- **Caché inteligente** de recursos

### Instalación
Los usuarios pueden instalar la app desde el navegador o desde la pantalla de inicio en móviles.

## 🔒 Persistencia de Datos

Los datos se almacenan localmente usando:

- **localStorage** para preferencias y datos de usuario
- **Sincronización automática** entre pestañas
- **Manejo de errores** robusto
- **Migración de datos** automática

## ♿ Accesibilidad

La aplicación sigue las mejores prácticas de accesibilidad:

- **ARIA labels** en todos los elementos interactivos
- **Navegación por teclado** completa
- **Contraste de colores** adecuado
- **Semántica HTML** correcta
- **Screen readers** compatibles

## 🚀 Optimizaciones de Rendimiento

### React Optimizations
- **React.memo** para componentes puros
- **useMemo** para cálculos costosos
- **useCallback** para funciones estables
- **Lazy loading** de componentes

### Bundle Optimization
- **Code splitting** automático
- **Tree shaking** de dependencias
- **Compresión gzip** en producción
- **Caché de recursos** estáticos

## 🧪 Testing

```bash
# Próximamente
npm run test        # Ejecuta tests unitarios
npm run test:e2e    # Ejecuta tests end-to-end
npm run test:coverage # Genera reporte de cobertura
```

## 📈 Métricas de Performance

- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código
- Usa TypeScript para todo el código
- Sigue las reglas de ESLint
- Formatea con Prettier
- Escribe tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- **Lucide React** por los iconos
- **Framer Motion** por las animaciones
- **Tailwind CSS** por el sistema de estilos
- **React Hook Form** por el manejo de formularios
- **Vite** por la experiencia de desarrollo

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐
