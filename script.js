/**
 * ============================================================================
 * ECOPATAS - LÓGICA INTERACTIVA EN JAVASCRIPT (ES6+)
 * Microemprendimiento de Upcycling y Economía Circular
 * Ubicación: Bonpland 389, Puerto Iguazú, Misiones, Argentina
 * ============================================================================
 * 
 * Este archivo implementa:
 * 1. Sistema multiidioma dinámico (Español, Inglés y Portugués) con selector visual y persistencia.
 * 2. Navegación fluida y menú responsivo para dispositivos móviles.
 * 3. Simulador público de impacto ambiental en tiempo real (upcycling textil y neumáticos).
 * 4. Cartelito de Fidelidad interactivo de 3 compras/puntos con selección de refugio.
 * 5. Módulo privado de administración y cálculo financiero de costos (clave fija '4800').
 * 6. Persistencia de datos mediante localStorage del navegador.
 * 7. Simulación interactiva del formulario de contacto y donaciones.
 */

// Esperar a que el DOM esté completamente cargado antes de inicializar los módulos
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    initNavigation();
    initImpactCalculator();
    initFidelityCard();
    initAdminSection();
    initContactForm();
});

/* ============================================================================
   1. SISTEMA MULTI-IDIOMA (ESPAÑOL • ENGLISH • PORTUGUÊS)
   ============================================================================ */
const STORAGE_KEY_LANG = "ecopatas_lang";
let idiomaActual = "es";

/**
 * Diccionario de traducciones completo para los tres idiomas:
 * - Español (es) [Predeterminado]
 * - English (en)
 * - Português (pt)
 */
