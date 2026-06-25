import { useState } from "react";
import Sidebar from "./Sidebar";
import BlockRenderer from "./BlockRenderer";
import SectionHeader from "./SectionHeader";
import Navigation from "./Navigation";
import styles from "../styles/home.module.css"

const sections = [
  {
    id: "intro",
    number: "01",
    title: "¿Qué es una red?",
    color: "#00d4ff",
    content: [
      {
        type: "callout",
        text: "Mito: Una red es un conjunto de computadoras conectadas por cables.",
      },
      {
        type: "definition",
        term: "Red (definición correcta)",
        text: "Sistema distribuido de comunicación donde el hardware, el medio físico y los protocolos trabajan de forma coordinada para garantizar la entrega confiable de datos.",
      },
      {
        type: "subtitle", text: "Tres pilares estructurales"
      },
      {
        type: "table",
        headers: ["Componente", "Rol principal", "Analogía"],
        rows: [
          ["Dispositivos de red", "Generar, consumir o dirigir datos", "Actores de una obra de teatro"],
          ["Medios de transmisión", "Transportar señales", "El escenario y los canales"],
          ["Protocolos de comunicación", "Definir las reglas de comunicación", "El idioma compartido"],
        ],
      },
    ],
  },
  {
    id: "dispositivos",
    number: "02",
    title: "Dispositivos de red",
    color: "#ff6b35",
    content: [
      {
        type: "subtitle", text: "Dispositivos Finales"
      },
      {
        type: "text",
        text: "Son el origen o destino de los datos. Interactúan directamente con las aplicaciones.",
      },
      {
        type: "list",
        items: [
          "Clientes: solicitan recursos (navegadores, apps móviles, CLI)",
          "Servidores: proveen recursos (web server, base de datos, API REST)",
          "Dispositivos IoT: sensores y actuadores (termostatos, cámaras)",
          "Contenedores / VMs: hosts virtualizados (Docker, instancias EC2)",
        ],
      },
      {
        type: "subtitle", text: "Modelos de comunicación"
      },
      {
        type: "table",
        headers: ["Modelo", "Descripción", "Ejemplo"],
        rows: [
          ["Cliente–Servidor", "Cliente inicia, servidor responde. Roles asimétricos y estables.", "HTTP, SQL"],
          ["Peer-to-Peer (P2P)", "Cada nodo actúa como cliente y servidor. Roles simétricos y dinámicos.", "Blockchain, WebRTC, BitTorrent"],
        ],
      },
      {
        type: "subtitle", text: "Dispositivos Intermedios"
      },
      {
        type: "text",
        text: "Gestionan el flujo de datos. No generan ni consumen datos de aplicación; solo operan sobre cabeceras.",
      },
      {
        type: "table",
        headers: ["Dispositivo", "Capa OSI", "Función principal"],
        rows: [
          ["Access Point", "Capa 1–2", "Puente entre red inalámbrica y cableada"],
          ["Switch", "Capa 2", "Conmutación por direcciones MAC dentro de una LAN"],
          ["Router", "Capa 3", "Enrutamiento por direcciones IP entre redes"],
          ["Firewall", "Capa 3–7", "Filtrado e inspección de tráfico según reglas de seguridad"],
          ["Gateway", "Capa 3–7", "Interconexión o traducción entre redes y protocolos distintos"],
          ["Balanceador de carga", "Capa 4–7", "Distribución de tráfico entre múltiples servidores"],
        ],
      },
    ],
  },
  {
    id: "switch-router",
    number: "03",
    title: "Switch y Router en detalle",
    color: "#a855f7",
    content: [
      {
        type: "subtitle", text: "Switch"
      },
      {
        type: "text",
        text: "Corazón de cualquier red local. Recibe una trama Ethernet y la reenvía únicamente al puerto del destinatario correcto.",
      },
      {
        type: "subtitle", text: "Proceso de la tabla CAM"
      },
      {
        type: "steps",
        items: [
          "Lee la dirección MAC de origen de la trama entrante.",
          "Registra esa MAC con el número de puerto en la tabla CAM.",
          "Consulta la MAC de destino en la tabla CAM.",
          "Si la encuentra → Unicast Forwarding (reenvío solo a ese puerto).",
          "Si no la encuentra → Flooding (Broadcasting a todos los puertos, excepto el de origen).",
        ],
      },
      {
        type: "callout",
        text: "TTL en tabla CAM: por defecto 300 segundos. Si un dispositivo no envía tráfico en ese tiempo, su entrada expira y se vuelve a aprender. Esto es fundamental para entender ataques como MAC Flooding.",
      },
      {
        type: "subtitle", text: "Conceptos clave del switch"
      },
      {
        type: "list",
        items: [
          "VLAN: segmentación lógica de una red física en múltiples redes virtuales independientes sobre el mismo switch.",
          "STP (Spanning Tree Protocol): evita bucles en topologías redundantes calculando un árbol de expansión sin ciclos.",
          "Link Aggregation: agrupa múltiples puertos físicos en un canal lógico para mayor ancho de banda.",
          "Port Mirroring (SPAN): replica el tráfico de un puerto hacia otro para análisis y monitoreo.",
        ],
      },
      {
        type: "subtitle", text: "Diferencias Switch vs Router"
      },
      {
        type: "table",
        headers: ["Aspecto", "Switch", "Router"],
        rows: [
          ["Capa OSI", "Capa 2", "Capa 3"],
          ["Identificador", "Dirección MAC (48 bits)", "Dirección IP (32–128 bits)"],
          ["Ámbito", "Dentro de una LAN", "Entre redes distintas"],
          ["Tabla de decisión", "Tabla CAM (MACs)", "Tabla de enrutamiento (IPs)"],
          ["Modifica cabeceras", "No", "Sí (decrementa TTL, modifica cabeceras)"],
        ],
      },
      {
        type: "subtitle", text: "Tabla de enrutamiento (Router)"
      },
      {
        type: "list",
        items: [
          "Red destino: notación CIDR (ej: 192.168.1.0/24)",
          "Máscara de red: define el alcance de la red",
          "Next Hop / Gateway: IP del siguiente salto",
          "Interfaz de salida: interfaz física a usar",
          "Métrica: costo de la ruta (menor = mejor)",
          "Origen: estática, OSPF, BGP, EIGRP, etc.",
        ],
      },
      {
        type: "subtitle", text: "Protocolos de enrutamiento dinámico"
      },
      {
        type: "table",
        headers: ["Protocolo", "Tipo", "Uso típico"],
        rows: [
          ["RIPv2", "Distance Vector", "Redes pequeñas (≤ 15 saltos)"],
          ["OSPF", "Link State", "Redes empresariales grandes"],
          ["BGP", "Path Vector", "Enrutamiento en Internet (global)"],
          ["EIGRP", "Híbrido (Cisco)", "Redes medianas a grandes (propietario)"],
        ],
      },
      {
        type: "callout",
        text: "Internet está compuesto de más de 70.000 sistemas autónomos interconectados por BGP (Border Gateway Protocol). Una mala configuración puede dejar sin conectividad a millones de usuarios en segundos.",
      },
    ],
  },
  {
    id: "medios",
    number: "04",
    title: "Medios de transmisión",
    color: "#10b981",
    content: [
      {
        type: "subtitle", text: "Medios Guiados (señal por canal físico)"
      },
      {
        type: "table",
        headers: ["Medio", "Señal", "Velocidad máx.", "Distancia máx.", "Uso típico"],
        rows: [
          ["UTP Cat 6", "Eléctrica diferencial", "100 Gbps", "100 m", "Redes LAN empresariales"],
          ["UTP Cat 5e", "Eléctrica diferencial", "1 Gbps", "100 m", "Oficinas y hogares"],
          ["Cable coaxial", "Eléctrica (RSS)", "500 Mbps – 10 Gbps", "500 m", "Redes de cable (ISP)"],
          ["Fibra óptica monomodo", "Luz láser", "> 100 Gbps", "> 80 km", "Backbone / larga distancia"],
          ["Fibra óptica multimodo", "LED / VCSEL", "10–100 Gbps", "2 km", "Conexiones ISP locales"],
        ],
      },
      {
        type: "subtitle", text: "Medios No Guiados (señal por el espacio)"
      },
      {
        type: "table",
        headers: ["Tecnología", "Frecuencia", "Alcance", "Uso típico"],
        rows: [
          ["WiFi (802.11)", "2.4 / 5 / 6 GHz", "Variable", "Hogares y empresas"],
          ["Bluetooth", "2.4 GHz", "10–400 m", "IoT, periféricos"],
          ["4G / 5G", "700 MHz – 100 GHz", "Kilómetros", "Telefonía móvil"],
          ["Satélite (Starlink)", "Global", "Global", "Zonas rurales / global"],
          ["Microondas", "~40 GHz", "~50 km", "Enlace punto a punto"],
        ],
      },
      {
        type: "subtitle", text: "Estándares WiFi"
      },
      {
        type: "table",
        headers: ["Nombre comercial", "Estándar", "Frecuencia", "Velocidad teórica máx."],
        rows: [
          ["WiFi 4", "802.11n", "2.4 / 5 GHz", "600 Mbps"],
          ["WiFi 5", "802.11ac", "5 GHz", "3.5 Gbps"],
          ["WiFi 6 / 6E", "802.11ax", "2.4 / 5 / 6 GHz", "9.6 Gbps"],
          ["WiFi 7", "802.11be", "2.4 / 5 / 6 GHz", "46 Gbps"],
        ],
      },
      {
        type: "subtitle", text: "Factores para elegir un medio"
      },
      {
        type: "list",
        items: [
          "Ancho de banda: ¿cuántos datos por segundo necesito transmitir?",
          "Distancia: ¿qué tan lejos deben llegar los datos sin degradarse?",
          "Interferencia electromagnética: ¿hay motores, electricidad u otras fuentes de ruido?",
          "Seguridad física: ¿puede alguien interceptar la señal?",
          "Costo: instalación y mantenimiento (UTP barato, fibra cara pero duradera).",
        ],
      },
    ],
  },
  {
    id: "protocolos",
    number: "05",
    title: "Protocolos de comunicación",
    color: "#f59e0b",
    content: [
      {
        type: "definition",
        term: "Protocolo",
        text: "Conjunto formal de reglas y convenciones que permite que dos o más entidades intercambien información de manera confiable e interoperable.",
      },
      {
        type: "subtitle", text: "Qué define un protocolo"
      },
      {
        type: "list",
        items: [
          "Sintaxis: estructura y formato de los mensajes (longitud de campos, tipo de dato).",
          "Semántica: significado de cada campo y acciones que desencadenan.",
          "Temporización: cuándo y a qué velocidad se envían los mensajes.",
          "Control de errores: cómo detectar y recuperar errores en la transmisión.",
          "Control de flujo: cómo evitar que el emisor desborde al receptor.",
        ],
      },
      {
        type: "subtitle", text: "Dos modelos de referencia"
      },
      {
        type: "table",
        headers: ["Aspecto", "Modelo OSI", "Modelo TCP/IP"],
        rows: [
          ["Organismo", "ISO (1984)", "ARPANET (1974)"],
          ["Capas", "7 capas", "4–5 capas"],
          ["Uso actual", "Marco conceptual / diagnóstico", "Implementación real en Internet"],
          ["Granularidad", "Alta (más detallado)", "Menor (capas unificadas)"],
          ["Fortaleza", "Didáctico, ideal para aprender", "Pragmático, usado en el mundo real"],
        ],
      },
    ],
  },
  {
    id: "osi",
    number: "06",
    title: "Modelo OSI (7 capas)",
    color: "#ec4899",
    content: [
      {
        type: "text",
        text: "Cada capa maneja una responsabilidad específica e independiente. Se comunica únicamente con las capas adyacentes.",
      },
      {
        type: "table",
        headers: ["#", "Capa", "Unidad de datos", "Función", "Ejemplos"],
        rows: [
          ["7", "Aplicación", "Datos / Mensaje", "Interfaz con aplicaciones de usuario", "HTTP, DNS, SMTP, SSH, FTP"],
          ["6", "Presentación", "Datos / Mensaje", "Codificación, cifrado y compresión", "TLS/SSL, JPEG, MPEG, ASCII, UTF-8"],
          ["5", "Sesión", "Datos / Mensaje", "Establecimiento y control de sesiones", "RPC, SQL Session, NetBIOS"],
          ["4", "Transporte", "Segmento / Datagrama", "Entrega extremo a extremo, control de flujo", "TCP, UDP, QUIC"],
          ["3", "Red", "Paquete", "Direccionamiento lógico y enrutamiento", "IP, ICMP, Router"],
          ["2", "Enlace de datos", "Trama", "Acceso al medio, detección de errores", "Ethernet, WiFi, Switch, ARP"],
          ["1", "Física", "Bits / Símbolos", "Transmisión de señales en el medio físico", "Cables, fibra, WiFi, hubs"],
        ],
      },
      {
        type: "subtitle", text: "Estructura de trama Ethernet (Capa 2)"
      },
      {
        type: "list",
        items: [
          "Preámbulo: 8 bytes (sincronización)",
          "MAC Destino: 6 bytes",
          "MAC Origen: 6 bytes",
          "EtherType: 2 bytes (indica protocolo de capa 3: IPv4, IPv6, ARP)",
          "Payload: datos",
          "FCS (Frame Check Sequence): 4 bytes (detección de errores)",
        ],
      },
      {
        type: "subtitle", text: "TCP vs UDP (Capa 4)"
      },
      {
        type: "table",
        headers: ["Característica", "TCP", "UDP"],
        rows: [
          ["Orientado a conexión", "Sí (3-way handshake)", "No"],
          ["Control de flujo", "Sí", "No"],
          ["Control de congestión", "Sí", "No"],
          ["Ordenamiento de datos", "Sí", "No"],
          ["Overhead", "Alto", "Mínimo"],
          ["Uso típico", "HTTP, SMTP, SSH, FTP", "DNS, VoIP, streaming, video"],
        ],
      },
      {
        type: "callout",
        text: "3-Way Handshake TCP: (1) Cliente → SYN → Servidor | (2) Servidor → SYN-ACK → Cliente | (3) Cliente → ACK → Servidor. Luego comienza la transferencia de datos.",
      },
      {
        type: "subtitle", text: "TTL en capa de red (IP)"
      },
      {
        type: "text",
        text: "Cada router que reenvía un paquete decrementa el TTL en 1. Si llega a 0, el router descarta el paquete y envía un mensaje ICMP 'Time Exceeded' al origen. Esto es lo que usa el comando traceroute para mapear la ruta.",
      },
    ],
  },
  {
    id: "encapsulacion",
    number: "07",
    title: "Encapsulación y Desencapsulación",
    color: "#06b6d4",
    content: [
      {
        type: "definition",
        term: "Encapsulación",
        text: "Proceso por el cual cada capa agrega su propia cabecera (y en algunos casos tráiler) a los datos recibidos de la capa superior. Va de capa 7 → capa 1.",
      },
      {
        type: "definition",
        term: "Desencapsulación",
        text: "Proceso inverso: al recibir datos, el dispositivo va subiendo por las capas quitando cada cabecera y pasando los datos a la capa superior. Va de capa 1 → capa 7.",
      },
      {
        type: "subtitle", text: "Flujo de encapsulación (ejemplo: HTTP)"
      },
      {
        type: "steps",
        items: [
          "Capa 7 – Aplicación: se genera el mensaje HTTP (ej: GET /index.html).",
          "Capa 4 – Transporte: se agrega cabecera TCP con puerto origen y destino (ej: puerto 443). → Segmento TCP.",
          "Capa 3 – Red: se agrega cabecera IP con IP origen e IP destino. → Paquete IP.",
          "Capa 2 – Enlace: se agrega cabecera Ethernet con MAC origen y MAC destino. → Trama Ethernet.",
          "Capa 1 – Física: se transmite como bits (pulsos eléctricos, luz o señal inalámbrica).",
        ],
      },
      {
        type: "callout",
        text: "Un router desencapsula hasta capa 3, toma la decisión de enrutamiento, y vuelve a encapsular con nuevas cabeceras de capa 2 para el siguiente salto.",
      },
      {
        type: "subtitle", text: "Diagnóstico usando el modelo OSI (de abajo hacia arriba)"
      },
      {
        type: "steps",
        items: [
          "Capa 1 – Física: ¿Tenés conexión? ¿El cable está conectado? ¿Hay señal WiFi?",
          "Capa 2 – Enlace: ¿Los datos llegan sin errores? ¿Hay interferencia o degradación?",
          "Capa 3 – Red: ¿Tenés IP asignada? ¿Podés hacer ping al gateway?",
          "Capa 4 – Transporte: ¿La petición llega al servidor? ¿El puerto está abierto?",
          "Capas 5–7 – Sesión/Presentación/Aplicación: ¿El servicio responde? ¿Hay error HTTP? ¿La URL es correcta?",
        ],
      },
    ],
  },
  {
    id: "firewall",
    number: "08",
    title: "Firewalls y Seguridad",
    color: "#ef4444",
    content: [
      {
        type: "definition",
        term: "Firewall",
        text: "Sistema de seguridad que inspecciona el tráfico de red y aplica políticas para permitir o bloquear comunicaciones según reglas predeterminadas. Es el guardián del perímetro de una red.",
      },
      {
        type: "subtitle", text: "Generaciones de Firewalls"
      },
      {
        type: "table",
        headers: ["Generación", "Nombre", "Mecanismo de inspección", "Limitación"],
        rows: [
          ["1°", "Packet Filtering", "Analiza cabeceras IP/TCP/UDP (src, dst, puerto)", "Sin estado; fácil de evadir"],
          ["2°", "Stateful Firewall", "Rastrea estado de conexiones TCP", "No inspecciona el payload"],
          ["3°", "Application Firewall", "Inspecciona protocolos HTTP, DNS, FTP, etc.", "Alto costo computacional"],
          ["4°", "Next-Gen Firewall (NGFW)", "TLS inspection + Zero Trust + identidad de usuario", "Requiere hardware muy potente"],
        ],
      },
      {
        type: "subtitle", text: "Arquitecturas de Firewall"
      },
      {
        type: "list",
        items: [
          "Inline: único punto de entrada/salida. Máximo control, único punto de falla.",
          "DMZ (Zona Desmilitarizada): red intermedia entre Internet y la red interna. Aísla servidores públicos (web, mail).",
          "Micro-segmentación: firewalls entre segmentos internos. Limita el movimiento lateral de atacantes.",
        ],
      },
      {
        type: "callout",
        text: "Zero Trust: modelo que asume que ningún dispositivo o usuario es confiable por defecto, sin importar si está dentro o fuera del perímetro. Requiere verificación continua de identidad y contexto.",
      },
    ],
  },
  {
    id: "ipv4",
    number: "09",
    title: "IP versión 4 – Fundamentos",
    color: "#84cc16",
    content: [
      {
        type: "definition",
        term: "Dirección IPv4",
        text: "Identificador lógico de 32 bits asignado a una interfaz de red. Se escribe en notación decimal punteada: cuatro grupos (octetos) de 8 bits separados por puntos.",
      },
      {
        type: "subtitle", text: "Estructura de un octeto"
      },
      {
        type: "text",
        text: "Cada octeto tiene 8 bits con pesos: 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1. El valor mínimo es 0 (00000000) y el máximo es 255 (11111111). Por eso cada grupo va de 0 a 255.",
      },
      {
        type: "callout",
        text: "¿Por qué 255 y no 256? Porque 2⁸ = 256 valores posibles, pero se cuenta desde el 0, entonces el máximo es 255.",
      },
      {
        type: "subtitle", text: "Ejemplo de conversión"
      },
      {
        type: "table",
        headers: ["Decimal", "Binario"],
        rows: [
          ["192", "11000000"],
          ["168", "10101000"],
          ["1", "00000001"],
          ["100", "01100100"],
        ],
      },
      {
        type: "subtitle", text: "Capacidad total de IPv4"
      },
      {
        type: "text",
        text: "Total de direcciones posibles: 2³² = 4.300 millones aprox. El espacio de IPv4 se agotó formalmente entre 2011 y 2019 según la región.",
      },
      {
        type: "subtitle", text: "Dos partes de una dirección IP"
      },
      {
        type: "table",
        headers: ["Parte", "Qué identifica", "Analogía"],
        rows: [
          ["Porción de red", "A qué red pertenece el dispositivo", "Código postal de la ciudad"],
          ["Porción de host", "Dispositivo específico dentro de la red", "Número de la casa"],
        ],
      },
      {
        type: "text",
        text: "La máscara de subred define dónde termina la parte de red y dónde empieza la parte de host. En binario: los 1s = red, los 0s = host.",
      },
    ],
  },
  {
    id: "cidr",
    number: "10",
    title: "Notación CIDR y Clases",
    color: "#f97316",
    content: [
      {
        type: "definition",
        term: "Notación CIDR (barra)",
        text: "Forma compacta de expresar la máscara de subred. El número después de la barra indica cuántos bits consecutivos en 1 tiene la máscara. Ej: /24 equivale a 255.255.255.0 (tres octetos = 24 bits en 1).",
      },
      {
        type: "subtitle", text: "Tabla de prefijos comunes"
      },
      {
        type: "table",
        headers: ["Prefijo", "Máscara", "Bits de host", "Total hosts", "Hosts útiles"],
        rows: [
          ["/8", "255.0.0.0", "24", "16.777.216", "16.777.214"],
          ["/16", "255.255.0.0", "16", "65.536", "65.534"],
          ["/24", "255.255.255.0", "8", "256", "254"],
          ["/25", "255.255.255.128", "7", "128", "126"],
          ["/26", "255.255.255.192", "6", "64", "62"],
          ["/29", "255.255.255.248", "3", "8", "6"],
          ["/30", "255.255.255.252", "2", "4", "2"],
          ["/32", "255.255.255.255", "0", "1", "1 (host único)"],
        ],
      },
      {
        type: "subtitle", text: "Fórmulas fundamentales"
      },
      {
        type: "list",
        items: [
          "Total de hosts en la subred: 2^n  (donde n = 32 − prefijo)",
          "Hosts utilizables: 2^n − 2  (se restan la dirección de red y el broadcast)",
          "Máscara del último octeto (cuando el prefijo cae en él): 256 − 2^n",
        ],
      },
      {
        type: "callout",
        text: "Ejemplo /29: n = 32 − 29 = 3 → 2³ = 8 hosts totales → 6 útiles. Máscara último octeto: 256 − 8 = 248 → 255.255.255.248.",
      },
      {
        type: "subtitle", text: "Clases históricas de IPv4"
      },
      {
        type: "table",
        headers: ["Clase", "Prefijo", "Rango", "Hosts por red", "Uso típico"],
        rows: [
          ["A", "/8", "1.0.0.0 – 126.0.0.0", "~16,7 millones", "ISPs gigantes, grandes corporaciones"],
          ["B", "/16", "128.0.0.0 – 191.255.0.0", "~65.534", "Universidades, organizaciones medianas"],
          ["C", "/24", "192.0.0.0 – 223.255.255.0", "254", "Redes domésticas y pequeñas empresas"],
        ],
      },
      {
        type: "subtitle", text: "¿Cuándo usar /32?"
      },
      {
        type: "text",
        text: "Se usa para identificar un único host específico. Caso típico: reglas de firewall que deben permitir o bloquear una sola IP pública (ej: 148.22.165.X/32). También en tablas de enrutamiento para rutas host.",
      },
    ],
  },
  {
    id: "ips-especiales",
    number: "11",
    title: "IPs reservadas y privadas",
    color: "#a78bfa",
    content: [
      {
        type: "subtitle", text: "Rangos privados (RFC 1918)"
      },
      {
        type: "text",
        text: "Estas direcciones no son enrutables en Internet. Se usan únicamente en redes internas.",
      },
      {
        type: "table",
        headers: ["Rango", "Prefijo", "Clase", "Hosts disponibles", "Uso típico"],
        rows: [
          ["10.0.0.0 – 10.255.255.255", "/8", "A", "~16,7 millones", "Grandes empresas, data centers"],
          ["172.16.0.0 – 172.31.255.255", "/12", "B", "~1 millón", "Empresas medianas"],
          ["192.168.0.0 – 192.168.255.255", "/16", "C", "~65.534", "Redes domésticas y SOHO"],
        ],
      },
      {
        type: "subtitle", text: "Otras direcciones especiales"
      },
      {
        type: "table",
        headers: ["Dirección / Rango", "Propósito"],
        rows: [
          ["127.0.0.0/8 (típico: 127.0.0.1)", "Loopback: apunta a la propia máquina. Nunca sale a la red."],
          ["0.0.0.0", "Dirección de red mínima / ruta por defecto."],
          ["255.255.255.255", "Broadcast limitado: se envía a todos los dispositivos de la red local."],
          ["169.254.0.0/16", "APIPA: asignada automáticamente cuando no hay servidor DHCP."],
          ["224.0.0.0 – 239.255.255.255", "Multicast: envío a un grupo específico de dispositivos."],
        ],
      },
      {
        type: "callout",
        text: "Nunca vas a ver una IP pública que empiece con 10., 172.16–31., 192.168., o 127. Si la ves en una conexión de Internet, algo está mal con la configuración de NAT.",
      },
    ],
  },
  {
    id: "subnetting",
    number: "12",
    title: "Subnetting – Subdivisión de redes",
    color: "#fb7185",
    content: [
      {
        type: "definition",
        term: "Subnetting",
        text: "Proceso de dividir un bloque de direcciones IP más grande en bloques más pequeños (subredes) para optimizar el uso del espacio de direcciones y segmentar la red lógicamente.",
      },
      {
        type: "subtitle", text: "Metodología paso a paso"
      },
      {
        type: "steps",
        items: [
          "Identificar la dirección de red original y el prefijo.",
          "Determinar cuántas subredes se necesitan → calcular bits adicionales (log₂ de la cantidad de subredes).",
          "Calcular el nuevo prefijo: prefijo original + bits adicionales.",
          "Calcular el bloque de incremento: 256 − valor del último octeto de la máscara.",
          "Listar subredes: dirección de red, primer host, último host y broadcast de cada bloque.",
        ],
      },
      {
        type: "subtitle", text: "Ejercicio resuelto: 172.20.50.100/20"
      },
      {
        type: "steps",
        items: [
          "Bits de host: 32 − 20 = 12 → 2¹² = 4.096 hosts totales → 4.094 útiles.",
          "Máscara: los primeros 20 bits en 1 → 255.255.240.0  (tercer octeto: 256 − 16 = 240).",
          "Wildcard (bits de host): 0.0.15.255",
          "Dirección de red: 172.20.48.0  (el tercer octeto se ajusta al bloque: 48 = piso de 50 en bloques de 16).",
          "Broadcast: 172.20.63.255  (172.20.48.0 + bloque 16 − 1 = 63 en el tercer octeto, 255 en el cuarto).",
          "Primer host útil: 172.20.48.1  |  Último host útil: 172.20.63.254",
          "¿Es privada? Sí — pertenece al rango 172.16.0.0/12.",
        ],
      },
      {
        type: "callout",
        text: "Truco rápido para la máscara del octeto 'partido': valor del octeto = 256 − 2^(bits de host en ese octeto). Para /20: los últimos 12 bits de host, 4 caen en el tercer octeto → 2⁴ = 16 → 256 − 16 = 240.",
      },
      {
        type: "subtitle", text: "Direcciones reservadas en cada subred"
      },
      {
        type: "list",
        items: [
          "Primera dirección (ej: .0): dirección de red — identifica la subred, no se asigna a ningún host.",
          "Última dirección (ej: .255): broadcast — envía tráfico a todos los hosts de la subred.",
          "Primera dirección usable: dirección de red + 1 (suele asignarse al gateway/router).",
          "Última dirección usable: broadcast − 1.",
        ],
      },
    ],
  },
  {
    id: "ux-ui-intro",
    number: "13",
    title: "UX vs UI – Conceptos fundamentales",
    color: "#e879f9",
    content: [
      {
        type: "definition",
        term: "UX – User Experience",
        text: "Percepción global y respuestas emocionales/sensoriales antes, durante y después de interactuar con un producto o servicio. Disciplina amplia: investigación, estrategia, arquitectura de información, interacción, contenido y validación. No se limita a lo digital.",
      },
      {
        type: "definition",
        term: "UI – User Interface",
        text: "Capa visual e interacciones concretas a través de las cuales el usuario opera el producto. Define pantallas, componentes, tipografía, colores, iconografía, animaciones y feedback.",
      },
      {
        type: "subtitle", text: "Analogía con un auto"
      },
      {
        type: "table",
        headers: ["Concepto", "Equivalente en un auto"],
        rows: [
          ["UX", "Experiencia completa: comprar, manejar, mantener y vender el auto"],
          ["UI", "Tablero, controles, varillas e indicadores internos"],
        ],
      },
      {
        type: "callout",
        text: "Un buen tablero no salva una mala experiencia. Un auto lindo con interior mal diseñado genera frustración. Ambos son necesarios.",
      },
      {
        type: "subtitle", text: "Diferencias clave"
      },
      {
        type: "table",
        headers: ["Aspecto", "UX", "UI"],
        rows: [
          ["Pregunta central", "¿Resuelve el problema real del usuario?", "¿Se ve y siente bien al usarlo?"],
          ["Objeto de trabajo", "Experiencia completa y recorridos", "Pantallas, componentes, lo visual"],
          ["Analogía", "La película entera", "Los fotogramas individuales"],
          ["Entregables", "Personas, flujos, wireframes, informes de research", "Mockups alta fidelidad, design systems, specs"],
          ["Métricas", "Tasa de conversión, retención, NPS, SUS", "Claridad visual, consistencia, criterios cualitativos"],
          ["Disciplinas afines", "Psicología, sociología, antropología", "Diseño gráfico, tipografía, color"],
        ],
      },
      {
        type: "subtitle", text: "Wireframe vs Mockup"
      },
      {
        type: "table",
        headers: ["", "Wireframe", "Mockup"],
        rows: [
          ["Fidelidad", "Baja — boceto estructural", "Alta — diseño visual completo"],
          ["Colores / tipografía", "No", "Sí"],
          ["Propósito", "Jerarquía, funcionalidad y flujo de navegación", "Validar apariencia, simular interacciones"],
          ["Herramientas", "Papel, Draw.io, Figma básico", "Figma, Adobe XD"],
          ["Pertenece a", "UX", "UI"],
        ],
      },
      {
        type: "callout",
        text: "El wireframe se puede presentar a alguien no técnico para validar la idea antes de invertir tiempo en diseño. Si el flujo está mal en el wireframe, corregirlo en Figma ya cuesta mucho más.",
      },
    ],
  },
  {
    id: "ux-leyes",
    number: "14",
    title: "Leyes y principios de UX",
    color: "#38bdf8",
    content: [
      {
        type: "subtitle", text: "Leyes principales"
      },
      {
        type: "table",
        headers: ["Ley", "Enunciado", "Aplicación práctica"],
        rows: [
          ["Fitts", "El tiempo para alcanzar un objetivo depende de su distancia y tamaño.", "Botones primarios grandes y cercanos. Acciones peligrosas (eliminar) pequeñas y alejadas."],
          ["Hick", "El tiempo de decisión crece logarítmicamente con la cantidad de opciones.", "Menús con 4 opciones son más rápidos que con 15. Agrupar y priorizar."],
          ["Miller", "La memoria de trabajo retiene ~7 ± 2 elementos simultáneos.", "Limitar información simultánea. Usar chunking (ej: números de tarjeta en grupos de 4)."],
          ["Jakob", "Los usuarios esperan que tu sitio funcione como los que ya conocen.", "Respetar convenciones: carrito a la derecha, lupa para búsqueda, soporte abajo a la derecha."],
          ["Tesler", "Todo sistema tiene complejidad irreducible. ¿La absorbe el sistema o el usuario?", "Autocomplete, defaults inteligentes, validaciones inline. Mostrar requisitos de contraseña antes de escribir."],
        ],
      },
      {
        type: "subtitle", text: "Principios de Gestalt"
      },
      {
        type: "table",
        headers: ["Principio", "Descripción"],
        rows: [
          ["Proximidad", "Elementos cercanos se perciben como grupo."],
          ["Similitud", "Elementos con forma/color similar se agrupan perceptivamente."],
          ["Cierre", "La mente completa figuras incompletas (y también ignora las completas repetitivas)."],
          ["Continuidad", "El ojo sigue líneas y curvas naturales."],
          ["Figura-fondo", "Siempre distinguimos el objeto principal del contexto."],
        ],
      },
      {
        type: "callout",
        text: "Ejemplo real: en portales de noticias la mente ignora automáticamente los banners (cierre + figura-fondo). Los elementos que 'siempre están ahí' se vuelven invisibles para el usuario.",
      },
      {
        type: "subtitle", text: "Consistencia como regla de oro"
      },
      {
        type: "list",
        items: [
          "Acciones positivas (guardar, confirmar): siempre el mismo color y ubicación.",
          "Acciones negativas (eliminar, cancelar): siempre el mismo color y ubicación opuesta.",
          "Si en un paso 'Siguiente' está a la derecha y en el siguiente a la izquierda, el usuario se detiene y lee — se rompe la automatización.",
          "Errores, alertas y labels deben mostrarse siempre igual en toda la app.",
        ],
      },
      {
        type: "subtitle", text: "Estándares de diseño por plataforma"
      },
      {
        type: "table",
        headers: ["Plataforma", "Guía oficial"],
        rows: [
          ["Android", "Material Design (Google) — material.io"],
          ["iOS / Apple", "Human Interface Guidelines (HIG) — Apple"],
        ],
      },
      {
        type: "callout",
        text: "Estos estándares son el resultado de millones de horas de investigación. No romperlos sin una razón muy fuerte. Si lo hacés, estás compitiendo contra Google y Apple.",
      },
    ],
  },
  {
    id: "design-thinking",
    number: "15",
    title: "Design Thinking y Doble Diamante",
    color: "#fb923c",
    content: [
      {
        type: "definition",
        term: "Design Thinking",
        text: "Enfoque iterativo y no lineal para comprender a los usuarios, desafiar supuestos, redefinir problemas y crear soluciones innovadoras mediante prototipado y testeo constante.",
      },
      {
        type: "subtitle", text: "Las 5 etapas"
      },
      {
        type: "steps",
        items: [
          "Empatizar: ¿Quién es el usuario y qué está viviendo? Entrevistas, observaciones, notas. No asumir nada.",
          "Definir: Traducir lo observado al problema real. No el síntoma (impresora no conecta) sino la causa (faltan drivers). Herramientas: Problem Statement, HMW, Personas, Journey Map.",
          "Idear: ¿Qué soluciones podrían funcionar? Brainstorming, SCAMPER, priorización. El 90% de los softwares falla por resolver el problema equivocado.",
          "Prototipar: ¿Cómo se siente la solución? Wireframe (baja fidelidad) → Mockup en Figma (alta fidelidad). Rápido y desechable.",
          "Testear: ¿Funciona con usuarios reales? Figma permite emular navegación. Si más de una persona señala el mismo problema, hay que escuchar y cambiar.",
        ],
      },
      {
        type: "subtitle", text: "Doble Diamante"
      },
      {
        type: "table",
        headers: ["Rombo", "Fase", "Acción"],
        rows: [
          ["1° — Problema correcto", "Descubrir (diverge)", "Investigación, entrevistas, observaciones. Cero supuestos."],
          ["1° — Problema correcto", "Definir (converge)", "Síntesis, insights, formulación del problema real."],
          ["2° — Solución correcta", "Desarrollar (diverge)", "Prototipado rápido, alternativas, decisiones tecnológicas."],
          ["2° — Solución correcta", "Entregar (converge)", "Producir, lanzar, medir, iterar."],
        ],
      },
      {
        type: "callout",
        text: "La mayoría de los proyectos fracasan no por estar mal construidos, sino por resolver el problema equivocado. El primer rombo es el más importante y el más ignorado.",
      },
      {
        type: "subtitle", text: "4 principios del Diseño Centrado en el Usuario (ISO 9241-210)"
      },
      {
        type: "steps",
        items: [
          "Entender al usuario: quién es, qué tareas hace, en qué entorno opera. Investigar antes de suponer.",
          "Involucrar al usuario en todo el proceso: desde el punto cero, no solo al final cuando ya está desarrollado.",
          "Iterar: diseñar → prototipar → testear → refinar. Hay que estar dispuesto a cambiar y pivotear.",
          "Mirada multidisciplinaria: integrar visión de negocio, tecnología, contenido y cultura.",
        ],
      },
      {
        type: "callout",
        text: "Error frecuente: confundir al cliente con el usuario. El cliente paga y pide. El usuario usa. Son personas distintas con intereses distintos. El diseño centrado en el usuario protege al que usa, no solo al que paga.",
      },
    ],
  },
  {
    id: "ux-investigacion",
    number: "16",
    title: "Investigación UX – Métodos y herramientas",
    color: "#4ade80",
    content: [
      {
        type: "subtitle", text: "Métodos de investigación"
      },
      {
        type: "table",
        headers: ["Método", "Tipo", "Cuándo usarlo"],
        rows: [
          ["Entrevistas en profundidad", "Cualitativo – Actitudinal", "Explorar motivaciones, emociones y contexto de vida del usuario."],
          ["Observación", "Cualitativo – Comportamental", "Ver qué hace realmente el usuario en su entorno natural."],
          ["Test de usabilidad", "Cualitativo – Comportamental", "Detectar fricciones en el uso de la plataforma."],
          ["Encuestas", "Cuantitativo – Actitudinal", "Validar hipótesis con muestras amplias."],
          ["Analytics y click tracking", "Cuantitativo – Comportamental", "Entender uso masivo y cuellos de botella."],
          ["Card Sorting", "Cualitativo – Estructural", "Diseñar la arquitectura de información."],
          ["Diary Study", "Cualitativo – Longitudinal", "Capturar experiencias a lo largo del tiempo."],
        ],
      },
      {
        type: "callout",
        text: "Si querés saber POR QUÉ algo ocurre → entrevistas y observaciones. Si querés saber CUÁNTAS VECES ocurre → encuestas y analíticas. Lo ideal: combinar ambos.",
      },
      {
        type: "subtitle", text: "User Persona"
      },
      {
        type: "definition",
        term: "User Persona",
        text: "Representación ficticia pero basada en datos reales de un grupo de usuarios con comportamientos, necesidades y motivaciones similares. Sirve para tomar decisiones de diseño y comunicar al equipo quién es el usuario objetivo.",
      },
      {
        type: "list",
        items: [
          "Identidad: nombre, edad, ocupación, ubicación, foto.",
          "Biografía: historia breve de su vida y contexto.",
          "Objetivos: qué quiere lograr con el producto.",
          "Frustraciones / Dolores: obstáculos y miedos.",
          "Comportamiento digital: nivel tecnológico, dispositivos que usa.",
        ],
      },
      {
        type: "callout",
        text: "Regla de oro: si al revisar una Persona no podés decir qué entrevista o dato dio origen a cada afirmación, es ficción. Una persona sin datos detrás es un estereotipo peligroso.",
      },
      {
        type: "subtitle", text: "Mapa de Empatía"
      },
      {
        type: "text",
        text: "Herramienta visual de 6 cuadrantes para ponerse en la mente del usuario: ¿Qué piensa y siente? (preocupaciones, entusiasmo) · ¿Qué oye? (influencias del entorno) · ¿Qué ve? (mercado, competencia) · ¿Qué hace? (conductas observables) · Dolores (frustraciones, miedos) · Ganancias (qué define el éxito). Se construye después de la entrevista y antes de la Persona.",
      },
      {
        type: "subtitle", text: "User Journey Map"
      },
      {
        type: "definition",
        term: "User Journey Map",
        text: "Visualización en el tiempo de la experiencia completa del usuario al intentar lograr un objetivo. Muestra puntos de contacto, emociones, pensamientos y oportunidades de mejora.",
      },
      {
        type: "table",
        headers: ["Componente", "Descripción"],
        rows: [
          ["Persona", "Quién realiza el recorrido."],
          ["Escenario + expectativas", "Qué quiere lograr y con qué suposiciones parte."],
          ["Etapas", "Descubrir → Considerar → Comparar → Usar → Recomendar."],
          ["Acciones", "Qué hace el usuario en cada fase."],
          ["Pensamientos", "Qué se dice a sí mismo."],
          ["Emociones", "Curva emocional: alegría, frustración, ansiedad, satisfacción."],
          ["Dolores y oportunidades", "Dónde y cómo debemos intervenir."],
        ],
      },
      {
        type: "subtitle", text: "Onboarding"
      },
      {
        type: "definition",
        term: "Onboarding",
        text: "Proceso por el cual el usuario aprende a usar la aplicación desde el primer momento. Puede ser mediante tutoriales guiados, tooltips que se iluminan, flujos paso a paso, o guías interactivas. Un buen onboarding reduce la fricción inicial y aumenta la retención.",
      },
    ],
  },
  {
    id: "ejercicios",
    number: "17",
    title: "Ejercicios prácticos",
    color: "#22c55e",
    content: [

      {
        type: "subtitle",
        text: "IPv4 y Subnetting"
      },

      {
        type: "exercise",
        question: "Dada la IP 192.168.10.34/27 calcular:",
        items: [
          "Dirección de red",
          "Broadcast",
          "Primer host útil",
          "Último host útil",
          "Cantidad de hosts utilizables"
        ]
      },

      {
        type: "exercise",
        question: "Convertir la dirección 172.16.5.200 a binario."
      },

      {
        type: "exercise",
        question: "¿Cuál es la máscara correspondiente al prefijo /26?"
      },

      {
        type: "exercise",
        question: "¿Las IPs 192.168.1.10/24 y 192.168.2.15/24 pertenecen a la misma red? Justificar."
      },

      {
        type: "exercise",
        question: "Calcular cuántos hosts útiles tiene una red /29."
      },

      {
        type: "exercise",
        question: "Determinar si la IP 10.15.20.30 pertenece a un rango privado o público."
      },

      {
        type: "subtitle",
        text: "Modelo OSI y Protocolos"
      },

      {
        type: "exercise",
        question: "¿En qué capa OSI trabajan los siguientes dispositivos?",
        items: [
          "Router",
          "Switch",
          "Firewall",
          "Access Point"
        ]
      },

      {
        type: "exercise",
        question: "Clasificar los siguientes protocolos según la capa correspondiente:",
        items: [
          "HTTP",
          "TCP",
          "IP",
          "Ethernet",
          "DNS",
          "UDP"
        ]
      },

      {
        type: "exercise",
        question: "Ordenar correctamente las unidades de datos desde capa 7 hasta capa 1.",
        items: [
          "Bits",
          "Segmento",
          "Paquete",
          "Trama"
        ]
      },

      {
        type: "exercise",
        question: "Explicar la diferencia principal entre TCP y UDP."
      },

      {
        type: "exercise",
        question: "¿Qué función cumple el TTL en un paquete IP?"
      },

      {
        type: "subtitle",
        text: "Switching y Routing"
      },

      {
        type: "exercise",
        question: "Explicar qué ocurre cuando un switch recibe una trama cuya MAC destino no existe en la tabla CAM."
      },

      {
        type: "exercise",
        question: "¿Cuál es la diferencia entre una dirección MAC y una dirección IP?"
      },

      {
        type: "exercise",
        question: "¿Qué protocolo evita bucles en una topología redundante de switches?"
      },

      {
        type: "exercise",
        question: "Explicar brevemente qué hace un router cuando recibe un paquete."
      },

      {
        type: "subtitle",
        text: "Seguridad y Firewalls"
      },

      {
        type: "exercise",
        question: "¿Qué diferencia existe entre un firewall stateful y un packet filtering firewall?"
      },

      {
        type: "exercise",
        question: "Explicar el concepto de Zero Trust."
      },

      {
        type: "exercise",
        question: "¿Qué ventajas ofrece una DMZ dentro de una arquitectura de red?"
      },

      {
        type: "subtitle",
        text: "UX / UI"
      },

      {
        type: "exercise",
        question: "¿Qué diferencia existe entre UX y UI?"
      },

      {
        type: "exercise",
        question: "¿Qué ley UX se relaciona con reducir la cantidad de opciones en un menú?"
      },

      {
        type: "exercise",
        question: "Explicar la diferencia entre un wireframe y un mockup."
      },

      {
        type: "exercise",
        question: "Mencionar dos principios de Gestalt y dar un ejemplo práctico."
      },

      {
        type: "exercise",
        question: "¿Por qué la consistencia visual es importante en una interfaz?"
      },

      {
        type: "subtitle",
        text: "Casos prácticos"
      },

      {
        type: "exercise",
        question: "Un usuario tiene conexión WiFi pero no puede acceder a Internet. Enumerar los pasos básicos de diagnóstico siguiendo el modelo OSI."
      },

      {
        type: "exercise",
        question: "Una empresa necesita separar administrativamente las áreas de ventas y recursos humanos dentro de la misma red física. ¿Qué tecnología podría utilizarse?"
      }
    ]
  },
  {
    id: "ejerciciosSubnetLab",
    number: "18",
    title: "Ejercicios – SubnetLab",
    color: "#c8ff00",
    content: [{ type: "tool" }],
  },
  {
    id: "react-native",
    number: "19",
    title: "React Native – Introducción y ecosistema",
    color: "#f97316",
    content: [
      {
        type: "definition",
        term: "React Native",
        text: "Framework de código abierto creado por Meta (Facebook), liberado en 2015. Permite construir aplicaciones móviles multiplataforma (iOS y Android) desde una única base de código en JavaScript o TypeScript, usando el mismo modelo de componentes de React. Nació de la necesidad interna de Facebook de llevar React (web) al mundo móvil sin renunciar al rendimiento nativo.",
      },
      {
        type: "subtitle", text: "Tres palabras clave"
      },
      {
        type: "table",
        headers: ["Concepto", "Significado"],
        rows: [
          ["Framework", "Estructura, herramientas y convenciones. No es solo una librería suelta, sino un ecosistema completo."],
          ["Multiplataforma", "Un solo proyecto apunta a Android, iOS y opcionalmente web. No es el fuerte para web ni escritorio."],
          ["Nativo", "La interfaz se compone de elementos visuales reales del SO (no emula un navegador). La app se ve, se siente y rinde como nativa."],
        ],
      },
      {
        type: "subtitle", text: "Conceptos de React que hereda React Native"
      },
      {
        type: "table",
        headers: ["Concepto", "Descripción"],
        rows: [
          ["Componentes", "La interfaz se arma combinando piezas pequeñas e independientes: botón, input, tarjeta, lista, etc."],
          ["Declarativo", "El programador describe cómo debe verse la UI para un estado dado. React se encarga de actualizar la pantalla cuando el estado cambia."],
          ["Estado y propiedades", "Los datos fluyen desde componentes padre a hijo. Cuando cambian, solo se redibuja el componente afectado, no toda la pantalla."],
        ],
      },
      {
        type: "callout",
        text: "Diferencia clave con MVC clásico (ej: ASP, Laravel): en esos frameworks al presionar 'guardar' se manda un HTTP request y el servidor devuelve toda la página entera. React actualiza solo la porción de la vista que cambió, enviando/recibiendo JSON.",
      },
      {
        type: "subtitle", text: "Mitos a descartar"
      },
      {
        type: "list",
        items: [
          "React Native NO es un lenguaje de programación — el lenguaje es JavaScript o TypeScript.",
          "React Native NO es lo mismo que React — React es una librería para web, React Native es para móvil.",
          "React Native NO genera páginas web — produce componentes nativos del SO.",
          "React Native NO reemplaza el desarrollo nativo — para casos muy específicos (gráficos 3D, juegos, hardware de vanguardia) el nativo sigue siendo mejor.",
        ],
      },
      {
        type: "subtitle", text: "Problema que vino a resolver"
      },
      {
        type: "text",
        text: "Antes de React Native las empresas tenían dos opciones: (1) equipos separados — uno en Java/Kotlin para Android y otro en Swift/Obj-C para iOS, con dos bases de código, doble mantenimiento y bugs que debían corregirse en ambas plataformas; o (2) híbridas WebView (Ionic, Cordova) — económicas pero lentas porque instalan un navegador dentro de la app. React Native ofrece un tercer camino: una sola base de código con interfaz 100% nativa.",
      },
      {
        type: "subtitle", text: "Familias de desarrollo móvil"
      },
      {
        type: "table",
        headers: ["Familia", "Ejemplos", "Descripción"],
        rows: [
          ["Nativo puro", "Kotlin (Android), Swift/Obj-C (iOS)", "Máximo rendimiento y control. Mayor costo: equipos separados, dos bases de código."],
          ["Multiplataforma nativo", "React Native (JS/TS), Flutter (Dart)", "Una base de código, interfaz nativa real. React Native tiene comunidad mayor."],
          ["Híbridas (WebView)", "Ionic, Cordova, PWA", "Tecnología web empaquetada como app. Rápido de montar, bajo rendimiento. No es nativo."],
        ],
      },
      {
        type: "subtitle", text: "Comparativa detallada"
      },
      {
        type: "table",
        headers: ["Aspecto", "Nativo (Kotlin/Swift)", "React Native", "Flutter"],
        rows: [
          ["Lenguaje", "Kotlin / Swift", "JavaScript / TypeScript", "Dart"],
          ["Código compartido", "Ninguno", "Alto (~90%)", "Alto (~90%)"],
          ["Interfaz", "100% nativa del SO", "Nativa real del SO", "Dibujada (motor propio, no nativa)"],
          ["Curva de aprendizaje", "Alta", "Baja (si ya sabés JS/React)", "Media (paradigma diferente)"],
          ["Rendimiento", "Máximo", "Muy bueno", "Muy bueno"],
          ["Comunidad", "Grande (por separado)", "Enorme", "Grande pero menor"],
        ],
      },
      {
        type: "subtitle", text: "¿Cuándo usar React Native?"
      },
      {
        type: "list",
        items: [
          "Equipo pequeño o solo developer que necesita cubrir ambas plataformas.",
          "Ya se conoce JavaScript / React — la curva es mínima.",
          "Producto que necesita salir rápido al mercado.",
          "App con funcionalidades estándar: listas, formularios, navegación, notificaciones, GPS, cámara.",
        ],
      },
      {
        type: "subtitle", text: "¿Cuándo NO usar React Native?"
      },
      {
        type: "list",
        items: [
          "Juegos con gráficos 3D o físicas complejas.",
          "Integraciones de hardware muy específicas y de vanguardia.",
          "Funcionalidades nativas que no pueden escribirse en TurboModules.",
          "Cuando el rendimiento máximo es crítico en cada interacción (ej: cámara en tiempo real de alta frecuencia).",
        ],
      },
      {
        type: "subtitle", text: "Empresas que usan React Native"
      },
      {
        type: "list",
        items: [
          "Meta: Facebook, Instagram (secciones específicas).",
          "Discord: aplicación completa en React Native.",
          "Shopify: app móvil.",
          "Mercado Libre: secciones de la app.",
          "Microsoft: Skype, algunas apps de Office.",
          "Tesla: app de control del vehículo.",
        ],
      },
    ],
  },
  {
    id: "react-native-setup",
    number: "20",
    title: "React Native – Arquitectura y entorno",
    color: "#10b981",
    content: [
      {
        type: "subtitle", text: "Los dos mundos que conviven en React Native"
      },
      {
        type: "table",
        headers: ["Mundo", "Qué contiene"],
        rows: [
          ["Hilo JavaScript", "Lógica de la app, componentes, estados. Corre en el motor Hermes (antes V8 en navegadores Chrome)."],
          ["Lado nativo", "Vistas reales de la pantalla, hardware del teléfono: cámara, GPS, notificaciones push, sensores, biometría."],
        ],
      },
      {
        type: "subtitle", text: "Arquitectura clásica — El Bridge (histórico, retirado en 0.82)"
      },
      {
        type: "text",
        text: "Durante casi 10 años, los dos mundos (JS y nativo) se comunicaban a través de un puente (Bridge). Los mensajes viajaban de forma asincrónica y eran serializados en JSON.",
      },
      {
        type: "steps",
        items: [
          "Hilo JavaScript genera una acción (ej: presionar un botón).",
          "La acción se serializa a JSON y cruza el Bridge de forma asincrónica.",
          "El hilo nativo recibe el mensaje, lo deserializa y actualiza la UI.",
          "La respuesta vuelve por el mismo camino.",
        ],
      },
      {
        type: "callout",
        text: "El Bridge era el cuello de botella de rendimiento. Con listas grandes (ej: 3000 contactos), muchas animaciones o gestos complejos, el tráfico se saturaba y la app se volvía lenta. Se necesitaba ingeniería adicional: paginación, lazy loading, etc.",
      },
      {
        type: "subtitle", text: "Nueva arquitectura — Desde React Native 0.76 (2024)"
      },
      {
        type: "table",
        headers: ["Pieza", "Función"],
        rows: [
          ["JSI (JavaScript Interface)", "Reemplaza al Bridge. Permite que JS llame código nativo de forma directa y sincrónica, sin serializar a JSON."],
          ["Fabric", "Nuevo motor de renderizado. Dibuja las vistas más rápido y de forma más predecible."],
          ["TurboModules", "Nueva forma de exponer funciones nativas (cámara, GPS, sensores). Se cargan solo cuando se usan → menor consumo de batería y RAM."],
          ["Hermes", "Motor de JavaScript optimizado para móvil. Menor uso de memoria, arranque más rápido. Motor por defecto desde hace varias versiones."],
        ],
      },
      {
        type: "callout",
        text: "Desde la versión 0.82, la arquitectura del Bridge quedó retirada. A partir de 2024-2025 la nueva arquitectura es la única forma de desarrollar en React Native. Expo la activa por defecto sin configuración adicional.",
      },
      {
        type: "subtitle", text: "Herramientas del entorno de desarrollo"
      },
      {
        type: "table",
        headers: ["Herramienta", "Para qué sirve"],
        rows: [
          ["NVM (Node Version Manager)", "Gestiona múltiples versiones de Node.js por proyecto. Permite cambiar de versión sin reinstalar."],
          ["Node.js LTS", "Runtime de JavaScript. Versión recomendada: LTS actual (v22 'Jod' o superior)."],
          ["Git", "Control de versiones. Windows no lo trae por defecto."],
          ["Visual Studio Code", "Editor ligero con excelente soporte JS/TS/React. No es un IDE completo como IntelliJ o Visual Studio."],
          ["Expo CLI", "Crea y maneja proyectos Expo. Se usa con npx, no requiere instalación global."],
          ["Expo Go", "App móvil para probar la app escaneando un QR. Sin compilar ni usar cable."],
          ["Android Studio", "Necesario para el emulador en la computadora. Requiere Java instalado y consume muchos recursos (mín. 16 GB RAM)."],
          ["Xcode", "Solo en Mac. Necesario para el simulador de iOS y para compilar para App Store."],
        ],
      },
      {
        type: "subtitle", text: "Extensiones recomendadas para VS Code"
      },
      {
        type: "list",
        items: [
          "ESLint: analiza el código en busca de errores y malas prácticas antes de ejecutar.",
          "Prettier: formatea automáticamente al guardar (tabulación, comillas, punto y coma). Esencial en equipos para evitar que Git marque cambios falsos por diferencias de estilo.",
          "React Native Tools: depuración y soporte específico para React Native.",
        ],
      },
      {
        type: "subtitle", text: "Crear un proyecto con Expo"
      },
      {
        type: "steps",
        items: [
          "Verificar Node: node -v (recomendado LTS).",
          "Crear el proyecto: npx create-expo-app@latest nombre-del-proyecto",
          "Ingresar a la carpeta: cd nombre-del-proyecto",
          "Iniciar el servidor: npx expo start",
          "Escanear el QR con Expo Go desde el celular (misma red WiFi). La app aparece en tiempo real.",
        ],
      },
      {
        type: "callout",
        text: "⚠ El celular y la computadora deben estar en la misma red WiFi. Si cambiás de red (casa → facultad), Expo pierde la conexión. Con datos móviles no funciona por defecto. Al cambiar de red hay que cerrar Expo Go, volver a escanear el QR en la nueva red.",
      },
      {
        type: "subtitle", text: "Publicación en stores"
      },
      {
        type: "table",
        headers: ["Store", "Costo", "Restricciones"],
        rows: [
          ["Google Play Store (Android)", "~$25 pago único", "Menos restricciones. Proceso de revisión más rápido."],
          ["App Store (iOS)", "$99/año", "Revisión manual de cada versión. Puede tardar días o semanas. Requiere Mac para compilar."],
        ],
      },
    ],
  },
  {
    id: "react-native-proyecto",
    number: "21",
    title: "React Native – Estructura del proyecto",
    color: "#a855f7",
    content: [
      {
        type: "subtitle", text: "Estructura de carpetas de un proyecto Expo"
      },
      {
        type: "table",
        headers: ["Carpeta / Archivo", "Contenido"],
        rows: [
          ["app/", "Pantallas y navegación. Con Expo Router, cada archivo dentro de app/ es una ruta automáticamente."],
          ["app/_layout.tsx", "Layout raíz de la aplicación. Define la estructura de navegación global."],
          ["app/index.tsx", "Pantalla principal (ruta '/'). Lo primero que se renderiza."],
          ["assets/", "Imágenes, íconos, fuentes y otros recursos estáticos."],
          ["components/", "Componentes reutilizables: botones, tarjetas, listas, inputs, etc."],
          ["constants/", "Variables globales fijas: paleta de colores, tipografías, URLs de APIs. Se exportan para usar en toda la app."],
          ["hooks/", "Custom hooks de React (lógica reutilizable extraída de los componentes)."],
          ["node_modules/", "Librerías de terceros. Se genera al instalar dependencias. NUNCA se sube al repositorio."],
          ["app.json", "Configuración global: nombre, versión, ícono, splash screen, orientación, bundle identifier."],
          [".gitignore", "Archivos que Git ignora: node_modules, .env, carpetas de build (.expo/, android/, ios/)."],
          [".env", "Variables de entorno locales (claves de API, URLs de backend). NUNCA subir al repositorio."],
        ],
      },
      {
        type: "subtitle", text: "Expo Router — Navegación basada en archivos"
      },
      {
        type: "text",
        text: "Expo Router usa un sistema de rutas basado en la estructura de archivos (similar a Next.js). Cada archivo dentro de la carpeta app/ se convierte automáticamente en una ruta de la aplicación.",
      },
      {
        type: "list",
        items: [
          "app/index.tsx → ruta '/' (pantalla inicial)",
          "app/profile.tsx → ruta '/profile'",
          "app/settings/index.tsx → ruta '/settings'",
          "app/(tabs)/_layout.tsx → layout de navegación con tabs en la parte inferior",
          "Un archivo _layout.tsx en cualquier carpeta define el layout de ese grupo de rutas.",
        ],
      },
      {
        type: "callout",
        text: "Cuando Expo detecta una carpeta (tabs) con múltiples archivos, genera automáticamente el menú de navegación inferior (Tab Bar). No hace falta configurarlo manualmente.",
      },
      {
        type: "subtitle", text: "app.json — Configuración del proyecto"
      },
      {
        type: "list",
        items: [
          "name: nombre de la aplicación que se muestra al instalar.",
          "version: versión visible para el usuario.",
          "orientation: portrait, landscape o default.",
          "icon: ruta al ícono de la app.",
          "splash: configuración de la pantalla de carga (splash screen).",
          "android.package / ios.bundleIdentifier: identificador único de la app para las stores (ej: com.empresa.miapp).",
          "plugins: lista de plugins de Expo que extienden funcionalidades nativas.",
        ],
      },
      {
        type: "subtitle", text: "Fast Refresh"
      },
      {
        type: "definition",
        term: "Fast Refresh",
        text: "Característica que recarga automáticamente la app al guardar un archivo, sin perder el estado actual. Equivale a Ctrl+S → ver el cambio en tiempo real en el celular o emulador.",
      },
      {
        type: "list",
        items: [
          "Funciona para cambios en JSX y estilos — se refleja instantáneamente.",
          "NO funciona para cambios en variables de entorno ni en archivos de configuración nativos.",
          "Si la app se rompe o queda en estado inconsistente: Ctrl+R (o Cmd+R en Mac) para recarga completa.",
          "Se puede deshabilitar desde el menú de desarrollador si genera problemas.",
        ],
      },
      {
        type: "subtitle", text: "Menú de desarrollador"
      },
      {
        type: "text",
        text: "Accesible agitando el teléfono o presionando Cmd+D (iOS) / Ctrl+M (Android) en el emulador. Opciones disponibles:",
      },
      {
        type: "list",
        items: [
          "Reload: recarga completa de la aplicación.",
          "Open JS Debugger: consola para ver console.log y errores.",
          "Toggle Fast Refresh: activar/desactivar la recarga automática.",
          "Show Element Inspector: inspeccionar componentes y sus estilos en pantalla.",
        ],
      },
      {
        type: "subtitle", text: "Expo Go vs EAS Build"
      },
      {
        type: "table",
        headers: ["", "Expo Go", "EAS Build (compilación)"],
        rows: [
          ["Setup", "Solo escanear QR", "Requiere cuenta Expo y configuración"],
          ["APIs nativas", "Limitadas", "Acceso completo"],
          ["Notificaciones push", "No funciona en iOS", "Sí"],
          ["Publicar en stores", "No", "Sí"],
          ["Ideal para", "Desarrollo y prototipado rápido", "Producción y testing completo"],
        ],
      },
      {
        type: "subtitle", text: "Cables USB para desarrollo"
      },
      {
        type: "callout",
        text: "Hay dos tipos de cables USB: de carga (solo energía) y de datos (energía + transferencia). Para conectar el celular como dispositivo de desarrollo el cable DEBE ser de datos. Muchos cables baratos son solo de carga — si el celular no aparece al conectarlo, probar con otro cable.",
      },
      {
        type: "subtitle", text: "Activar modo desarrollador en Android"
      },
      {
        type: "steps",
        items: [
          "Ajustes → Información del teléfono → Información del software.",
          "Tocar 7 veces 'Número de compilación' → 'Ahora eres desarrollador'.",
          "Volver a Ajustes → Opciones de desarrollador → Activar 'Depuración USB'.",
          "Conectar el cable de datos y aceptar la solicitud de permisos en el teléfono.",
          "En la terminal: npx expo start → presionar 'a' para abrir en el dispositivo Android conectado.",
        ],
      },
    ],
  },
  {
    id: "react-native-arquitectura",
    number: "22",
    title: "React Native – Arquitectura interna profunda",
    color: "#f97316",
    content: [
      {
        type: "definition",
        term: "UI = f(estado)",
        text: "La interfaz de usuario es el resultado de una función aplicada al estado actual. Cuando el estado cambia, React vuelve a ejecutar esa función y actualiza solo lo necesario. No se manipula la pantalla directamente.",
      },
      {
        type: "subtitle", text: "Imperativo vs Declarativo"
      },
      {
        type: "table",
        headers: ["Paradigma", "Descripción", "Ejemplo"],
        rows: [
          ["Imperativo", "Se dan instrucciones paso a paso. El programador maneja cada cambio a mano.", "DOM: getElementById → cambiar texto → actualizar contador"],
          ["Declarativo", "Se describe el resultado final para un estado dado. React se encarga de llegar ahí.", "useState + JSX: describís cómo debe verse, React lo actualiza solo"],
        ],
      },
      {
        type: "callout",
        text: "Analogía Excel: una celda con fórmula =A1*2 no se actualiza a mano — se actualiza sola cuando cambia A1. En React, el estado es A1 y la pantalla es la celda con la fórmula.",
      },
      {
        type: "subtitle", text: "Componentes: recetas, no pintores"
      },
      {
        type: "table",
        headers: ["Analogía cocina", "React Native"],
        rows: [
          ["La receta escrita", "El componente (función que describe la UI)"],
          ["Los ingredientes", "Props y estado actual del componente"],
          ["Leer la receta", "Renderizar — produce una descripción, no dibuja nada todavía"],
          ["Cocinar el plato", "Montar las vistas nativas — el costo real aparece acá"],
        ],
      },
      {
        type: "callout",
        text: "Una receta se puede leer mil veces sin gastar comida. Un componente se puede ejecutar muchas veces sin tocar la pantalla. Por eso React puede re-renderizar seguido — es barato hasta el momento del mount.",
      },
      {
        type: "subtitle", text: "Árbol de elementos"
      },
      {
        type: "text",
        text: "La app no es una sola pantalla — es un árbol donde cada componente devuelve elementos que contienen otros elementos, formando una jerarquía. React la recorre desde el componente raíz hacia los hijos.",
      },
      {
        type: "table",
        headers: ["Tipo", "Descripción", "Ejemplo"],
        rows: [
          ["Componente compuesto", "Componente propio que React ejecuta para ver qué devuelve.", "<Perfil /> → React lo ejecuta y obtiene más elementos"],
          ["Componente host (primitivo)", "Elemento nativo que no se reduce más. Mapea directamente a una vista del SO.", "<View />, <Text />, <Image />"],
        ],
      },
      {
        type: "subtitle", text: "Virtual DOM / Árbol virtual en React Native"
      },
      {
        type: "text",
        text: "En la web, el Virtual DOM se compara con el DOM real del navegador. En React Native no existe DOM — hay un árbol virtual de elementos que termina alimentando a Fabric (el renderizador nativo). El principio es el mismo: mantener una copia liviana en memoria y calcular los cambios mínimos antes de tocar las vistas reales.",
      },
      {
        type: "callout",
        text: "Comparar dos árboles de objetos JavaScript en memoria es órdenes de magnitud más económico que destruir y recrear vistas nativas. React invierte poco cálculo en JS para ahorrar mucho trabajo costoso del lado nativo.",
      },
      {
        type: "subtitle", text: "Reconciliación y algoritmo de Diffing"
      },
      {
        type: "text",
        text: "La reconciliación es el proceso por el cual React compara el árbol nuevo con el anterior y deduce la lista mínima de cambios necesarios para actualizar la UI.",
      },
      {
        type: "list",
        items: [
          "Si cambió el tipo del componente (ej: View → Text): React destruye el anterior y crea uno nuevo con todo su subárbol.",
          "Si es el mismo tipo: React conserva la vista y solo actualiza las propiedades que cambiaron.",
          "El algoritmo es lineal (proporcional a la cantidad de elementos), no exponencial — eso lo hace viable.",
        ],
      },
      {
        type: "subtitle", text: "Keys en listas — por qué importan"
      },
      {
        type: "text",
        text: "Cuando se renderiza una lista, React necesita saber qué elemento corresponde a cuál entre dos renders. Sin una key única, puede asociar el estado equivocado a las filas equivocadas, generando parpadeos y comportamientos incorrectos.",
      },
      {
        type: "callout",
        text: "⚠ Nunca usar el índice del array como key si la lista puede reordenarse o insertarse al principio. Siempre usar un identificador único estable (ej: id de base de datos).",
      },
      {
        type: "subtitle", text: "Fiber — el reconciliador moderno"
      },
      {
        type: "definition",
        term: "Fiber",
        text: "Motor de reconciliación moderno de React (desde v16). Divide el trabajo de actualización en dos fases completamente separadas, lo que permite trabajar de forma interrumpible y priorizada.",
      },
      {
        type: "table",
        headers: ["Fase", "Qué hace", "¿Es interrumpible?"],
        rows: [
          ["Render", "Ejecuta componentes, arma el nuevo árbol, calcula el diff.", "Sí — sin efectos visibles para el usuario"],
          ["Commit", "Aplica los cambios calculados a las vistas nativas. Rápido y sin interrupciones.", "No"],
        ],
      },
      {
        type: "subtitle", text: "Renderizado concurrente y prioridades"
      },
      {
        type: "table",
        headers: ["Prioridad", "Tipo de actualización", "Ejemplo"],
        rows: [
          ["Alta", "Responde a gestos del usuario", "Tap, swipe, scroll"],
          ["Baja", "Cálculo pesado o datos que llegan del servidor", "Listener de base de datos en tiempo real"],
        ],
      },
      {
        type: "subtitle", text: "Hooks por dentro — cómo useState recuerda"
      },
      {
        type: "text",
        text: "Un componente es una función que se ejecuta desde cero en cada render. React guarda los hooks en una lista ordenada asociada al componente, fuera de la función. No sabe el nombre de la variable — sabe su posición en la lista.",
      },
      {
        type: "steps",
        items: [
          "Primer render: React reserva espacio para el hook en posición 0, guarda el valor inicial ('Sofia'), devuelve ese valor y la función setName.",
          "Se llama setName('Pablo'): React anota el nuevo valor y agenda un re-render.",
          "Siguiente render: la función se ejecuta de nuevo. Al llegar al hook 0, React no usa el inicial sino el anotado ('Pablo').",
          "La función 'olvidó' todo al ejecutarse, pero React recordó el estado a través de la lista de hooks.",
        ],
      },
      {
        type: "callout",
        text: "Regla de oro: nunca llamar hooks dentro de condicionales (if) ni bucles (for). El orden de llamada debe ser idéntico en cada render — el orden ES la identidad del hook.",
      },
      {
        type: "subtitle", text: "useEffect — efectos secundarios"
      },
      {
        type: "definition",
        term: "useEffect",
        text: "Permite ejecutar código que habla con el mundo exterior (APIs, sensores, eventos de hardware, suscripciones) después de que React ya pintó la interfaz. Corre en la fase de commit, no durante el render.",
      },
      {
        type: "list",
        items: [
          "El cuerpo del componente debe ser puro: solo describir la UI.",
          "El array de dependencias le dice a React cuándo volver a ejecutarse.",
          "La función de limpieza (return) se ejecuta al desmontarse el componente o antes de la siguiente ejecución del efecto.",
        ],
      },
      {
        type: "subtitle", text: "Optimización de renders — memo y callbacks"
      },
      {
        type: "table",
        headers: ["Herramienta", "Qué hace"],
        rows: [
          ["React.memo", "Evita que un componente se re-renderice si sus props no cambiaron."],
          ["useMemo", "Memoriza el resultado de un cálculo costoso para no repetirlo en cada render."],
          ["useCallback", "Mantiene estable la identidad de una función entre renders para no disparar re-renders en hijos."],
        ],
      },
      {
        type: "callout",
        text: "Re-renderizar es barato pero no gratis. Con servicios de infraestructura como Firebase o Amplify que cobran por lectura, un componente que se re-renderiza de más puede generar costos inesperados en producción.",
      },
      {
        type: "subtitle", text: "Qué dispara un re-render"
      },
      {
        type: "list",
        items: [
          "Cambió el estado interno del componente (setState / useState setter).",
          "El componente padre le pasó nuevas props.",
          "El componente padre se re-renderizó — por defecto los hijos también lo hacen, aunque sus props no hayan cambiado.",
        ],
      },
      {
        type: "subtitle", text: "Re-render vs Re-montaje"
      },
      {
        type: "table",
        headers: ["", "Re-render", "Re-montaje"],
        rows: [
          ["Cuándo ocurre", "Cambió estado o props", "Cambió la posición en el árbol o la key"],
          ["Estado", "Se conserva", "Se pierde — vuelve al inicial"],
          ["Costo", "Bajo", "Alto"],
        ],
      },
      {
        type: "subtitle", text: "Fabric en detalle — las 3 fases del pipeline"
      },
      {
        type: "steps",
        items: [
          "Render (hilo JS): React ejecuta los componentes y produce el árbol de elementos. El renderizador crea el Shadow Tree (árbol de sombra) equivalente, escrito en C++.",
          "Commit (hilo de fondo): se promueve el nuevo árbol, se calcula el layout con Yoga (Flexbox en C++). Se compara con el árbol anterior (tree diff) y se genera la lista mínima de operaciones.",
          "Mount (hilo UI): se aplica la lista de operaciones sobre el árbol de vistas nativas reales. Se dibujan los píxeles en pantalla. Solo este hilo puede tocar las vistas.",
        ],
      },
      {
        type: "subtitle", text: "Shadow Tree — árbol de sombra"
      },
      {
        type: "text",
        text: "Copia de la UI escrita en C++, creada durante la fase de render. Almacena las props y estilos de cada componente sin el peso de una vista completa. Es inmutable: para actualizar la UI no se modifica el árbol existente sino que se crea uno nuevo.",
      },
      {
        type: "callout",
        text: "C++ se usa porque es multiplataforma, rapidísimo y liviano. El mismo árbol de sombra funciona tanto en Android como en iOS.",
      },
      {
        type: "subtitle", text: "Yoga — motor de layout"
      },
      {
        type: "definition",
        term: "Yoga",
        text: "Motor de layout escrito en C++ que implementa las reglas de Flexbox. Calcula posición, tamaño y espaciado de cada elemento. Por eso el layout de React Native se parece tanto al CSS de la web — usan el mismo modelo de Flexbox.",
      },
      {
        type: "subtitle", text: "CodeGen"
      },
      {
        type: "definition",
        term: "CodeGen",
        text: "Herramienta que a partir de definiciones tipadas en TypeScript genera automáticamente el código de 'pegamento' entre JavaScript y el código nativo. Convierte errores de tipo en tiempo de compilación en lugar de en runtime, haciendo la comunicación entre ambos lados más segura.",
      },
      {
        type: "subtitle", text: "Modelo de hilos"
      },
      {
        type: "table",
        headers: ["Hilo", "Responsabilidad", "Tecnología"],
        rows: [
          ["Hilo JS", "Lógica, estado, render de React, reconciliación.", "Hermes (motor JS de Meta)"],
          ["Hilo de fondo", "Cálculo de layout (Yoga), construcción del Shadow Tree.", "C++ / Fabric"],
          ["Hilo UI", "Vistas nativas reales, píxeles en pantalla, respuesta a gestos.", "Android/iOS nativo"],
        ],
      },
      {
        type: "callout",
        text: "Regla de oro: nunca bloquear el hilo UI. Es el único que puede dibujar y responder a toques. Si se lo mantiene ocupado con trabajo pesado, la app se congela. Las animaciones deben correr en el hilo nativo (60/120 fps), no depender del hilo JS.",
      },
    ],
  },
];


export default function App() {
  const [active, setActive] = useState("intro");
  const current = sections.find(s => s.id === active);

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <Sidebar
        sections={sections}
        active={active}
        setActive={setActive}
      />

      {/* Main content */}
      <main className={styles.content}>
        {/* Header */}
        <SectionHeader current={current} total={sections.length} />

        {/* Content blocks */}
        <div>
          {current?.content.map((item, idx) => (
            <BlockRenderer key={idx} item={item} index={idx} />
          ))}
        </div>

        {/* Navigation */}
        <Navigation
          sections={sections}
          active={active}
          setActive={setActive}
        />
      </main>
    </div>
  );
}