const TRANSLATIONS = {
    es: {
        brand_badge: "Triple Impacto",
        nav_inicio: "Inicio",
        nav_nosotros: "Nosotros",
        nav_productos: "Productos",
        nav_fidelidad: "Fidelidad",
        nav_impacto: "Calculador Ecológico",
        nav_admin: "Panel Admin",
        nav_contacto: "Contacto",

        // Hero
        hero_tag: "Microemprendimiento Circular • Puerto Iguazú",
        hero_title: 'Amor por los animales, <span class="highlight-text">compromiso con el planeta</span>',
        hero_slogan: '"Donde cada pata deja huellas"',
        hero_description: "Transformamos neumáticos en desuso y prendas textiles recuperadas en confortables camitas y abrigos ecológicos para perros y gatos. Economía circular y upcycling desde el corazón de Misiones.",
        hero_btn_products: "Ver Productos",
        hero_btn_impact: "Simular Impacto Verde",
        showcase_badge: "Modelo Destacado",
        showcase_tag: "100% Neumático &amp; Retazos",
        showcase_name: "Camita Eco-Iguazú",
        showcase_desc: "Higienizada, acolchonada con tela reciclada y relleno cero desperdicio.",

        // Sobre Nosotros
        about_subtitle: "Nuestra Filosofía",
        about_title: "Economía Circular que deja huellas positivas",
        about_lead: "Somos un equipo comprometido con nuestro entorno en <strong>Puerto Iguazú, Misiones</strong>. Creamos valor protegiendo la biodiversidad local a través del upcycling.",
        about_c1_title: "Upcycling &amp; Supra-reciclaje",
        about_c1_text: "No solo reciclamos: elevamos el valor de prendas en desuso y neumáticos desechados. Convertimos residuos en productos duraderos, confortables y de alta calidad para consentir a tus mascotas.",
        about_c2_title: "Cero Desperdicio (Zero Waste)",
        about_c2_text: "Cada retazo sobrante de la confección de ropita se tritura cuidadosamente para convertirse en el mullido relleno de nuestras almohadas. ¡En EcoPatas absolutamente nada se tira!",
        about_c3_title: "Impacto Local en Iguazú",
        about_c3_text: "Retirar neumáticos en desuso en Misiones previene la acumulación de agua de lluvia y la proliferación de mosquitos transmisores del dengue, protegiendo a la comunidad y al ecosistema selvático.",
        about_location_badge: "<strong>Taller y Punto de Encuentro:</strong> Calle Bonpland 389 (entre Córdoba y Bonpland), Puerto Iguazú, Misiones, Argentina.",

        // Productos
        products_subtitle: "Catálogo Sustentable",
        products_title: "Nuestras Líneas de Producción Ecológica",
        products_lead: "Diseños exclusivos, resistentes y lavables, pensados para el máximo confort de perros y gatos bajo un esquema 100% amigable con el medio ambiente.",
        prod1_badge: "Top Circular",
        prod1_cat: "Línea Descanso",
        prod1_title: "Camitas Ecológicas de Neumáticos",
        prod1_desc: "Neumáticos reciclados de vehículos, completamente cepillados, desinfectados e impermeabilizados. Incluyen almohadón confeccionado con telas recicladas y relleno 100% de retazos textiles procesados bajo criterio cero desperdicio.",
        prod1_f1: "<strong>Estructura:</strong> Neumático recuperado higienizado",
        prod1_f2: "<strong>Almohada:</strong> Funda lavable de tela reutilizada",
        prod1_f3: "<strong>Relleno:</strong> Retazos textiles triturados y acondicionados",
        prod1_f4: "<strong>Tamaños:</strong> Chico (rodado 13-14) / Mediano (rodado 15-16)",
        prod2_badge: "Prendas Únicas",
        prod2_cat: "Línea Textil Upcycled",
        prod2_title: "Ropita Ecológica para Mascotas",
        prod2_desc: "Buzitos, remeras y capitas térmicas confeccionadas a partir de ropa donada o en desuso (remeras de algodón, buzos frisados y camisas recicladas). Cómodas, flexibles y abrigadas.",
        prod2_f1: "<strong>Material:</strong> 100% Ropa en desuso seleccionada",
        prod2_f2: "<strong>Talles:</strong> XS a XL (perros y gatos)",
        prod2_f3: "<strong>Confort:</strong> Costuras suaves anti-rozaduras",
        prod2_f4: "<strong>Diseño:</strong> Cada pieza es un modelo único e irrepetible",
        price_note: "AR$ aprox.",
        btn_see_impact: "Ver Impacto",

        // Fidelidad
        fidelity_subtitle: "Huellas Solidarias",
        fidelity_title: "Cartelito de Fidelidad",
        fidelity_lead: "En EcoPatas cada pata cuenta. Por cada compra que realices sumas 1 punto en tu cartelito. Al completar tus <strong>3 compras / puntos</strong>, destinamos una donación especial al refugio de animales de Puerto Iguazú que vos elijas.",
        fidelity_badge_top: "Cartelito Oficial • 3 Compras Solidarias",
        fidelity_brand: "EcoPatas • Fidelidad",
        fidelity_instruction: "Haz clic en cada huellita para marcar tus compras:",
        stamp_pending: "Pendiente",
        stamp_registered: "✓ ¡Registrado!",
        fidelity_count_0: "0 de 3 compras registradas (¡haz tu primera compra!)",
        fidelity_count_1: "1 de 3 compras registradas (faltan 2)",
        fidelity_count_2: "2 de 3 compras registradas (¡te falta solo 1 compra!)",
        fidelity_count_3: "🎉 ¡3 de 3 compras completadas!",
        shelter_title: "¿A cuál de estos refugios quieres destinar la donación?",
        shelter_subtitle: "Selecciona una de las dos entidades de protección animal de Puerto Iguazú:",
        shelter_badge_selected: "Refugio Seleccionado",
        shelter_badge_option: "Refugio",
        shelter_desc_patas: "Rescate, tránsito y cuidados de perros y gatos en situación de calle en Puerto Iguazú.",
        shelter_desc_tierra: "Organización dedicada a la preservación, sanidad y bienestar de animales rescatados en Misiones.",
        alert_badge: "¡3 Puntos de Fidelidad Completados!",
        alert_heading: "¡Felicitaciones! Has completado tus 3 compras",
        voucher_label: "Código de Validación para el Local:",
        btn_reset_fidelity: "Reiniciar Cartelito / Iniciar Nuevo Ciclo",

        // Calculador Ecológico
        impact_subtitle: "Simulador en Tiempo Real",
        impact_title: "Calcula el Impacto Ambiental de tu Elección",
        impact_lead: "Descubre cuántos residuos textiles, neumáticos y litros de agua salvas con cada producto EcoPatas que sumas a tu hogar.",
        calc_controls_title: "Selecciona los productos a simular:",
        calc_camitas_label: "Camitas de Neumáticos",
        calc_camitas_detail: "(1 neumático + ~1.8 kg tela y retazos por camita)",
        calc_ropitas_label: "Ropitas / Abrigos Reciclados",
        calc_ropitas_detail: "(~0.4 kg de prendas recuperadas por unidad)",
        calc_presets_title: "Combos sugeridos:",
        preset_1: "Combo Hogar (1 Camita + 1 Ropita)",
        preset_2: "Pack Multimascotas (2 Camitas + 3 Ropitas)",
        preset_3: "Solo Ropitas Upcycled (2 Prendas)",
        results_badge: "Huella Positiva Acumulada",
        results_title: "Aporte Ecológico Estimado",
        tile_textil_name: "Residuos textiles rescatados",
        tile_textil_desc: "Desviados de vertederos y basurales a cielo abierto.",
        tile_tires_name: "Neumáticos recuperados",
        tile_tires_desc: "Menos criaderos de mosquitos (prevención de dengue en Iguazú).",
        tile_water_name: "Agua preservada",
        tile_water_desc: "Ahorro en cultivo y manufactura de telas vírgenes nuevas.",
        tile_co2_name: "Emisiones evitadas",
        tile_co2_desc: "Menor emisión de gases de efecto invernadero en la región.",
        unit_units: "unidades",
        unit_liters: "litros",
        impact_quote_default: "¡Gran impacto! Tu elección salva recursos vitales y ayuda a la limpieza urbana de Puerto Iguazú.",

        // Admin & Costos
        admin_subtitle: "Gestión Interna del Emprendimiento",
        admin_title: "Panel de Administración &amp; Cálculo de Costos",
        admin_lead: "Herramienta de análisis financiero para EcoPatas: costeo fijo, costeo variable y punto de equilibrio de la producción circular.",
        auth_title: "Acceso Restringido a Administradores",
        auth_desc: "Ingresa la clave de administración para desbloquear el calculador de costos de producción.",
        auth_pass_label: "Contraseña de administrador",
        auth_placeholder: "Ingresa la contraseña...",
        auth_btn_unlock: "Desbloquear Panel",
        auth_hint: "Pista de acceso: La contraseña asignada es <strong>4800</strong>.",
        admin_session_active: "Sesión Activa: <strong>Administrador EcoPatas</strong>",
        btn_reset_values: "Restablecer Valores",
        btn_logout: "Cerrar Sesión / Bloquear",
        cf_group_title: "1. Costos Fijos Mensuales (CF)",
        cf_group_sub: "Gastos independientes de la cantidad producida.",
        cf_field_rent: "Espacio de taller / Alquiler mensual ($):",
        cf_field_services: "Servicios (Luz, agua, internet) ($):",
        cf_field_tools: "Amortización / Mantenimiento de herramientas ($):",
        cf_field_tools_help: "Tijeras de sastrería, agujas industriales, cepillos y lijas.",
        cf_field_marketing: "Marketing digital y viáticos de recolección ($):",
        cf_total_label: "Total Costos Fijos (CF):",
        cv_group_title: "2. Costos Variables Unitarios (CV)",
        cv_group_sub: "Gastos por cada unidad/lote elaborado.",
        cv_eco_notice: "<strong>Nota de Economía Circular:</strong> Las telas donadas, prendas en desuso y neumáticos recuperados se cargan a <strong>costo de adquisición $0</strong> gracias al esquema de upcycling y donaciones vecinales en Iguazú.",
        cv_field_threads: "Hilos de alta tenacidad, elásticos y botones ($):",
        cv_field_cleaning: "Limpieza profunda, lavandina y desinfección de neumáticos ($):",
        cv_field_paint: "Pintura al agua ecológica para llantas / terminaciones ($):",
        cv_field_packaging: "Etiqueta biodegradable y bolsa de papel reciclado ($):",
        cv_total_label: "Costo Variable Unitario Promedio (CVu):",
        market_group_title: "3. Parámetros de Mercado",
        market_group_sub: "Volumen mensual proyectado y precio de venta.",
        market_field_units: "Unidades estimadas a producir/vender por mes:",
        market_field_price: "Precio de Venta Promedio Estimado por Unidad ($):",
        summary_title: "Resumen de Indicadores Clave",
        summary_sub: "Cálculos automáticos del modelo de negocios",
        metric_ct_title: "Costo Total Mensual (CT)",
        metric_ct_formula: "CT = Costos Fijos + (CVu × Unidades)",
        metric_cu_title: "Costo Unitario Real (Cu)",
        metric_cu_formula: "Cu = Costo Total / Unidades producidas",
        metric_mc_title: "Margen Contribución Unitario (MC)",
        metric_mc_formula: "MC = Precio de Venta - CVu",
        metric_pe_title: "Punto de Equilibrio (PE)",
        metric_pe_formula: "PE = Costos Fijos / MC",
        metric_it_title: "Ingresos Totales (IT)",
        metric_it_formula: "IT = Precio de Venta × Unidades",
        metric_profit_title: "Ganancia Neta Mensual",
        metric_profit_formula: "Ganancia = Ingresos Totales - Costo Total",
        metric_margin_title: "Margen sobre Ventas (%)",
        metric_margin_formula: "(Ganancia / Ingresos) × 100",
        admin_storage_notice: "Tus datos se guardan automáticamente en <strong>localStorage</strong> de tu navegador para conservarse al recargar.",

        // Contacto
        contact_subtitle: "Conectemos",
        contact_title: "Encuéntranos en Puerto Iguazú",
        contact_lead: "¿Tienes telas o neumáticos limpios para donar? ¿Quieres encargar una camita o ropita a medida para tu mascota? ¡Escríbenos o visítanos!",
        contact_hq_badge: "Sede del Proyecto",
        contact_intro: "Microemprendimiento de triple impacto social, ecológico y comunitario.",
        contact_address_label: "Dirección Física:",
        contact_hours_label: "Horarios de Taller:",
        contact_hours_p1: "Lunes a Viernes: 08:00 a 12:30 y 14:00 a 18:00 hs",
        contact_hours_p2: "Recepción de donaciones textiles los días miércoles.",
        contact_phone_label: "Atención por WhatsApp / Teléfono:",
        contact_phone_note: "Respuestas coordinadas por el equipo de EcoPatas.",
        contact_email_label: "Correo Electrónico:",
        map_header_text: "Punto Geográfico: Bonpland 389, Puerto Iguazú",
        street_cordoba: "Calle Córdoba",
        street_bonpland: "Calle Bonpland 389 <span>📍 EcoPatas</span>",
        btn_open_maps: "Abrir en Google Maps",
        form_title: "Envíanos un mensaje o consulta",
        form_subtitle: "Te responderemos a la brevedad para asesorarte.",
        form_name_label: "Nombre y Apellido:",
        form_name_placeholder: "Ej. Valentina Morales",
        form_email_label: "Correo Electrónico:",
        form_email_placeholder: "ejemplo@correo.com",
        form_type_label: "Tipo de Consulta:",
        opt_select: "Selecciona una opción...",
        opt_order: "Quiero encargar una camita o prenda",
        opt_donate: "Quiero donar telas, ropas o neumáticos",
        opt_collab: "Consulta comercial o institucional",
        opt_other: "Otras consultas",
        form_msg_label: "Tu Mensaje:",
        form_msg_placeholder: "Cuéntanos el tamaño de tu mascota o los detalles de tu donación...",
        btn_send_msg: "Enviar Mensaje",

        // Footer
        footer_tagline: '"Donde cada pata deja huellas"',
        footer_about: "Iniciativa de economía circular y supra-reciclaje nacida en Puerto Iguazú, provincia de Misiones, Argentina. Cuidamos mascotas y protegemos el medio ambiente.",
        footer_links_heading: "Secciones Rápidas",
        footer_commitments_heading: "Compromiso Sustentable",
        footer_pill_loc: "📍 Bonpland 389, Iguazú",
        footer_pill_zw: "♻️ Enfoque Zero Waste",
        footer_pill_pets: "🐕 100% Amigable con Mascotas",
        footer_copy: "© 2026 EcoPatas • Microemprendimiento Sustentable. Todos los derechos reservados.",
        footer_credits: "Desarrollado con pasión y conciencia ambiental en Puerto Iguazú, Misiones."
    },

    en: {
        brand_badge: "Triple Impact",
        nav_inicio: "Home",
        nav_nosotros: "About Us",
        nav_productos: "Products",
        nav_fidelidad: "Loyalty Card",
        nav_impacto: "Eco Calculator",
        nav_admin: "Admin Panel",
        nav_contacto: "Contact",

        // Hero
        hero_tag: "Circular Microenterprise • Puerto Iguazú",
        hero_title: 'Love for animals, <span class="highlight-text">commitment to the planet</span>',
        hero_slogan: '"Where every paw leaves a mark"',
        hero_description: "We transform discarded tires and recovered clothing into comfortable, eco-friendly pet beds and coats for dogs and cats. Circular economy and upcycling from the heart of Misiones.",
        hero_btn_products: "View Products",
        hero_btn_impact: "Simulate Green Impact",
        showcase_badge: "Featured Model",
        showcase_tag: "100% Recycled Tire &amp; Scraps",
        showcase_name: "Eco-Iguazú Pet Bed",
        showcase_desc: "Sanitized, padded with recycled fabric and zero-waste stuffing.",

        // About Us
        about_subtitle: "Our Philosophy",
        about_title: "Circular Economy Leaving Positive Footprints",
        about_lead: "We are a passionate team committed to our surroundings in <strong>Puerto Iguazú, Misiones</strong>. We create value by protecting local biodiversity through creative upcycling.",
        about_c1_title: "Upcycling &amp; Creative Reuse",
        about_c1_text: "We don't just recycle: we elevate discarded clothes and vehicle tires. We turn waste into durable, comfortable, and high-quality products to pamper your pets.",
        about_c2_title: "Zero Waste Philosophy",
        about_c2_text: "Every scrap leftover from making pet clothes is carefully shredded to become the soft filling of our cushions. At EcoPatas, absolutely nothing goes to waste!",
        about_c3_title: "Local Impact in Iguazú",
        about_c3_text: "Removing discarded tires in Misiones prevents stagnant rainwater and the breeding of dengue-carrying mosquitoes, safeguarding both our community and the rainforest ecosystem.",
        about_location_badge: "<strong>Workshop &amp; Meeting Point:</strong> Bonpland 389 (between Córdoba and Bonpland), Puerto Iguazú, Misiones, Argentina.",

        // Products
        products_subtitle: "Sustainable Catalog",
        products_title: "Our Eco-Friendly Production Lines",
        products_lead: "Exclusive, durable, and washable designs crafted for dogs' and cats' maximum comfort under a 100% eco-friendly model.",
        prod1_badge: "Top Circular",
        prod1_cat: "Rest & Sleep Line",
        prod1_title: "Eco-Friendly Tire Pet Beds",
        prod1_desc: "Recycled vehicle tires, thoroughly scrubbed, sanitized, and waterproofed. Includes a cushion made from recycled fabrics and 100% shredded textile scraps under zero-waste standards.",
        prod1_f1: "<strong>Frame:</strong> Sanitized recovered vehicle tire",
        prod1_f2: "<strong>Cushion:</strong> Washable cover from repurposed fabric",
        prod1_f3: "<strong>Stuffing:</strong> Shredded and conditioned textile scraps",
        prod1_f4: "<strong>Sizes:</strong> Small (rim 13-14) / Medium (rim 15-16)",
        prod2_badge: "Unique Pieces",
        prod2_cat: "Upcycled Apparel Line",
        prod2_title: "Eco-Friendly Pet Clothing",
        prod2_desc: "Hoodies, shirts, and thermal vests made from donated or repurposed garments (cotton t-shirts, fleece hoodies, and recycled shirts). Comfortable, flexible, and warm.",
        prod2_f1: "<strong>Material:</strong> 100% Hand-picked repurposed clothing",
        prod2_f2: "<strong>Sizes:</strong> XS to XL (dogs and cats)",
        prod2_f3: "<strong>Comfort:</strong> Smooth anti-chafing seams",
        prod2_f4: "<strong>Design:</strong> Each piece is a unique, one-of-a-kind design",
        price_note: "approx. AR$",
        btn_see_impact: "See Impact",

        // Fidelity
        fidelity_subtitle: "Solidarity Paws",
        fidelity_title: "Loyalty Stamp Card",
        fidelity_lead: "At EcoPatas, every paw counts. For every purchase you make, you earn 1 point on your card. Upon completing your <strong>3 purchases / points</strong>, we make a special donation to the animal shelter of your choice in Puerto Iguazú.",
        fidelity_badge_top: "Official Card • 3 Solidarity Purchases",
        fidelity_brand: "EcoPatas • Loyalty",
        fidelity_instruction: "Click each paw to mark your purchases:",
        stamp_pending: "Pending",
        stamp_registered: "✓ Registered!",
        fidelity_count_0: "0 of 3 purchases recorded (make your first purchase!)",
        fidelity_count_1: "1 of 3 purchases recorded (2 to go)",
        fidelity_count_2: "2 of 3 purchases recorded (only 1 purchase left!)",
        fidelity_count_3: "🎉 3 of 3 purchases completed!",
        shelter_title: "Which of these shelters would you like the donation to go to?",
        shelter_subtitle: "Select one of the two animal protection organizations in Puerto Iguazú:",
        shelter_badge_selected: "Selected Shelter",
        shelter_badge_option: "Shelter",
        shelter_desc_patas: "Rescue, foster care, and treatment of homeless dogs and cats in Puerto Iguazú.",
        shelter_desc_tierra: "Organization dedicated to the preservation, health, and welfare of rescued animals in Misiones.",
        alert_badge: "3 Loyalty Points Completed!",
        alert_heading: "Congratulations! You have completed your 3 purchases",
        voucher_label: "Validation Code for Store:",
        btn_reset_fidelity: "Reset Card / Start New Cycle",

        // Impact Calculator
        impact_subtitle: "Real-Time Simulator",
        impact_title: "Calculate Your Environmental Impact",
        impact_lead: "Discover how much textile waste, tires, and liters of water you save with each EcoPatas product you bring home.",
        calc_controls_title: "Select the products to simulate:",
        calc_camitas_label: "Tire Pet Beds",
        calc_camitas_detail: "(1 tire + ~1.8 kg fabric & scraps per bed)",
        calc_ropitas_label: "Recycled Pet Coats / Clothes",
        calc_ropitas_detail: "(~0.4 kg of recovered garments per unit)",
        calc_presets_title: "Suggested combos:",
        preset_1: "Home Combo (1 Bed + 1 Coat)",
        preset_2: "Multi-Pet Pack (2 Beds + 3 Coats)",
        preset_3: "Upcycled Coats Only (2 Items)",
        results_badge: "Cumulative Positive Footprint",
        results_title: "Estimated Ecological Contribution",
        tile_textil_name: "Textile waste rescued",
        tile_textil_desc: "Diverted from open-air dumps and landfills.",
        tile_tires_name: "Vehicle tires recovered",
        tile_tires_desc: "Fewer mosquito breeding sites (dengue prevention in Iguazú).",
        tile_water_name: "Water preserved",
        tile_water_desc: "Savings in growing and manufacturing new virgin fabrics.",
        tile_co2_name: "Emissions avoided",
        tile_co2_desc: "Reduced greenhouse gas emissions in the region.",
        unit_units: "units",
        unit_liters: "liters",
        impact_quote_default: "Huge impact! Your choice saves vital resources and aids urban cleanup in Puerto Iguazú.",

        // Admin & Costs
        admin_subtitle: "Internal Business Management",
        admin_title: "Admin Panel &amp; Cost Calculation",
        admin_lead: "Financial analysis tool for EcoPatas: fixed costs, variable costs, and break-even point for circular production.",
        auth_title: "Restricted Admin Access",
        auth_desc: "Enter the admin passkey to unlock the production cost calculator.",
        auth_pass_label: "Admin password",
        auth_placeholder: "Enter password...",
        auth_btn_unlock: "Unlock Panel",
        auth_hint: "Access hint: The assigned passkey is <strong>4800</strong>.",
        admin_session_active: "Active Session: <strong>EcoPatas Administrator</strong>",
        btn_reset_values: "Reset Values",
        btn_logout: "Log Out / Lock",
        cf_group_title: "1. Monthly Fixed Costs (FC)",
        cf_group_sub: "Expenses independent of the quantity produced.",
        cf_field_rent: "Workshop space / Monthly rent ($):",
        cf_field_services: "Utilities (Electricity, water, internet) ($):",
        cf_field_tools: "Tool depreciation / Maintenance ($):",
        cf_field_tools_help: "Tailor scissors, industrial needles, wire brushes, and sandpaper.",
        cf_field_marketing: "Digital marketing and collection transport ($):",
        cf_total_label: "Total Fixed Costs (FC):",
        cv_group_title: "2. Unit Variable Costs (VC)",
        cv_group_sub: "Expenses per unit/batch produced.",
        cv_eco_notice: "<strong>Circular Economy Note:</strong> Donated fabrics, repurposed clothing, and reclaimed tires are loaded at <strong>$0 acquisition cost</strong> thanks to upcycling and neighborhood donations in Iguazú.",
        cv_field_threads: "Heavy-duty thread, elastics, and buttons ($):",
        cv_field_cleaning: "Deep tire cleaning, bleach, and disinfection ($):",
        cv_field_paint: "Eco-friendly water-based tire paint & finishes ($):",
        cv_field_packaging: "Biodegradable tag and recycled paper bag ($):",
        cv_total_label: "Average Unit Variable Cost (UVC):",
        market_group_title: "3. Market Parameters",
        market_group_sub: "Projected monthly volume and sale price.",
        market_field_units: "Estimated units to produce/sell per month:",
        market_field_price: "Estimated Average Selling Price per Unit ($):",
        summary_title: "Key Financial Indicators Summary",
        summary_sub: "Automated business model calculations",
        metric_ct_title: "Total Monthly Cost (TC)",
        metric_ct_formula: "TC = Fixed Costs + (UVC × Units)",
        metric_cu_title: "Actual Unit Cost (UC)",
        metric_cu_formula: "UC = Total Cost / Units produced",
        metric_mc_title: "Unit Contribution Margin (CM)",
        metric_mc_formula: "CM = Selling Price - UVC",
        metric_pe_title: "Break-Even Point (BEP)",
        metric_pe_formula: "BEP = Fixed Costs / CM",
        metric_it_title: "Total Revenue (TR)",
        metric_it_formula: "TR = Selling Price × Units",
        metric_profit_title: "Net Monthly Profit",
        metric_profit_formula: "Profit = Total Revenue - Total Cost",
        metric_margin_title: "Profit Margin on Sales (%)",
        metric_margin_formula: "(Profit / Revenue) × 100",
        admin_storage_notice: "Your data is automatically saved in your browser's <strong>localStorage</strong> to persist upon reload.",

        // Contact
        contact_subtitle: "Let's Connect",
        contact_title: "Find Us in Puerto Iguazú",
        contact_lead: "Do you have clean fabrics or tires to donate? Want to order a custom pet bed or coat? Message us or stop by!",
        contact_hq_badge: "Project Headquarters",
        contact_intro: "Triple-impact microenterprise: social, ecological, and community.",
        contact_address_label: "Physical Address:",
        contact_hours_label: "Workshop Hours:",
        contact_hours_p1: "Monday to Friday: 08:00 AM to 12:30 PM &amp; 02:00 PM to 06:00 PM",
        contact_hours_p2: "Textile donations received on Wednesdays.",
        contact_phone_label: "WhatsApp / Phone Support:",
        contact_phone_note: "Responses coordinated by the EcoPatas team.",
        contact_email_label: "Email Address:",
        map_header_text: "Geographic Location: Bonpland 389, Puerto Iguazú",
        street_cordoba: "Córdoba Street",
        street_bonpland: "Bonpland Street 389 <span>📍 EcoPatas</span>",
        btn_open_maps: "Open in Google Maps",
        form_title: "Send us a message or inquiry",
        form_subtitle: "We will get back to you promptly to assist you.",
        form_name_label: "Full Name:",
        form_name_placeholder: "e.g. John Miller",
        form_email_label: "Email Address:",
        form_email_placeholder: "example@email.com",
        form_type_label: "Inquiry Type:",
        opt_select: "Select an option...",
        opt_order: "I want to order a pet bed or coat",
        opt_donate: "I want to donate fabrics, clothes or tires",
        opt_collab: "Commercial or institutional inquiry",
        opt_other: "Other questions",
        form_msg_label: "Your Message:",
        form_msg_placeholder: "Tell us your pet's size or details about your donation...",
        btn_send_msg: "Send Message",

        // Footer
        footer_tagline: '"Where every paw leaves a mark"',
        footer_about: "Circular economy and creative upcycling initiative born in Puerto Iguazú, Misiones province, Argentina. Caring for pets and protecting the environment.",
        footer_links_heading: "Quick Links",
        footer_commitments_heading: "Sustainable Commitment",
        footer_pill_loc: "📍 Bonpland 389, Iguazú",
        footer_pill_zw: "♻️ Zero Waste Focus",
        footer_pill_pets: "🐕 100% Pet Friendly",
        footer_copy: "© 2026 EcoPatas • Sustainable Microenterprise. All rights reserved.",
        footer_credits: "Developed with passion and environmental awareness in Puerto Iguazú, Misiones."
    },

    pt: {
        brand_badge: "Triplo Impacto",
        nav_inicio: "Início",
        nav_nosotros: "Sobre Nós",
        nav_productos: "Produtos",
        nav_fidelidad: "Fidelidade",
        nav_impacto: "Calculadora Ecológica",
        nav_admin: "Painel Admin",
        nav_contacto: "Contato",

        // Hero
        hero_tag: "Microempreendimento Circular • Puerto Iguazú",
        hero_title: 'Amor pelos animais, <span class="highlight-text">compromisso com o planeta</span>',
        hero_slogan: '"Onde cada pata deixa pegadas"',
        hero_description: "Transformamos pneus descartados e roupas recuperadas em caminhas e agasalhos ecológicos confortáveis para cães e gatos. Economia circular e upcycling no coração de Misiones.",
        hero_btn_products: "Ver Produtos",
        hero_btn_impact: "Simular Impacto Verde",
        showcase_badge: "Modelo em Destaque",
        showcase_tag: "100% Pneu &amp; Retalhos",
        showcase_name: "Caminha Eco-Iguazú",
        showcase_desc: "Higienizada, acolchoada com tecido reciclado e enchimento zero desperdício.",

        // Sobre Nós
        about_subtitle: "Nossa Filosofia",
        about_title: "Economia Circular que deixa pegadas positivas",
        about_lead: "Somos uma equipe comprometida com o nosso meio ambiente em <strong>Puerto Iguazú, Misiones</strong>. Criamos valor protegendo a biodiversidade local através do upcycling.",
        about_c1_title: "Upcycling &amp; Supra-reciclagem",
        about_c1_text: "Não apenas reciclamos: elevamos o valor de roupas sem uso e pneus descartados. Transformamos resíduos em produtos duráveis, confortáveis e de alta qualidade para seus pets.",
        about_c2_title: "Desperdício Zero (Zero Waste)",
        about_c2_text: "Cada retalho que sobra da confecção de roupinhas é cuidadosamente triturado para se transformar no enchimento macio das nossas almofadas. Na EcoPatas nada se descarta!",
        about_c3_title: "Impacto Local em Iguazú",
        about_c3_text: "Retirar pneus descartados em Misiones evita o acúmulo de água da chuva e a proliferação de mosquitos transmissores da dengue, protegendo a comunidade e a mata nativa.",
        about_location_badge: "<strong>Oficina e Ponto de Encontro:</strong> Calle Bonpland 389 (entre Córdoba e Bonpland), Puerto Iguazú, Misiones, Argentina.",

        // Produtos
        products_subtitle: "Catálogo Sustentável",
        products_title: "Nossas Linhas de Produção Ecológica",
        products_lead: "Design exclusivo, resistente e lavável, pensado para o conforto máximo de cães e gatos sob um modelo 100% amigo do meio ambiente.",
        prod1_badge: "Top Circular",
        prod1_cat: "Linha Descanso",
        prod1_title: "Caminhas Ecológicas de Pneus",
        prod1_desc: "Pneus reciclados de veículos, totalmente escovados, desinfetados e impermeabilizados. Incluem almofada confeccionada com tecidos reciclados e enchimento 100% de retalhos têxteis sob critério zero desperdício.",
        prod1_f1: "<strong>Estrutura:</strong> Pneu recuperado e higienizado",
        prod1_f2: "<strong>Almofada:</strong> Capa lavável em tecido reaproveitado",
        prod1_f3: "<strong>Enchimento:</strong> Retalhos têxteis triturados e condicionados",
        prod1_f4: "<strong>Tamanhos:</strong> Pequeno (aro 13-14) / Médio (aro 15-16)",
        prod2_badge: "Peças Únicas",
        prod2_cat: "Linha Têxtil Upcycled",
        prod2_title: "Roupinhas Ecológicas para Pets",
        prod2_desc: "Moletons, camisetinhas e capinhas térmicas confeccionadas a partir de roupas doadas ou em desuso (camisetas de algodão, moletons e camisas). Confortáveis, flexíveis e quentinhas.",
        prod2_f1: "<strong>Material:</strong> 100% Roupas em desuso selecionadas",
        prod2_f2: "<strong>Tamanhos:</strong> PP ao GG (cães e gatos)",
        prod2_f3: "<strong>Conforto:</strong> Costuras suaves anti-atrito",
        prod2_f4: "<strong>Design:</strong> Cada peça é um modelo único e exclusivo",
        price_note: "AR$ aprox.",
        btn_see_impact: "Ver Impacto",

        // Fidelidade
        fidelity_subtitle: "Patas Solidárias",
        fidelity_title: "Cartão de Fidelidade",
        fidelity_lead: "Na EcoPatas cada pata conta. A cada compra que você realiza, acumula 1 ponto no seu cartão. Ao completar suas <strong>3 compras / pontos</strong>, destinamos uma doação especial ao abrigo de animais de Puerto Iguazú que você escolher.",
        fidelity_badge_top: "Cartão Oficial • 3 Compras Solidárias",
        fidelity_brand: "EcoPatas • Fidelidade",
        fidelity_instruction: "Clique em cada patinha para marcar suas compras:",
        stamp_pending: "Pendente",
        stamp_registered: "✓ Registrado!",
        fidelity_count_0: "0 de 3 compras registradas (faça sua primeira compra!)",
        fidelity_count_1: "1 de 3 compras registradas (faltam 2)",
        fidelity_count_2: "2 de 3 compras registradas (falta apenas 1 compra!)",
        fidelity_count_3: "🎉 3 de 3 compras concluídas!",
        shelter_title: "Para qual destes abrigos você gostaria de destinar a doação?",
        shelter_subtitle: "Selecione uma das duas entidades de proteção animal de Puerto Iguazú:",
        shelter_badge_selected: "Abrigo Selecionado",
        shelter_badge_option: "Abrigo",
        shelter_desc_patas: "Resgate, lar temporário e cuidados com cães e gatos em situação de rua em Puerto Iguazú.",
        shelter_desc_tierra: "Organização dedicada à preservação, saúde e bem-estar de animais resgatados em Misiones.",
        alert_badge: "3 Pontos de Fidelidade Concluídos!",
        alert_heading: "Parabéns! Você completou suas 3 compras",
        voucher_label: "Código de Validação para a Loja:",
        btn_reset_fidelity: "Reiniciar Cartão / Iniciar Novo Ciclo",

        // Calculador Ecológico
        impact_subtitle: "Simulador em Tempo Real",
        impact_title: "Calcule o Impacto Ambiental da Sua Escolha",
        impact_lead: "Descubra quanto resíduo têxtil, pneus e litros de água você poupa com cada produto EcoPatas que leva para casa.",
        calc_controls_title: "Selecione os produtos para simular:",
        calc_camitas_label: "Caminhas de Pneus",
        calc_camitas_detail: "(1 pneu + ~1.8 kg tecido e retalhos por caminha)",
        calc_ropitas_label: "Roupinhas / Agasalhos Reciclados",
        calc_ropitas_detail: "(~0.4 kg de roupas recuperadas por unidade)",
        calc_presets_title: "Combos sugeridos:",
        preset_1: "Combo Lar (1 Caminha + 1 Roupinha)",
        preset_2: "Pacote Multi-Pets (2 Caminhas + 3 Roupinhas)",
        preset_3: "Apenas Roupinhas Upcycled (2 Peças)",
        results_badge: "Pegada Positiva Acumulada",
        results_title: "Contribuição Ecológica Estimada",
        tile_textil_name: "Resíduos têxteis resgatados",
        tile_textil_desc: "Desviados de lixões e aterros a céu aberto.",
        tile_tires_name: "Pneus recuperados",
        tile_tires_desc: "Menos criadouros de mosquitos (prevenção da dengue em Iguazú).",
        tile_water_name: "Água preservada",
        tile_water_desc: "Economia no plantio e na manufatura de novos tecidos virgens.",
        tile_co2_name: "Emissões evitadas",
        tile_co2_desc: "Menor emissão de gases de efeito estufa na região.",
        unit_units: "unidades",
        unit_liters: "litros",
        impact_quote_default: "Grande impacto! Sua escolha salva recursos vitais e ajuda na limpeza urbana de Puerto Iguazú.",

        // Admin & Custos
        admin_subtitle: "Gestão Interna do Empreendimento",
        admin_title: "Painel de Administração &amp; Cálculo de Custos",
        admin_lead: "Ferramenta de análise financeira para a EcoPatas: custos fixos, variáveis e ponto de equilíbrio da produção circular.",
        auth_title: "Acesso Restrito a Administradores",
        auth_desc: "Digite a senha de administração para desbloquear o calculador de custos de produção.",
        auth_pass_label: "Senha de administrador",
        auth_placeholder: "Digite a senha...",
        auth_btn_unlock: "Desbloquear Painel",
        auth_hint: "Dica de acesso: A senha atribuída é <strong>4800</strong>.",
        admin_session_active: "Sessão Ativa: <strong>Administrador EcoPatas</strong>",
        btn_reset_values: "Restaurar Valores",
        btn_logout: "Encerrar Sessão / Bloquear",
        cf_group_title: "1. Custos Fixos Mensais (CF)",
        cf_group_sub: "Gastos independentes da quantidade produzida.",
        cf_field_rent: "Espaço de oficina / Aluguel mensal ($):",
        cf_field_services: "Serviços (Luz, água, internet) ($):",
        cf_field_tools: "Depreciação / Manutenção de ferramentas ($):",
        cf_field_tools_help: "Tesouras de alfaiataria, agulhas industriais, escovas e lixas.",
        cf_field_marketing: "Marketing digital e transporte para coletas ($):",
        cf_total_label: "Total de Custos Fixos (CF):",
        cv_group_title: "2. Custos Variáveis Unitários (CV)",
        cv_group_sub: "Gastos por cada unidade/lote produzido.",
        cv_eco_notice: "<strong>Nota de Economia Circular:</strong> Os tecidos doados, roupas em desuso e pneus recuperados são computados a <strong>custo de aquisição $0</strong> graças ao modelo de upcycling e doações comunitárias em Iguazú.",
        cv_field_threads: "Linhas reforçadas, elásticos e botões ($):",
        cv_field_cleaning: "Limpeza profunda, água sanitária e desinfecção de pneus ($):",
        cv_field_paint: "Tinta à base de água ecológica para pneus / acabamentos ($):",
        cv_field_packaging: "Etiqueta biodegradável e sacola de papel reciclado ($):",
        cv_total_label: "Custo Variável Unitário Médio (CVu):",
        market_group_title: "3. Parâmetros de Mercado",
        market_group_sub: "Volume mensal projetado e preço de venda.",
        market_field_units: "Unidades estimadas a produzir/vender por mês:",
        market_field_price: "Preço de Venda Médio Estimado por Unidade ($):",
        summary_title: "Resumo dos Principais Indicadores",
        summary_sub: "Cálculos automáticos do modelo de negócios",
        metric_ct_title: "Custo Total Mensal (CT)",
        metric_ct_formula: "CT = Custos Fixos + (CVu × Unidades)",
        metric_cu_title: "Custo Unitário Real (Cu)",
        metric_cu_formula: "Cu = Custo Total / Unidades produzidas",
        metric_mc_title: "Margem de Contribuição Unitária (MC)",
        metric_mc_formula: "MC = Preço de Venda - CVu",
        metric_pe_title: "Ponto de Equilíbrio (PE)",
        metric_pe_formula: "PE = Custos Fixos / MC",
        metric_it_title: "Receita Total (RT)",
        metric_it_formula: "RT = Preço de Venda × Unidades",
        metric_profit_title: "Lucro Líquido Mensal",
        metric_profit_formula: "Lucro = Receita Total - Custo Total",
        metric_margin_title: "Margem sobre Vendas (%)",
        metric_margin_formula: "(Lucro / Receita) × 100",
        admin_storage_notice: "Seus dados são salvos automaticamente no <strong>localStorage</strong> do seu navegador para permanecerem ao recarregar.",

        // Contato
        contact_subtitle: "Conecte-se",
        contact_title: "Encontre-nos em Puerto Iguazú",
        contact_lead: "Tem tecidos ou pneus limpos para doar? Quer encomendar uma caminha ou roupinha sob medida? Fale conosco ou venha nos visitar!",
        contact_hq_badge: "Sede do Projeto",
        contact_intro: "Microempreendimento de triplo impacto: social, ecológico e comunitário.",
        contact_address_label: "Endereço Físico:",
        contact_hours_label: "Horários da Oficina:",
        contact_hours_p1: "Segunda a Sexta: 08:00 às 12:30 e 14:00 às 18:00 h",
        contact_hours_p2: "Recebimento de doações têxteis às quartas-feiras.",
        contact_phone_label: "Atendimento por WhatsApp / Telefone:",
        contact_phone_note: "Respostas coordenadas pela equipe EcoPatas.",
        contact_email_label: "E-mail:",
        map_header_text: "Localização Geográfica: Bonpland 389, Puerto Iguazú",
        street_cordoba: "Rua Córdoba",
        street_bonpland: "Rua Bonpland 389 <span>📍 EcoPatas</span>",
        btn_open_maps: "Abrir no Google Maps",
        form_title: "Envie-nos uma mensagem ou consulta",
        form_subtitle: "Responderemos prontamente para tirar suas dúvidas.",
        form_name_label: "Nome Completo:",
        form_name_placeholder: "Ex. Camila Oliveira",
        form_email_label: "E-mail:",
        form_email_placeholder: "exemplo@email.com",
        form_type_label: "Tipo de Consulta:",
        opt_select: "Selecione uma opção...",
        opt_order: "Quero encomendar uma caminha ou roupinha",
        opt_donate: "Quero doar tecidos, roupas ou pneus",
        opt_collab: "Consulta comercial ou institucional",
        opt_other: "Outras dúvidas",
        form_msg_label: "Sua Mensagem:",
        form_msg_placeholder: "Conte-nos o porte do seu pet ou detalhes da sua doação...",
        btn_send_msg: "Enviar Mensagem",

        // Footer
        footer_tagline: '"Onde cada pata deixa pegadas"',
        footer_about: "Iniciativa de economia circular e supra-reciclagem nascida em Puerto Iguazú, província de Misiones, Argentina. Cuidando dos pets e protegendo o meio ambiente.",
        footer_links_heading: "Links Rápidos",
        footer_commitments_heading: "Compromisso Sustentável",
        footer_pill_loc: "📍 Bonpland 389, Iguazú",
        footer_pill_zw: "♻️ Foco Zero Waste",
        footer_pill_pets: "🐕 100% Amigo dos Pets",
        footer_copy: "© 2026 EcoPatas • Microempreendimento Sustentável. Todos os direitos reservados.",
        footer_credits: "Desenvolvido com paixão e consciência ambiental em Puerto Iguazú, Misiones."
    }
};

/**
 * Orden oficial de idiomas del microemprendimiento:
 * 1. Español (Idioma Base)
 * 2. Português (Segundo Idioma - Frontera)
 * 3. English (Tercer Idioma - Turismo Internacional)
 */
const ORDEN_IDIOMAS = ['es', 'pt', 'en'];

/**
 * Inicializa los botones de idioma y carga la preferencia guardada
 */
function initLanguageSelector() {
    // Recuperar idioma guardado o usar español como base
    const savedLang = localStorage.getItem(STORAGE_KEY_LANG) || 'es';

    // Asignar listeners a todos los botones con data-lang (navbar y móvil)
    const allLangButtons = document.querySelectorAll('.lang-pill, .mobile-lang-btn');
    allLangButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && TRANSLATIONS[targetLang]) {
                cambiarIdioma(targetLang);
            }
        });
    });

    // Aplicar idioma inicial
    cambiarIdioma(savedLang, false);
}

/**
 * Alterna secuencialmente al siguiente idioma:
 * 1. Español (Base) ➡️ 2. Português ➡️ 3. English ➡️ 1. Español
 */
function ciclarIdioma() {
    const currentIndex = ORDEN_IDIOMAS.indexOf(idiomaActual);
    const nextIndex = (currentIndex + 1) % ORDEN_IDIOMAS.length;
    cambiarIdioma(ORDEN_IDIOMAS[nextIndex]);
}

/**
 * Cambia el idioma de la página dinámicamente y actualiza el DOM
 */
function cambiarIdioma(lang, guardar = true) {
    if (!TRANSLATIONS[lang]) return;

    idiomaActual = lang;
    if (guardar) {
        try {
            localStorage.setItem(STORAGE_KEY_LANG, lang);
        } catch (e) {
            console.warn('No se pudo guardar la preferencia de idioma:', e);
        }
    }

    // Actualizar atributo lang en el elemento raíz <html>
    document.documentElement.lang = lang;

    // Actualizar estado activo en los botones de idioma del Navbar
    const langPills = document.querySelectorAll('.lang-pill');
    langPills.forEach(pill => {
        const pillLang = pill.getAttribute('data-lang');
        if (pillLang === lang) {
            pill.classList.add('active');
            pill.setAttribute('aria-pressed', 'true');
        } else {
            pill.classList.remove('active');
            pill.setAttribute('aria-pressed', 'false');
        }
    });

    // Actualizar estado activo en los botones del Menú Móvil
    const mobileBtns = document.querySelectorAll('.mobile-lang-btn');
    mobileBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Traducir todos los elementos estáticos con data-i18n
    const translatables = document.querySelectorAll('[data-i18n]');
    const dict = TRANSLATIONS[lang];

    translatables.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict && dict[key] !== undefined) {
            if (dict[key].includes('<') && dict[key].includes('>')) {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Traducir todos los placeholders con data-i18n-placeholder
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict && dict[key] !== undefined) {
            el.placeholder = dict[key];
        }
    });

    // Actualizar textos dinámicos generados por JavaScript (impacto, cartelito, diagnósticos)
    actualizarTextosDinamicosPorIdioma();
}

/**
 * Sincroniza textos dinámicos generados por módulos JS con el idioma actual
 */
function actualizarTextosDinamicosPorIdioma() {
    // 1. Recalcular impacto ecológico (actualiza unidades y mensaje contextual)
    calcularImpacto();

    // 2. Actualizar estado del cartelito de fidelidad
    actualizarVistaFidelidad();

    // 3. Actualizar diagnósticos de viabilidad en el panel de costos si está visible
    calcularModeloCostos();
}

/* ============================================================================
   2. NAVEGACIÓN Y MENÚ RESPONSIVO (MOBILE DRAWER)
   ============================================================================ */
function initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Apertura y cierre del menú hamburguesa en pantallas pequeñas
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Cerrar el menú al hacer clic en cualquier enlace
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Resaltado dinámico del enlace activo según el scroll de la página (IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                links.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================================================
   3. SIMULADOR / CALCULADOR DE IMPACTO ECOLÓGICO (PÚBLICO)
   ============================================================================ */
const ECO_METRICS = {
    camita: { telaKg: 1.8, neumaticos: 1 },
    ropita: { telaKg: 0.4, neumaticos: 0 },
    litrosAguaPorKgTela: 10000,
    co2KgPorKgTela: 15
};

function initImpactCalculator() {
    const inputCamitas = document.getElementById('qty-camitas');
    const inputRopitas = document.getElementById('qty-ropitas');

    const inputs = [inputCamitas, inputRopitas];

    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', calcularImpacto);
        }
    });

    calcularImpacto();
}

function cambiarCantidad(tipo, delta) {
    const inputId = `qty-${tipo}`;
    const input = document.getElementById(inputId);
    if (!input) return;

    let valorActual = parseInt(input.value, 10) || 0;
    let nuevoValor = Math.max(0, valorActual + delta);
    input.value = nuevoValor;

    calcularImpacto();
}

function cargarPreset(camitas, ropitas) {
    const inputCamitas = document.getElementById('qty-camitas');
    const inputRopitas = document.getElementById('qty-ropitas');

    if (inputCamitas) inputCamitas.value = camitas;
    if (inputRopitas) inputRopitas.value = ropitas;

    calcularImpacto();
}

function calcularImpacto() {
    const qtyCamitas = Math.max(0, parseInt(document.getElementById('qty-camitas')?.value, 10) || 0);
    const qtyRopitas = Math.max(0, parseInt(document.getElementById('qty-ropitas')?.value, 10) || 0);

    const totalTelaKg = (qtyCamitas * ECO_METRICS.camita.telaKg) +
                        (qtyRopitas * ECO_METRICS.ropita.telaKg);

    const totalNeumaticos = qtyCamitas * ECO_METRICS.camita.neumaticos;
    const totalLitrosAgua = totalTelaKg * ECO_METRICS.litrosAguaPorKgTela;
    const totalCO2Kg = Math.round(totalTelaKg * ECO_METRICS.co2KgPorKgTela);

    const elTextil = document.getElementById('val-textil');
    const elNeumaticos = document.getElementById('val-neumaticos');
    const elAgua = document.getElementById('val-agua');
    const elCO2 = document.getElementById('val-co2');
    const elMensaje = document.getElementById('impact-message');

    if (elTextil) elTextil.textContent = formatearNumero(totalTelaKg, 1);
    if (elNeumaticos) elNeumaticos.textContent = totalNeumaticos;
    if (elAgua) elAgua.textContent = formatearNumero(totalLitrosAgua, 0);
    if (elCO2) elCO2.textContent = formatearNumero(totalCO2Kg, 0);

    // Mensaje contextual adaptado al idioma activo
    if (elMensaje) {
        if (totalTelaKg === 0 && totalNeumaticos === 0) {
            if (idiomaActual === 'en') {
                elMensaje.textContent = 'Select at least one product to discover the positive impact on Puerto Iguazú.';
            } else if (idiomaActual === 'pt') {
                elMensaje.textContent = 'Selecione pelo menos um produto para descobrir o impacto positivo em Puerto Iguazú.';
            } else {
                elMensaje.textContent = 'Selecciona al menos un producto para descubrir el impacto positivo en Puerto Iguazú.';
            }
        } else if (totalNeumaticos > 0) {
            if (idiomaActual === 'en') {
                elMensaje.textContent = `Excellent! By recycling ${totalNeumaticos} tire(s), you eliminate potential mosquito breeding sites in Iguazú and save ${formatearNumero(totalLitrosAgua, 0)} L of water.`;
            } else if (idiomaActual === 'pt') {
                elMensaje.textContent = `Excelente! Ao reciclar ${totalNeumaticos} pneu(s), você elimina possíveis criadouros de mosquitos em Iguazú e poupa ${formatearNumero(totalLitrosAgua, 0)} L de água.`;
            } else {
                elMensaje.textContent = `¡Excelente! Al reciclar ${totalNeumaticos} neumático(s), erradicas potenciales criaderos de mosquitos en Iguazú y evitas ${formatearNumero(totalLitrosAgua, 0)} L de agua.`;
            }
        } else {
            if (idiomaActual === 'en') {
                elMensaje.textContent = `Great contribution! You rescue ${formatearNumero(totalTelaKg, 1)} kg of discarded garments, saving ${formatearNumero(totalLitrosAgua, 0)} liters of freshwater.`;
            } else if (idiomaActual === 'pt') {
                elMensaje.textContent = `Grande contribuição! Você resgata ${formatearNumero(totalTelaKg, 1)} kg de roupas em desuso, economizando ${formatearNumero(totalLitrosAgua, 0)} litros de água doce.`;
            } else {
                elMensaje.textContent = `¡Gran aporte! Rescatas ${formatearNumero(totalTelaKg, 1)} kg de prendas en desuso, ahorrando ${formatearNumero(totalLitrosAgua, 0)} litros de agua dulce.`;
            }
        }
    }
}

/* ============================================================================
   4. SECCIÓN CARTELITO DE FIDELIDAD (3 PUNTOS / HUELLAS SOLIDARIAS)
   ============================================================================ */
const STORAGE_KEY_FIDELIDAD_PUNTOS = "ecopatas_fidelidad_puntos";
const STORAGE_KEY_FIDELIDAD_REFUGIO = "ecopatas_fidelidad_refugio";

let puntosFidelidad = 0;
let refugioSeleccionado = "Protectora Animal Patas a la Obra";

function initFidelityCard() {
    const puntosGuardados = parseInt(localStorage.getItem(STORAGE_KEY_FIDELIDAD_PUNTOS), 10);
    if (!isNaN(puntosGuardados) && puntosGuardados >= 0 && puntosGuardados <= 3) {
        puntosFidelidad = puntosGuardados;
    }

    const refugioGuardado = localStorage.getItem(STORAGE_KEY_FIDELIDAD_REFUGIO);
    if (refugioGuardado) {
        refugioSeleccionado = refugioGuardado;
    }

    const radioPatas = document.getElementById('shelter-patas');
    const radioTierra = document.getElementById('shelter-tierra');
    const labelPatas = document.getElementById('label-shelter-1');
    const labelTierra = document.getElementById('label-shelter-2');

    if (refugioSeleccionado === "Tierra sin Mal") {
        if (radioTierra) radioTierra.checked = true;
        if (labelTierra) labelTierra.classList.add('active');
        if (labelPatas) labelPatas.classList.remove('active');
    } else {
        if (radioPatas) radioPatas.checked = true;
        if (labelPatas) labelPatas.classList.add('active');
        if (labelTierra) labelTierra.classList.remove('active');
    }

    actualizarVistaFidelidad();
}

function togglePunto(numeroPunto) {
    if (puntosFidelidad === numeroPunto) {
        puntosFidelidad = numeroPunto - 1;
    } else {
        puntosFidelidad = numeroPunto;
    }
    guardarFidelidad();
    actualizarVistaFidelidad();
}

function ajustarPuntos(delta) {
    puntosFidelidad = Math.min(3, Math.max(0, puntosFidelidad + delta));
    guardarFidelidad();
    actualizarVistaFidelidad();
}

function seleccionarRefugio(nombreRefugio) {
    refugioSeleccionado = nombreRefugio;

    const labelPatas = document.getElementById('label-shelter-1');
    const labelTierra = document.getElementById('label-shelter-2');

    if (nombreRefugio === "Tierra sin Mal") {
        if (labelTierra) labelTierra.classList.add('active');
        if (labelPatas) labelPatas.classList.remove('active');
    } else {
        if (labelPatas) labelPatas.classList.add('active');
        if (labelTierra) labelTierra.classList.remove('active');
    }

    guardarFidelidad();
    actualizarAvisoFidelidadCompleta();
}

function actualizarVistaFidelidad() {
    const dict = TRANSLATIONS[idiomaActual] || TRANSLATIONS.es;

    // 1. Actualizar los 3 sellos visuales
    for (let i = 1; i <= 3; i++) {
        const slot = document.getElementById(`stamp-${i}`);
        const statusText = document.getElementById(`stamp-status-${i}`);
        if (slot) {
            if (i <= puntosFidelidad) {
                slot.classList.add('stamped');
                if (statusText) statusText.textContent = dict.stamp_registered || '✓ ¡Registrado!';
            } else {
                slot.classList.remove('stamped');
                if (statusText) statusText.textContent = dict.stamp_pending || 'Pendiente';
            }
        }
    }

    // 2. Barra de progreso y texto contador
    const progressFill = document.getElementById('fidelity-progress');
    const countText = document.getElementById('fidelity-count-text');

    const porcentaje = (puntosFidelidad / 3) * 100;
    if (progressFill) progressFill.style.width = `${porcentaje}%`;

    if (countText) {
        if (puntosFidelidad === 0) {
            countText.textContent = dict.fidelity_count_0;
        } else if (puntosFidelidad === 1) {
            countText.textContent = dict.fidelity_count_1;
        } else if (puntosFidelidad === 2) {
            countText.textContent = dict.fidelity_count_2;
        } else {
            countText.textContent = dict.fidelity_count_3;
        }
    }

    // 3. Aviso condicional al completar los 3 puntos (OBLIGATORIO MOSTRAR EN LOCAL FÍSICO)
    actualizarAvisoFidelidadCompleta();
}

function actualizarAvisoFidelidadCompleta() {
    const alertBox = document.getElementById('fidelity-completed-alert');
    const noticeTextEl = document.getElementById('alert-main-notice-text');

    if (alertBox) {
        if (puntosFidelidad === 3) {
            alertBox.classList.remove('hidden');

            if (noticeTextEl) {
                if (idiomaActual === 'en') {
                    noticeTextEl.innerHTML = `<strong>IMPORTANT NOTICE:</strong> To validate your benefit and confirm the donation to <strong>${refugioSeleccionado}</strong>, <u>you must present the three loyalty points in our physical store</u> in EcoPatas (Calle Bonpland 389, between Córdoba and Bonpland, Puerto Iguazú).`;
                } else if (idiomaActual === 'pt') {
                    noticeTextEl.innerHTML = `<strong>AVISO IMPORTANTE:</strong> Para validar seu benefício e confirmar a doação destinada a <strong>${refugioSeleccionado}</strong>, <u>você deve apresentar os três pontos de fidelidade na loja física</u> da EcoPatas (Calle Bonpland 389, entre Córdoba e Bonpland, Puerto Iguazú).`;
                } else {
                    noticeTextEl.innerHTML = `<strong>AVISO IMPORTANTE:</strong> Para validar tu beneficio y confirmar la donación destinada a <strong>${refugioSeleccionado}</strong>, <u>debes mostrar los tres puntos de fidelidad en el local físico</u> de EcoPatas (Calle Bonpland 389, entre Córdoba y Bonpland, Puerto Iguazú).`;
                }
            }
        } else {
            alertBox.classList.add('hidden');
        }
    }
}

function guardarFidelidad() {
    try {
        localStorage.setItem(STORAGE_KEY_FIDELIDAD_PUNTOS, puntosFidelidad.toString());
        localStorage.setItem(STORAGE_KEY_FIDELIDAD_REFUGIO, refugioSeleccionado);
    } catch (e) {
        console.warn('No se pudo guardar la fidelidad en localStorage:', e);
    }
}

function reiniciarCartelito() {
    let mensajeConfirm = '¿Deseas reiniciar tu cartelito de fidelidad para comenzar un nuevo ciclo de compras?';
    if (idiomaActual === 'en') {
        mensajeConfirm = 'Do you want to reset your loyalty card to start a new purchase cycle?';
    } else if (idiomaActual === 'pt') {
        mensajeConfirm = 'Deseja reiniciar seu cartão de fidelidade para iniciar um novo ciclo de compras?';
    }

    if (confirm(mensajeConfirm)) {
        puntosFidelidad = 0;
        guardarFidelidad();
        actualizarVistaFidelidad();
    }
}

/* ============================================================================
   5. SECCIÓN PRIVADA: PANEL DE ADMINISTRACIÓN Y COSTOS (CLAVE 4800)
   ============================================================================ */
const ADMIN_PASSWORD = "4800";
const STORAGE_KEY_COSTOS = "ecopatas_costos_financieros_v2";
const SESSION_KEY_AUTH = "ecopatas_admin_sesion_activa";

const VALORES_DEFECTO_COSTOS = {
    cfEspacio: 25000,
    cfServicios: 12000,
    cfHerramientas: 8000,
    cfPublicidad: 5000,
    cvHilos: 950,
    cvLimpieza: 800,
    cvPintura: 650,
    cvEtiquetas: 350,
    paramUnidades: 20,
    paramPrecio: 7000
};

function initAdminSection() {
    const sesionActiva = sessionStorage.getItem(SESSION_KEY_AUTH) === "true";
    if (sesionActiva) {
        mostrarDashboardAdmin();
    }

    cargarDatosCostos();

    const inputsCostos = document.querySelectorAll('.cost-input');
    inputsCostos.forEach(input => {
        input.addEventListener('input', () => {
            calcularModeloCostos();
            guardarDatosCostos();
        });
    });

    calcularModeloCostos();
}

function validarClaveAdmin(event) {
    if (event) event.preventDefault();

    const passInput = document.getElementById('admin-pass');
    const errorMsg = document.getElementById('auth-error-msg');

    if (!passInput) return;

    const claveIngresada = passInput.value.trim();

    if (claveIngresada === ADMIN_PASSWORD) {
        if (errorMsg) errorMsg.textContent = '';
        passInput.classList.remove('shake');
        sessionStorage.setItem(SESSION_KEY_AUTH, "true");
        passInput.value = '';
        mostrarDashboardAdmin();
    } else {
        if (errorMsg) {
            if (idiomaActual === 'en') {
                errorMsg.textContent = '❌ Incorrect password. Please try again.';
            } else if (idiomaActual === 'pt') {
                errorMsg.textContent = '❌ Senha incorreta. Tente novamente.';
            } else {
                errorMsg.textContent = '❌ Contraseña incorrecta. Inténtalo nuevamente.';
            }
        }
        passInput.classList.remove('shake');
        void passInput.offsetWidth;
        passInput.classList.add('shake');
        passInput.focus();
    }
}

function togglePasswordVisibility() {
    const passInput = document.getElementById('admin-pass');
    if (!passInput) return;

    if (passInput.type === 'password') {
        passInput.type = 'text';
    } else {
        passInput.type = 'password';
    }
}

function mostrarDashboardAdmin() {
    const loginCard = document.getElementById('admin-login-card');
    const dashboard = document.getElementById('admin-dashboard');

    if (loginCard) loginCard.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');

    calcularModeloCostos();
}

function cerrarSesionAdmin() {
    sessionStorage.removeItem(SESSION_KEY_AUTH);
    const loginCard = document.getElementById('admin-login-card');
    const dashboard = document.getElementById('admin-dashboard');
    const errorMsg = document.getElementById('auth-error-msg');

    if (dashboard) dashboard.classList.add('hidden');
    if (loginCard) loginCard.classList.remove('hidden');
    if (errorMsg) errorMsg.textContent = '';

    document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth' });
}

function calcularModeloCostos() {
    const cfEspacio = parseFloat(document.getElementById('cf-espacio')?.value) || 0;
    const cfServicios = parseFloat(document.getElementById('cf-servicios')?.value) || 0;
    const cfHerramientas = parseFloat(document.getElementById('cf-herramientas')?.value) || 0;
    const cfPublicidad = parseFloat(document.getElementById('cf-publicidad')?.value) || 0;

    const totalCF = cfEspacio + cfServicios + cfHerramientas + cfPublicidad;

    const cvHilos = parseFloat(document.getElementById('cv-hilos')?.value) || 0;
    const cvLimpieza = parseFloat(document.getElementById('cv-limpieza')?.value) || 0;
    const cvPintura = parseFloat(document.getElementById('cv-pintura')?.value) || 0;
    const cvEtiquetas = parseFloat(document.getElementById('cv-etiquetas')?.value) || 0;

    const totalCVu = cvHilos + cvLimpieza + cvPintura + cvEtiquetas;

    const unidades = Math.max(1, parseInt(document.getElementById('param-unidades')?.value, 10) || 1);
    const precioVenta = Math.max(0, parseFloat(document.getElementById('param-precio')?.value) || 0);

    const totalCV = totalCVu * unidades;
    const costoTotal = totalCF + totalCV;
    const costoUnitario = costoTotal / unidades;
    const margenContribucionUnitario = precioVenta - totalCVu;

    let puntoEquilibrio = 0;
    if (margenContribucionUnitario > 0) {
        puntoEquilibrio = Math.ceil(totalCF / margenContribucionUnitario);
    } else {
        puntoEquilibrio = Infinity;
    }

    const ingresosTotales = precioVenta * unidades;
    const gananciaNeta = ingresosTotales - costoTotal;
    const margenPorcentual = ingresosTotales > 0 ? ((gananciaNeta / ingresosTotales) * 100) : 0;

    renderizarResultadosFinancieros({
        totalCF,
        totalCVu,
        costoTotal,
        costoUnitario,
        margenContribucionUnitario,
        puntoEquilibrio,
        ingresosTotales,
        gananciaNeta,
        margenPorcentual,
        unidades,
        precioVenta
    });
}

function renderizarResultadosFinancieros(data) {
    const elSubtotalCF = document.getElementById('display-total-cf');
    const elSubtotalCV = document.getElementById('display-total-cv-unit');
    if (elSubtotalCF) elSubtotalCF.textContent = formatearMoneda(data.totalCF);
    if (elSubtotalCV) elSubtotalCV.textContent = formatearMoneda(data.totalCVu);

    actualizarTexto('res-costo-total', formatearMoneda(data.costoTotal));
    actualizarTexto('res-costo-unitario', formatearMoneda(data.costoUnitario));
    actualizarTexto('res-margen-contribucion', formatearMoneda(data.margenContribucionUnitario));
    actualizarTexto('res-ingresos-totales', formatearMoneda(data.ingresosTotales));
    actualizarTexto('res-ganancia-neta', formatearMoneda(data.gananciaNeta));
    actualizarTexto('res-margen-porcentual', `${formatearNumero(data.margenPorcentual, 1)} %`);

    const elPE = document.getElementById('res-punto-equilibrio');
    if (elPE) {
        if (isFinite(data.puntoEquilibrio)) {
            elPE.textContent = data.puntoEquilibrio;
        } else {
            elPE.textContent = idiomaActual === 'en' ? 'Unreachable' : (idiomaActual === 'pt' ? 'Inalcançável' : 'Inalcanzable');
        }
    }

    const elViabilidad = document.getElementById('status-viabilidad');
    const elViabilidadTitulo = document.getElementById('viabilidad-title');
    const elViabilidadDesc = document.getElementById('viabilidad-desc');

    if (elViabilidad && elViabilidadTitulo && elViabilidadDesc) {
        if (data.margenContribucionUnitario <= 0) {
            elViabilidad.className = 'status-viabilidad deficit';
            if (idiomaActual === 'en') {
                elViabilidadTitulo.textContent = '⚠️ Warning: Insufficient Price';
                elViabilidadDesc.textContent = `The selling price (${formatearMoneda(data.precioVenta)}) does not cover unit variable cost (${formatearMoneda(data.totalCVu)}). Every unit sold generates a direct loss.`;
            } else if (idiomaActual === 'pt') {
                elViabilidadTitulo.textContent = '⚠️ Alerta de Preço Insuficiente';
                elViabilidadDesc.textContent = `O preço de venda (${formatearMoneda(data.precioVenta)}) não cobre o custo variável unitário (${formatearMoneda(data.totalCVu)}). Cada unidade vendida gera prejuízo direto.`;
            } else {
                elViabilidadTitulo.textContent = '⚠️ Alerta de Precio Insuficiente';
                elViabilidadDesc.textContent = `El precio de venta (${formatearMoneda(data.precioVenta)}) no cubre ni el costo variable unitario (${formatearMoneda(data.totalCVu)}). Cada unidad vendida genera pérdidas directas.`;
            }
        } else if (data.unidades < data.puntoEquilibrio) {
            elViabilidad.className = 'status-viabilidad deficit';
            const faltantes = data.puntoEquilibrio - data.unidades;
            if (idiomaActual === 'en') {
                elViabilidadTitulo.textContent = '⚠️ Operating Below Break-Even Point';
                elViabilidadDesc.textContent = `Projecting ${data.unidades} units, but at least ${data.puntoEquilibrio} units are required to cover fixed costs. ${faltantes} more units needed to avoid losses.`;
            } else if (idiomaActual === 'pt') {
                elViabilidadTitulo.textContent = '⚠️ Operando Abaixo do Ponto de Equilíbrio';
                elViabilidadDesc.textContent = `Projetam-se ${data.unidades} unidades, mas são necessárias pelo menos ${data.puntoEquilibrio} unidades para cobrir os custos fixos. Faltam ${faltantes} unidades para evitar prejuízos.`;
            } else {
                elViabilidadTitulo.textContent = '⚠️ Operando por Debajo del Punto de Equilibrio';
                elViabilidadDesc.textContent = `Se proyectan ${data.unidades} unidades, pero se requieren al menos ${data.puntoEquilibrio} unidades para cubrir los costos fijos. Faltan ${faltantes} unidades para no registrar pérdidas.`;
            }
        } else {
            elViabilidad.className = 'status-viabilidad viable';
            const margenSeguridad = data.unidades - data.puntoEquilibrio;
            if (idiomaActual === 'en') {
                elViabilidadTitulo.textContent = '✅ Profitable Venture';
                elViabilidadDesc.textContent = `Production of ${data.unidades} units exceeds the break-even point (${data.puntoEquilibrio} units), with a safety margin of +${margenSeguridad} units and ${formatearNumero(data.margenPorcentual, 1)}% profit margin.`;
            } else if (idiomaActual === 'pt') {
                elViabilidadTitulo.textContent = '✅ Empreendimento Rentável';
                elViabilidadDesc.textContent = `A produção de ${data.unidades} unidades supera o ponto de equilíbrio (${data.puntoEquilibrio} unidades), com margem de segurança de +${margenSeguridad} unidades e ${formatearNumero(data.margenPorcentual, 1)}% de retorno.`;
            } else {
                elViabilidadTitulo.textContent = '✅ Emprendimiento Rentable';
                elViabilidadDesc.textContent = `La producción de ${data.unidades} unidades supera el punto de equilibrio (${data.puntoEquilibrio} unidades), con un margen de seguridad de +${margenSeguridad} unidades y ${formatearNumero(data.margenPorcentual, 1)}% de rendimiento.`;
            }
        }
    }
}

function guardarDatosCostos() {
    const datosParaGuardar = {
        cfEspacio: document.getElementById('cf-espacio')?.value,
        cfServicios: document.getElementById('cf-servicios')?.value,
        cfHerramientas: document.getElementById('cf-herramientas')?.value,
        cfPublicidad: document.getElementById('cf-publicidad')?.value,
        cvHilos: document.getElementById('cv-hilos')?.value,
        cvLimpieza: document.getElementById('cv-limpieza')?.value,
        cvPintura: document.getElementById('cv-pintura')?.value,
        cvEtiquetas: document.getElementById('cv-etiquetas')?.value,
        paramUnidades: document.getElementById('param-unidades')?.value,
        paramPrecio: document.getElementById('param-precio')?.value
    };

    try {
        localStorage.setItem(STORAGE_KEY_COSTOS, JSON.stringify(datosParaGuardar));
    } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
    }
}

function cargarDatosCostos() {
    let datos = VALORES_DEFECTO_COSTOS;

    try {
        const guardados = localStorage.getItem(STORAGE_KEY_COSTOS);
        if (guardados) {
            datos = { ...VALORES_DEFECTO_COSTOS, ...JSON.parse(guardados) };
        }
    } catch (e) {
        console.warn('Error al leer de localStorage, usando valores por defecto:', e);
    }

    asignarValorInput('cf-espacio', datos.cfEspacio);
    asignarValorInput('cf-servicios', datos.cfServicios);
    asignarValorInput('cf-herramientas', datos.cfHerramientas);
    asignarValorInput('cf-publicidad', datos.cfPublicidad);
    asignarValorInput('cv-hilos', datos.cvHilos);
    asignarValorInput('cv-limpieza', datos.cvLimpieza);
    asignarValorInput('cv-pintura', datos.cvPintura);
    asignarValorInput('cv-etiquetas', datos.cvEtiquetas);
    asignarValorInput('param-unidades', datos.paramUnidades);
    asignarValorInput('param-precio', datos.paramPrecio);
}

function restablecerCostosSugeridos() {
    let mensajeConfirm = '¿Deseas restablecer los valores del costeo a los parámetros sugeridos del microemprendimiento?';
    if (idiomaActual === 'en') {
        mensajeConfirm = 'Do you want to reset the costing values to the suggested microenterprise parameters?';
    } else if (idiomaActual === 'pt') {
        mensajeConfirm = 'Deseja restaurar os valores de custos para os parâmetros sugeridos do microempreendimento?';
    }

    if (confirm(mensajeConfirm)) {
        localStorage.removeItem(STORAGE_KEY_COSTOS);
        cargarDatosCostos();
        calcularModeloCostos();
    }
}

/* ============================================================================
   6. FORMULARIO DE CONTACTO Y DONACIONES
   ============================================================================ */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const btnVerImpacto = document.querySelectorAll('a[data-product]');
    btnVerImpacto.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prod = btn.getAttribute('data-product');
            if (prod === 'camita') cargarPreset(1, 0);
            if (prod === 'ropita') cargarPreset(0, 2);
        });
    });
}

function enviarMensajeContacto(event) {
    event.preventDefault();

    const nombre = document.getElementById('contacto-nombre')?.value || 'Amigo de EcoPatas';
    const feedback = document.getElementById('contact-feedback');
    const form = document.getElementById('contact-form');

    if (feedback) {
        feedback.className = 'contact-feedback success';
        if (idiomaActual === 'en') {
            feedback.innerHTML = `🐾 Thank you very much, <strong>${nombre}</strong>! Your message has been received by the EcoPatas team in Puerto Iguazú. We will get back to you promptly.`;
        } else if (idiomaActual === 'pt') {
            feedback.innerHTML = `🐾 Muito obrigado(a), <strong>${nombre}</strong>! Sua mensagem foi recebida pela equipe EcoPatas em Puerto Iguazú. Responderemos o quanto antes.`;
        } else {
            feedback.innerHTML = `🐾 ¡Muchas gracias, <strong>${nombre}</strong>! Tu mensaje ha sido recibido por el equipo de EcoPatas en Puerto Iguazú. Te responderemos a la brevedad.`;
        }
        feedback.classList.remove('hidden');

        if (form) form.reset();

        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 6000);
    }
}

/* ============================================================================
   7. FUNCIONES UTILITARIAS DE FORMATEO Y DOM
   ============================================================================ */
function formatearNumero(num, decimales = 0) {
    if (isNaN(num)) return '0';
    const localeMap = {
        es: 'es-AR',
        en: 'en-US',
        pt: 'pt-BR'
    };
    return Number(num).toLocaleString(localeMap[idiomaActual] || 'es-AR', {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    });
}

function formatearMoneda(monto) {
    if (isNaN(monto)) return '$ 0,00';
    const localeMap = {
        es: 'es-AR',
        en: 'en-US',
        pt: 'pt-BR'
    };
    return `$ ${Number(monto).toLocaleString(localeMap[idiomaActual] || 'es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function actualizarTexto(elementId, texto) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = texto;
}

function asignarValorInput(elementId, valor) {
    const el = document.getElementById(elementId);
    if (el && valor !== undefined) el.value = valor;
}
