import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  BarChart3,
  Database,
  LineChart,
  Github as GithubIcon,
  Linkedin,
  Mail,
  ArrowRight,
  Download,
  ExternalLink,
  Code2,
  BrainCircuit,
  PieChart,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Table,
  Eye,
  FileCode2,
  Terminal,
  Globe,
  Award,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Calendar,
  Zap,
  Layers,
  Search,
  CheckCircle2,
  Languages,
  Moon,
  Sun,
  Layout,
  Plus,
  Cpu,
  GitBranch,
  Settings,
  Monitor,
  Box,
  Binary,
  Key,
  FileType,
  Music,
  Activity,
  CreditCard,
  X,
  Maximize2,
  ChevronDown
} from 'lucide-react';

// --- Styles Personnalisés pour l'Animation du Portrait ---
const CustomStyles = () => (
  <style>{`
    @keyframes rotate-gradient {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-border-rotate {
      animation: rotate-gradient 8s linear infinite;
    }
    @keyframes breathe-glow {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .animate-glow-pulse {
      animation: breathe-glow 4s ease-in-out infinite;
    }
  `}</style>
);

// --- Icônes Personnalisées ---

const SapIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <text x="50%" y="50%" dy="1" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="900" letterSpacing="-1px">SAP</text>
  </svg>
);

const PowerBiIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M6 14h4v7H6zm5-5h4v12h-4zm5-6h4v18h-4z" />
  </svg>
);

const RIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M4.5,4.5v15h3.75V15h2.25l3.75,4.5h4.5l-4.5-5.25c1.5-0.75,2.25-2.25,2.25-3.75c0-1.5-0.75-3-2.25-3.75 c-0.75-0.375-1.5-0.75-2.25-0.75H4.5z M8.25,7.125h2.25c0.75,0,1.5,0.375,1.5,1.125c0,0.75-0.75,1.125-1.5,1.125H8.25V7.125z" />
  </svg>
);

const ExcelIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

// --- Fonction de défilement fluide ---
const smoothScrollTo = (e, id) => {
  if (e) e.preventDefault();
  const element = document.querySelector(id);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

// --- Données et Traductions ---

const translations = {
  fr: {
    langName: "Français", flag: "🇫🇷",
    nav: { home: "Présentation", path: "Parcours", skills: "Compétences", projects: "Projets", contact: "Contact" },
    hero: { badge: "Analyste de données au Ministère des Armées", title: "Matéo", subtitle: "Esteban", btnWork: "Explorer mes travaux", btnCv: "Mon CV" },
    about: { title: "Profil", highlight: "Data Analyst", text: "Actuellement en troisième année de BUT Science des Données à l'IUT de Vannes (option VCOD), je me spécialise dans l'analyse et la valorisation marketing des données.", quote: "Statistiques et marketing décisionnel", card1: "Formation", card1Val: "BUT Science des Données", card1Sub: "IUT de Vannes", card2: "Spécialité", card2Val: "Option VCOD", card2Sub: "Marketing & Data", card3: "Localisation", card3Val: "Bretagne", card3Sub: "Vannes / Quimper", card4: "Poste actuel", card4Val: "Data Analyst", card4Sub: "Alternant" },
    path: { title: "Parcours", subtitle: "Professionnel" },
    skills: { title: "Expertise", subtitle: "Technique", intro: "Un panel d'outils statistiques et informatiques acquis lors de mon parcours en Science des Données", showMore: "Voir plus", showLess: "Voir moins" },
    projects: { title: "Projets", subtitle: "Majeurs", intro: "Sélection de réalisations concrètes et situations professionnels", btnView: "découvrir le projet" },
    detail: { back: "Retour au portfolio", context: "Contexte du projet", methodology: "Méthodologie appliquée", results: "Résultats & Impact", stack: "Stack Utilisée", github: "Voir le projet", app: "Voir l'application" },
    contact: { title: "Me contacter", btn: "Mail" },
    footer: { sub: "Étudiant BUT3 Science des Données - IUT Vannes" }
  },
  en: {
    langName: "English", flag: "🇬🇧",
    nav: { home: "About", path: "Journey", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: { badge: "Data Analyst at the Ministry of Armed Forces", title: "Matéo", subtitle: "Esteban", btnWork: "Explore my work", btnCv: "My CV" },
    about: { title: "Data Analyst", highlight: "Profile", text: "Currently in my third year of a Bachelor's in Data Science at IUT Vannes (VCOD option), I specialize in data analysis and marketing valuation.", quote: "Expertise in statistics and decision-making marketing", card1: "Education", card1Val: "B.T. Data Science", card1Sub: "IUT Vannes", card2: "Specialization", card2Val: "VCOD Option", card2Sub: "Marketing & Data", card3: "Location", card3Val: "Brittany", card3Sub: "Vannes / Quimper", card4: "Current Position", card4Val: "Data Analyst", card4Sub: "Apprentice" },
    path: { title: "Professional", subtitle: "Journey" },
    skills: { title: "Technical", subtitle: "Expertise", intro: "A range of statistical and IT tools acquired during my Data Science studies", showMore: "Show more", showLess: "Show less" },
    projects: { title: "Major", subtitle: "Projects", intro: "Selection of concrete achievements and professional situations", btnView: "discover the project" },
    detail: { back: "Back to portfolio", context: "Project Context", methodology: "Methodology", results: "Results & Impact", stack: "Tech Stack", github: "View Project", app: "View Application" },
    contact: { title: "Contact me", btn: "Mail" },
    footer: { sub: "Data Science Student - IUT Vannes" }
  },
  es: {
    langName: "Español", flag: "🇪🇸",
    nav: { home: "Presentación", path: "Trayectoria", skills: "Competencias", projects: "Proyectos", contact: "Contacto" },
    hero: { badge: "Analista de datos en el Ministerio de las Fuerzas Armadas", title: "Matéo", subtitle: "Esteban", btnWork: "Explorar mis proyectos", btnCv: "Mi CV" },
    about: { title: "Perfil", highlight: "Data Analyst", text: "Actuellement en el tercer año de BUT Science des Données en el IUT de Vannes (opción VCOD).", quote: "Estadísticas y marketing de decisiones", card1: "Formación", card1Val: "BUT Ciencia de Datos", card1Sub: "IUT de Vannes", card2: "Especialidad", card2Val: "Opción VCOD", card2Sub: "Marketing & Data", card3: "Ubicación", card3Val: "Bretaña", card3Sub: "Vannes / Quimper", card4: "Puesto actual", card4Val: "Data Analyst", card4Sub: "Aprendiz" },
    path: { title: "Trayectoria", subtitle: "Profesional" },
    skills: { title: "Experiencia", subtitle: "Técnica", intro: "Un panel de herramientas estadísticas e informáticas adquiridas durante mi carrera", showMore: "Ver más", showLess: "Ver menos" },
    projects: { title: "Proyectos", subtitle: "Principales", intro: "Selección de logros concretos y situaciones profesionales", btnView: "descubrir el proyecto" },
    detail: { back: "Volver al portafolio", context: "Contexto del proyecto", methodology: "Metodología aplicada", results: "Resultados & Impacto", stack: "Stack Utilizada", github: "Ver el proyecto", app: "Ver la aplicación" },
    contact: { title: "Contactarme", btn: "Correo" },
    footer: { sub: "Estudiante de Ciencia de Datos - IUT Vannes" }
  },
  de: {
    langName: "Deutsch", flag: "🇩🇪",
    nav: { home: "Präsentation", path: "Werdegang", skills: "Kompetenzen", projects: "Projekte", contact: "Kontakt" },
    hero: { badge: "Datenanalyst im Ministerium der Streitkräfte", title: "Matéo", subtitle: "Esteban", btnWork: "Meine Arbeiten erkunden", btnCv: "Mein Lebenslauf" },
    about: { title: "Profil", highlight: "Data Analyst", text: "Derzeit im dritten Jahr des BUT Science des Données an der IUT Vannes.", quote: "Statistik und Entscheidungsmarketing", card1: "Ausbildung", card1Val: "BUT Datenwissenschaft", card1Sub: "IUT Vannes", card2: "Spezialisierung", card2Val: "VCOD Option", card2Sub: "Marketing & Data", card3: "Standort", card3Val: "Bretagne", card3Sub: "Vannes / Quimper", card4: "Aktuelle Position", card4Val: "Data Analyst", card4Sub: "Auszubildender" },
    path: { title: "Werdegang", subtitle: "Beruflich" },
    skills: { title: "Fachwissen", subtitle: "Technisch", intro: "Eine Auswahl an statistischen und IT-Werkzeugen aus meinem Studium", showMore: "Mehr sehen", showLess: "Weniger sehen" },
    projects: { title: "Projekte", subtitle: "Wichtigste", intro: "Auswahl an konkreten Leistungen und beruflichen Situationen", btnView: "das Projekt entdecken" },
    detail: { back: "Zurück zum Portfolio", context: "Projektkontext", methodology: "Angewandte Methodik", results: "Ergebnisse & Auswirkungen", stack: "Verwendeter Stack", github: "Projekt ansehen", app: "Anwendung ansehen" },
    contact: { title: "Kontaktieren Sie mich", btn: "Mail" },
    footer: { sub: "Student der Datenwissenschaft - IUT Vannes" }
  }
};

const skillCategoriesData = [
  {
    id: "prog",
    title: { fr: "Programmation", en: "Programming", es: "Programación", de: "Programmierung" },
    color: "from-blue-500 to-cyan-400",
    itemBg: "bg-blue-50/50 dark:bg-blue-500/10",
    itemText: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    items: [
      { name: { fr: "Python (Pandas, Numpy)", en: "Python (Pandas, Numpy)", es: "Python (Pandas, Numpy)", de: "Python (Pandas, Numpy)" }, icon: <Code2 size={18} /> },
      { name: { fr: "R & R-Shiny", en: "R & R-Shiny", es: "R & R-Shiny", de: "R & R-Shiny" }, icon: <RIcon size={18} /> },
      { name: { fr: "(NoSQL/SQL)", en: "(NoSQL/SQL)", es: "(NoSQL/SQL)", de: "(NoSQL/SQL)" }, icon: <Database size={18} /> },
      { name: { fr: "VBA (Macros Excel)", en: "VBA (Excel Macros)", es: "VBA (Macros de Excel)", de: "VBA (Excel-Makros)" }, icon: <Terminal size={18} /> }
    ],
    extraItems: [
      { name: { fr: "SAS", en: "SAS", es: "SAS", de: "SAS" }, icon: <FileType size={18} /> },
      { name: { fr: "HTML / CSS", en: "HTML / CSS", es: "HTML / CSS", de: "HTML / CSS" }, icon: <Layout size={18} /> },
      { name: { fr: "Javascript", en: "Javascript", es: "Javascript", de: "Javascript" }, icon: <Monitor size={18} /> }
    ]
  },
  {
    id: "tools",
    title: { fr: "Outils & BI", en: "Tools & BI", es: "Herramientas & BI", de: "Werkzeuge & BI" },
    color: "from-emerald-500 to-teal-400",
    itemBg: "bg-emerald-50/50 dark:bg-emerald-500/10",
    itemText: "text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-200 dark:bg-emerald-500/20",
    items: [
      { name: { fr: "Power BI", en: "Power BI", es: "Power BI", de: "Power BI" }, icon: <PowerBiIcon size={18} /> },
      { name: { fr: "Looker", en: "Looker", es: "Looker", de: "Looker" }, icon: <LineChart size={18} /> },
      { name: { fr: "Excel", en: "Excel", es: "Excel", de: "Excel" }, icon: <ExcelIcon size={18} /> },
      { name: { fr: "SAP BO", en: "SAP BO", es: "SAP BO", de: "SAP BO" }, icon: <SapIcon size={18} /> }
    ],
    extraItems: [
      { name: { fr: "PostgreSQL / MySQL", en: "PostgreSQL / MySQL", es: "PostgreSQL / MySQL", de: "PostgreSQL / MySQL" }, icon: <Database size={18} /> },
      { name: { fr: "Git", en: "Git", es: "Git", de: "Git" }, icon: <GitBranch size={18} /> },
      { name: { fr: "Talend / SAP", en: "Talend / SAP", es: "Talend / SAP", de: "Talend / SAP" }, icon: <Award size={18} /> }
    ]
  },
  {
    id: "analytics",
    title: { fr: "Analytique", en: "Analytics", es: "Analítica", de: "Analytik" },
    color: "from-purple-500 to-indigo-400",
    itemBg: "bg-purple-50/50 dark:bg-purple-500/10",
    itemText: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    items: [
      { name: { fr: "Deep Learning & IA", en: "Deep Learning & AI", es: "Deep Learning & IA", de: "Deep Learning & KI" }, icon: <BrainCircuit size={18} /> },
      { name: { fr: "Stat. inférentielles", en: "Inferential Stats", es: "Estadísticas inferenciales", de: "Inferenzstatistik" }, icon: <LineChart size={18} /> },
      { name: { fr: "Stat. descriptives", en: "Descriptive Stats", es: "Estadísticas descriptivas", de: "Deskriptive Statistik" }, icon: <BarChart3 size={18} /> },
      { name: { fr: "Séries Temporelles", en: "Time Series", es: "Series Temporales", de: "Zeitreihen" }, icon: <BarChart size={18} /> }
    ],
    extraItems: [
      { name: { fr: "Tests Hypothèses", en: "Hypothesis Testing", es: "Pruebas de hipótesis", de: "Hypothesentests" }, icon: <Sparkles size={18} /> },
      { name: { fr: "Segmentation", en: "Segmentation", es: "Segmentación", de: "Segmentierung" }, icon: <Search size={18} /> }
    ]
  },
  {
    id: "comm",
    title: { fr: "Communication", en: "Communication", es: "Comunicación", de: "Kommunikation" },
    color: "from-orange-500 to-amber-400",
    itemBg: "bg-orange-50/50 dark:bg-orange-500/10",
    itemText: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    items: [
      { name: { fr: "Anglais", en: "English", es: "Inglés", de: "Englisch" }, icon: <Globe size={18} /> },
      { name: { fr: "Espagnol", en: "Spanish", es: "Español", de: "Spanisch" }, icon: <Globe size={18} /> },
      { name: { fr: "Vulgarisation", en: "Popularization", es: "Divulgación", de: "Popularisierung" }, icon: <Table size={18} /> },
      { name: { fr: "Méthode Agile", en: "Agile Method", es: "Método Ágil", de: "Agile Methode" }, icon: <Zap size={18} /> }
    ]
  }
];

const projectsData = [
  {
    id: 1,
    cat: { fr: "Analyse Criminelle", en: "Crime Analysis", es: "Análisis Criminal", de: "Kriminalanalyse" },
    title: { fr: "Reporting multivariée – Analyse de la criminalité aux États-Unis", en: "Multivariate Reporting – Crime Analysis in the USA", es: "Informe multivariante – Análisis de criminalidad en EE. UU.", de: "Multivariate Berichterstattung – Kriminalitätsanalyse in den USA" },
    icon: <BarChart3 size={40} />,
    desc: { fr: "Analyse statistique multidimensionnelle des données de criminalité US", en: "Multidimensional statistical analysis of US crime data", es: "Análisis estadístico multidimensional de datos de criminalidad en EE. UU.", de: "Multidimensionale statistische Analyse von US-Kriminalitätsdaten" },
    details: {
      fr: {
        contexte: "Dans le cadre de cette SAE, j’ai conçu une application interactive permettant d’explorer les données de criminalité aux États-Unis pour l’année 2019 à travers une série d’analyses statistiques et de visualisations dynamiques. Le projet repose principalement sur l’Analyse en Composantes Principales (ACP) pour identifier des structures sous-jacentes et de tendances globales dans les données. Les données proviennent du Ministère de la Justice américain et du FBI, couvrant la période de 1960 à 2019.",
        methodologie: "Première étape de préparation et nettoyage rigoureux des données. Mise en œuvre de l’ACP pour réduire la dimensionnalité et clustering pour identifier les corrélations entre variables socio-économiques (revenu, pauvreté, chômage) et taux de criminalité. Développement sous R avec Shiny pour l'interactivité.",
        resultats: "Fonctionnalités de l’application : Extrait des données interactif, synthèse globale des tendances principales, exploration par catégorie (crimes violents / contre les biens), cartographie géographique par État. \n\nCompétences développées : Maîtrise de l’ACP, traitement de données complexes à l'échelle nationale, utilisation de Shiny pour la vulgarisation de résultats techniques et autonomie sur l'intégralité du cycle d'analyse."
      },
      en: {
        contexte: "In this project, I developed an interactive application to explore US crime data for 2019 through statistical analysis and dynamic visualizations. The project primarily uses Principal Component Analysis (PCA) to identify underlying structures and global trends. Data was sourced from the US Department of Justice and the FBI, covering 1960 to 2019.",
        methodologie: "Data cleaning and rigorous preparation were followed by PCA to reduce dimensionality. We analyzed correlations between socio-economic variables (income, poverty, unemployment) and crime rates. Developed in R with Shiny for high interactivity.",
        resultats: "App features: Interactive data extracts, global summaries, descriptive analysis by crime category, and geographical mapping. \n\nDeveloped skills: Mastery of PCA, complex national-scale data processing, Shiny development for technical popularization, and autonomy over the full analysis cycle."
      },
      es: {
        contexte: "En este proyecto, diseñé una application interactiva para explorar los datos de criminalidad en los EE. UU. para 2019 mediante análisis estadísticos y visualizaciones dinámicas. El proyecto utiliza principalmente el Análisis de Componentes Principales (ACP) para identificar estructuras subyacentes y tendencias globales.",
        methodologie: "Limpieza de datos del FBI y aplicación de ACP para reducir la dimensionalidad. Análisis de la relación entre variables socioeconómicas y tasas de criminalidad. Desarrollado en R con Shiny.",
        resultats: "Funcionalidades: Visualización de datos, síntesis de tendencias, análisis descriptivo y cartografía por estado. Competencias: Dominio del ACP, visualización de datos complejos y divulgación técnica."
      },
      de: {
        contexte: "In diesem Projekt habe ich eine interaktive Anwendung entwickelt, um US-Kriminalitätsdaten für 2019 durch statistische Analysen und dynamische Visualisierungen zu untersuchen. Das Projekt nutzt primär die Hauptkomponentenanalyse (PCA).",
        methodologie: "Datenbereinigung von FBI-Daten und Anwendung der PCA zur Reduzierung der Dimensionalität. Untersuchung der Korrelationen zwischen sozioökonomischen Variablen und Kriminalitätsraten. Entwickelt in R mit Shiny.",
        resultats: "Funktionen: Datenvisualisierung, Trendzusammenfassung, deskriptive Analyse und Kartografie pro Bundesstaat. Kompetenzen: Beherrschung der PCA, komplexe Datenverarbeitung und technische Popularisierung."
      }
    },
    tags: ["R", "Statistiques", "Visualisation"],
    gradient: "from-purple-600 to-pink-600",
    images: [
      "images/Reporting multivariée – Analyse de la criminalité aux États-Unis/Reporting-1.gif",
      "images/Reporting multivariée – Analyse de la criminalité aux États-Unis/Reporting-2.jpg",
      "images/Reporting multivariée – Analyse de la criminalité aux États-Unis/Reporting-3.jpg",
      "images/Reporting multivariée – Analyse de la criminalité aux États-Unis/Reporting-4.jpg",
      "images/Reporting multivariée – Analyse de la criminalité aux États-Unis/Reporting-5.jpg"
    ],
    link: "https://mateo-esteban.shinyapps.io/Application/"
  },
  {
    id: 2,
    cat: { fr: "Data App", en: "Data App", es: "Data App", de: "Daten-App" },
    title: { fr: "Application R-Shiny Spotify", en: "Spotify R-Shiny Application", es: "Aplicación R-Shiny Spotify", de: "R-Shiny Spotify-Anwendung" },
    icon: <Music size={40} />,
    desc: { fr: "Application interactive permettant de générer automatiquement des playlists musicales organisées par décennie", en: "Interactive application for automatically generating music playlists organized by decade", es: "Aplicación interactiva para generar automáticamente listas de reproducción musicales organizadas por década", de: "Interaktive Anwendung zur automatischen Generierung von Musik-Playlists, organisiert nach Jahrzehnten" },
    details: {
      fr: {
        contexte: "Dans le cadre de cette SAE, notre équipe a développé une application interactive permettant de générer automatiquement des playlists musicales organisées par décennie. Le but était de capturer l’essence sonore propre à chaque époque, tout en y intégrant des morceaux plus récents ou plus anciens partageant des caractéristiques musicales similaires. Pour cela, nous avons travaillé à partir d’un vaste jeu de données Spotify comportant de nombreuses variables (titre, artiste, tempo, énergie, valence, popularité, genre, etc.).",
        methodologie: "La première étape a consisté en un travail rigoureux de préparation et de nettoyage des données. Nous avons ensuite appliqué une Analyse en Composantes Principales (ACP) pour réduire la dimensionnalité, suivie d’un clustering par K-Means pour former des clusters de morceaux aux caractéristiques sonores proches. Chaque cluster a été associé à une décennie dominante et à une ambiance musicale principale (énergique, joyeuse, calme, etc.). Sur le plan de l’interface, nous avons conçu une application interactive inspirée de l’ergonomie de Spotify.",
        resultats: "Compétences développées : Mobilisation d’outils statistiques (ACP, K-Means), maîtrise de la data science (Python, R), travail en équipe et gestion de projet. Le développement de l’interface utilisateur a permis de travailler l’aspect design et accessibilité, en lien avec la communication de résultats techniques à un public non expert."
      },
      en: {
        contexte: "As part of this project, our team developed an interactive application that automatically generates music playlists organized by decade. The goal was to capture the sound essence of each era while including newer or older tracks with similar musical characteristics.",
        methodologie: "We worked from a vast Spotify dataset. The first step was rigorous data preparation and cleaning. We then applied Principal Component Analysis (PCA) and K-Means clustering to group tracks with similar audio characteristics. Each cluster was associated with a dominant decade and a main musical mood. The interface was inspired by Spotify's own UX.",
        resultats: "Skills developed: Statistical tool mobilization (PCA, K-Means), Data Science mastery (Python, R), teamwork and project management. The UI development allowed working on design and accessibility to communicate technical results to non-expert audiences."
      },
      es: {
        contexte: "Como parte de este proyecto, nuestro equipo desarrolló una aplicación interactiva que genera automáticamente listas de reproducción organizadas por década. El objetivo era capturar la esencia sonora de cada época.",
        methodologie: "Trabajamos con un vasto conjunto de datos de Spotify. Realizamos limpieza de datos, ACP y clustering K-Means para agrupar canciones con características similares. Diseñamos una interfaz inspirada en Spotify.",
        resultats: "Competencias: Herramientas estadísticas (ACP, K-Means), Ciencia de Datos (Python, R), trabajo en equipo y divulgación de resultados técnicos a un público no experto."
      },
      de: {
        contexte: "Im Rahmen dieses Projekts hat unser Team eine interaktive Anwendung entwickelt, die automatisch nach Jahrzehnten organisierte Musik-Playlists erstellt. Ziel war es, die Klangessenz jeder Ära einzufangen.",
        methodologie: "Wir haben mit einem großen Spotify-Datensatz gearbeitet. Nach der Datenreinigung haben wir PCA und K-Means-Clustering angewendet. Die Schnittstelle wurde von Spotify inspiriert.",
        resultats: "Kompetenzen: Statistische Methoden (PCA, K-Means), Datenwissenschaft (Python, R), Teamarbeit und Visualisierung technischer Ergebnisse für ein Laienpublikum."
      }
    },
    tags: ["R-Shiny", "API", "Dataviz"],
    gradient: "from-green-500 to-emerald-600",
    images: [
      "images/Application R-Shiny Spotify/spotify-1.gif",
      "images/Application R-Shiny Spotify/spotify-2.jpg",
      "images/Application R-Shiny Spotify/spotify-3.jpg"
    ],
    link: null
  },
  {
    id: 3,
    cat: { fr: "Santé", en: "Health", es: "Salud", de: "Gesundheit" },
    title: { fr: "Projet EPSM", en: "EPSM Project", es: "Proyecto EPSM", de: "EPSM-Projekt" },
    icon: <Activity size={40} />,
    desc: { fr: "Conception d’une application interactive de datavisualisation pour l’Établissement Public de Santé Mentale Jean-Martin Charcot", en: "Design of an interactive datavisualization application for the Public Mental Health Establishment Jean-Martin Charcot", es: "Diseño de una aplicación interactiva de visualización de datos para el Establecimiento Público de Salud Mental Jean-Martin Charcot", de: "Entwurf einer interaktiven Datavisualisierungsanwendung für die öffentliche Einrichtung für psychische Gesundheit Jean-Martin Charcot" },
    details: {
      fr: {
        contexte: "Dans le cadre de cette SAE, notre équipe a été chargée de concevoir une application interactive de datavisualisation pour l’EPSM Jean-Martin Charcot à Vannes. L’objectif était d’améliorer la lecture et l’analyse de données médicales complexes, issues d’actes ambulatoires et d’hospitalisations, afin de faciliter la prise de décision des professionnels de santé.",
        methodologie: "Développement d’une application sous R Shiny accessible sur poste local informatique de l'établissement. Traitement, typage et structuration de données issues de fichiers .txt complexes via le langage R. Utilisation de Plotly pour générer des graphiques interactifs et conception d'un système de filtres dynamiques multicritères (sexe, unité médicale, diagnostic, âge).",
        resultats: "Compétences renforcées : Maîtrise de R (traitement, structuration), gestion de projet en équipe avec rôles définis et planning Gantt, soins esthétiques apportés aux visualisations (infobulles, filtres clairs) et prise en compte des contraintes réelles du commanditaire (confidentialité, ICD-10, mise à jour annuelle)."
      },
      en: {
        contexte: "For this project, our team designed an interactive data visualization application for EPSM Jean-Martin Charcot in Vannes. The goal was to improve the reading and analysis of complex medical data from ambulatory acts and hospitalizations to support healthcare professionals' decision-making.",
        methodologie: "Developed an R Shiny application capable of generating automatic dashboards from anonymized monthly files. Used R for deep data processing and structuring (.txt files). Implemented dynamic filtering systems using Plotly for a clear and intuitive user experience.",
        resultats: "Skills developed: Deep R mastery (readr, shiny, plotly), team coordination through defined roles and Gantt tracking, and high-quality UI/UX design (tooltips, clean interface) while respecting real-world constraints like data confidentiality and ICD-10 medical norms."
      },
      es: {
        contexte: "Diseño de una aplicación interactiva de visualización de datos para el Establecimiento Público de Salud Mental Jean-Martin Charcot en Vannes. El objetivo era facilitar la toma de decisiones médicas.",
        methodologie: "Uso de R Shiny para procesar datos médicos complejos de hospitalizaciones. Implementación de filtros dinámicos por sexo, unidad médica y diagnóstico mediante Plotly.",
        resultats: "Mejora en la toma de decisiones para los profesionales de la salud y optimización de la distribución de recursos médicos bajo estrictas normas de confidencialidad e ICD-10."
      },
      de: {
        contexte: "Entwurf einer interaktiven Datenvisualisierungsanwendung für das öffentliche psychiatrische Krankenhaus Jean-Martin Charcot in Vannes zur Unterstützung medizinischer Entscheidungen.",
        methodologie: "Entwicklung einer R Shiny-Anwendung zur Verarbeitung komplexer medizinischer Daten. Implementierung dynamischer Filter für Geschlecht, Station und Diagnose mittels Plotly.",
        resultats: "Unterstützung des medizinischen Personals bei der Entscheidungsfindung und Verbesserung der Patientenversorgung unter Einhaltung von Datenschutz und ICD-10 Standards."
      }
    },
    tags: ["Statistiques", "Santé", "Excel"],
    gradient: "from-yellow-400 to-amber-600",
    images: ["images/Projet EPSM/image.jpg"],
    link: null
  },
  {
    id: 4,
    cat: { fr: "BI & Finance", en: "BI & Finance", es: "BI & Finanzas", de: "BI & Finanzen" },
    title: { fr: "Reporting budget mensuel", en: "Monthly Budget Reporting", es: "Informe de presupuesto mensual", de: "Monatlicher Budgetbericht" },
    icon: <CreditCard size={40} />,
    desc: { fr: "Outil interactif de suivi budgétaire et d'analyse des dépenses", en: "Interactive tool for budget monitoring and expense analysis", es: "Herramienta interactiva para el seguimiento presupuestario y el análisis de gastos", de: "Interaktives Tool zur Budgetüberwachung und Ausgabenanalyse" },
    details: {
      fr: {
        contexte: "J’ai créé un outil de reporting budgétaire mensuel à l’aide d’Excel et de macros VBA pour alimenter automatiquement un rapport Power BI. Ce projet est né d’un besoin personnel : obtenir des visualisations plus claires et détaillées de ma situation financière que celles proposées par les applications bancaires standards.",
        methodologie: "Le fonctionnement repose sur la saisie des dépenses dans un fichier Excel sécurisé par des contrôles d'intégrité intégrés (prévention des valeurs aberrantes). Une macro VBA se charge ensuite d’envoyer automatiquement les données vers Power BI pour une mise à jour instantanée des tableaux de bord.",
        resultats: "Le rapport Power BI se décompose en 4 onglets stratégiques : 1. Dépenses détaillées, 2. Revenus, 3. Vue d’ensemble (corrélation revenus/dépenses), 4. Prévisions pour anticiper les flux futurs. Cet outil me permet une compréhension fine de mes flux et une prise de décision éclairée."
      },
      en: {
        contexte: "I developed a monthly budget reporting tool using Excel and VBA macros to automatically update a Power BI report. This project was born from a personal need for clearer and more granular financial visualizations than standard banking apps provide.",
        methodologie: "The workflow involves entering monthly expenses into an Excel file protected by built-in data validation controls. A VBA macro then automates data transfer to Power BI for seamless dashboard updates.",
        resultats: "The Power BI report features 4 strategic tabs: 1. Detailed Expenses, 2. Income, 3. Overview (income/expense correlation), 4. Forecasts to anticipate future flows. This tool provides deep financial clarity and supports informed decision-making."
      },
      es: {
        contexte: "He diseñado una herramienta de informes presupuestarios mensuales utilizando Excel y macros VBA para alimentar un informe de Power BI. Nació de una necesidad personal de mayor claridad financiera.",
        methodologie: "El sistema permite registrar gastos en un archivo Excel con controles de integridad. Una macro VBA automatiza el envío de datos a Power BI para actualizaciones instantáneas.",
        resultats: "El informe incluye pestañas de Gastos, Ingresos, Resumen General y Previsiones para una mejor gestión financiera y toma de decisiones informada."
      },
      de: {
        contexte: "Ich habe ein monatliches Budget-Reporting-Tool mit Excel und VBA-Makros erstellt, das automatisch einen Power BI-Bericht aktualisiert, um eine detailliertere finanzielle Übersicht zu erhalten.",
        methodologie: "Die Ausgaben werden in einer Excel-Datei mit integrierten Prüfmechanismen erfasst. Un VBA-Makro automatisiert den Datentransfer zu Power BI.",
        resultats: "Der Bericht bietet 4 Ansichten: Ausgaben, Einnahmen, Übersicht und Prognosen zur besseren finanziellen Planung und Analyse."
      }
    },
    tags: ["BI", "Budget", "Excel"],
    gradient: "from-orange-500 to-red-600",
    images: ["images/Reporting budget mensuel/image.jpg"],
    link: null
  },
  {
    id: 5,
    cat: { fr: "Data Collection", en: "Data Collection", es: "Recolección de datos", de: "Datenerfassung" },
    title: { fr: "Scrapping", en: "Scrapping", es: "Scrapping", de: "Scrapping" },
    icon: <Search size={40} />,
    desc: { fr: "Collecte automatisée de données web pour l'analyse statistique", en: "Automated web data collection for statistical analysis", es: "Recolección automatizada de datos web para análisis estadístico", de: "Automatisierte Webdatenerfassung für statistische Analysen" },
    details: {
      fr: {
        contexte: "L’objectif principal était de collecter des données à jour sur des produits électroménagers à partir du site Boulanger.com, de les transformer selon des critères définis, puis de les intégrer dans une base de données relationnelle MySQL, à des fins d’analyse et de modélisation.",
        methodologie: "Conception d'un pipeline ETL complet. Scraping avec Python (BeautifulSoup et Selenium) pour extraire les noms, prix et catégories tout en gérant la navigation dynamique. Nettoyage et normalisation des données (élimination des doublons, conversion des prix) avant chargement automatique dans MySQL via pymysql.",
        resultats: "Compétences développées : Web scraping avancé avec Python (gestion de navigation dynamique, parsing HTML), conception de pipeline ETL, gestion de bases de données relationnelles et sensibilisation aux contraintes éthiques (robots.txt, respect de la fréquence des requêtes)."
      },
      en: {
        contexte: "The main goal was to collect up-to-date appliance product data from Boulanger.com, transform it based on specific criteria, and integrate it into a MySQL relational database for analysis and modeling.",
        methodologie: "Design of a full ETL pipeline. Scraping with Python (BeautifulSoup and Selenium) to extract product info while handling dynamic navigation (clicks, scrolls). Data cleaning and normalization (duplicate removal, price conversion) before automated loading into MySQL.",
        resultats: "Skills developed: Advanced web scraping with Python (dynamic navigation, HTML parsing), ETL pipeline design, relational database management (MySQL), and awareness of ethical/technical scraping constraints (robots.txt)."
      },
      es: {
        contexte: "El objetivo principal fue recolectar datos actualizados de productos electrodomésticos del sitio Boulanger.com para integrarlos en una base de datos MySQL.",
        methodologie: "Diseño de un pipeline ETL completo usando Python (BeautifulSoup, Selenium) para la extracción dinámica. Limpieza y normalización de datos antes de la inserción en base.",
        resultats: "Competencias: Web scraping avanzado, diseño de pipelines ETL y gestión de bases de données relacionales respetando la ética de acceso."
      },
      de: {
        contexte: "Ziel war die Erfassung aktueller Produktdaten von Boulanger.com zur Integration in eine MySQL-Datenbank für weitere Analysen.",
        methodologie: "Entwurf einer ETL-Pipeline mit Python (BeautifulSoup, Selenium) für dynamisches Scraping. Datenreinigung und Normalisierung vor der automatisierten Speicherung.",
        resultats: "Kompetenzen: Fortgeschrittenes Web-Scraping, ETL-Pipeline-Design und relationales Datenbankmanagement unter Berücksichtigung von robots.txt Vorgaben."
      }
    },
    tags: ["Python", "HTML", "Data"],
    gradient: "from-cyan-500 to-blue-500",
    images: ["images/Scrapping/image.jpg"],
    link: null
  },
  {
    id: 6,
    cat: { fr: "Expérience Pro", en: "Work Experience", es: "Experiencia Profesional", de: "Berufserfahrung" },
    title: { fr: "Stage", en: "Internship", es: "Pasantía", de: "Praktikum" },
    icon: <Briefcase size={40} />,
    desc: { fr: "Immersion professionnelle au Crédit Agricole", en: "Professional immersion at Crédit Agricole", es: "Inmersión profesional en Crédit Agricole", de: "Berufliche Vertiefung bei Crédit Agricole" },
    details: {
      fr: { contexte: "Période de stage au cours de laquelle j'ai pu mettre en œuvre mes compétences au sein du Crédit Agricole", methodologie: "Mise en place de contrôles de cohérence et de référencement d'anomalies et de traitement de données bancaires", resultats: "Optimisation de process internes et montée en compétence sur l'écosystème data bancaire" },
      en: { contexte: "Internship period at Crédit Agricole during which I implemented my data science skills", methodologie: "Setting up consistency controls and anomaly referencing and banking data processing", resultats: "Optimization of internal processes and skill development in the banking data ecosystem" },
      es: { contexte: "Periodo de pasantía en Crédit Agricole aplicando conocimientos de Ciencia de Datos en un entorno real.", methodologie: "Implementación de controles de consistencia y procesamiento de datos bancarios.", resultats: "Optimización de procesos internos y desarrollo de competencias en el ecosistema de datos bancarios." },
      de: { contexte: "Praktikum bei Crédit Agricole zur Anwendung von Data Science-Methoden im Bankwesen.", methodologie: "Einrichtung von Konsistenzprüfungen und Bankdatenverarbeitung.", resultats: "Optimierung interner Prozesse und Kompetenzentwicklung im Bankendaten-Ökosystem." }
    },
    tags: ["Stage", "Bancaire", "Data Analysis"],
    gradient: "from-emerald-600 to-green-700",
    images: [
      "images/Stage/image.jpg"
    ],
    link: null
  }
];

const experiences = [
  {
    company: "Ministère des Armées",
    role: { fr: "Data Analyst (Alternance)", en: "Data Analyst (Apprenticeship)", es: "Analista de Datos (Aprendizaje)", de: "Datenanalyst (Ausbildung)" },
    period: "Septembre 2025 - Présent",
    desc: { fr: "Analyse de données stratégiques, création de dashboards de suivi et automatisations", en: "Strategic data analysis, monitoring dashboard creation, and automation", es: "Análisis de datos estratégicos, creación de paneles de seguimiento y automatización", de: "Strategische Datenanalyse, Erstellung von Monitoring-Dashboards und Automatisierung" },
    color: "bg-indigo-600"
  },
  {
    company: "Crédit Agricole",
    role: { fr: "Data Analyst (Stage)", en: "Data Analyst (Internship)", es: "Analista de Datos (Pasantía)", de: "Datenanalyst (Praktikum)" },
    period: "Avril 2025 - Juin 2025",
    desc: { fr: "Mise en place de contrôles de cohérence et de référencement d'anomalies et de traitement de données bancaires", en: "Setting up consistency controls and anomaly referencing and banking data processing", es: "Implementación de controles de consistencia y referenciación de anomalías y procesamiento de datos bancarios", de: "Einrichtung von Konsistenzprüfungen und Anomalie-Referenzierung sowie Bankdatenverarbeitung" },
    color: "bg-emerald-600"
  }
];

const personalInfo = { email: "promateoesteban1@gmail.com", linkedin: "https://www.linkedin.com/in/mat%C3%A9o-esteban-9409942a8/", cv: "docs/CV_MATEO_ESTEBAN.pdf" };

const Navigation = ({ setView, view, lang, setLang, darkMode, setDarkMode, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const langs = ['fr', 'en', 'es', 'de'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false); };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => { window.removeEventListener('scroll', handleScroll); document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleHomeClick = (id) => {
    if (view.type !== 'home') {
      setView({ type: 'home' });
      setTimeout(() => smoothScrollTo(null, id), 100);
    } else {
      smoothScrollTo(null, id);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || view.type !== 'home' ? (darkMode ? 'bg-slate-900/95 border-b border-slate-800' : 'bg-white/95 shadow-sm') : 'bg-transparent'} py-4`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <span onClick={() => { setView({ type: 'home' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`font-black text-2xl tracking-tighter cursor-pointer transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          M<span className="text-purple-600">.</span>Esteban
        </span>
        <div className="hidden md:flex items-center space-x-6">
          {[{ id: '#about', l: t.nav.home }, { id: '#experience', l: t.nav.path }, { id: '#skills', l: t.nav.skills }, { id: '#projects', l: t.nav.projects }, { id: '#contact', l: t.nav.contact }].map((link) => (
            <button key={link.id} onClick={() => handleHomeClick(link.id)} className={`relative group py-1 text-xs font-black uppercase tracking-wider transition-colors ${darkMode ? 'text-slate-400' : 'text-gray-500'} hover:text-purple-600`}>
              {link.l}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </button>
          ))}
          <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800 relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white'}`}
            >
              <span>{translations[lang].flag}</span>
              <span>{lang.toUpperCase()}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className={`absolute top-full right-0 mt-2 w-40 rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setIsMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-black uppercase transition-colors ${lang === l ? 'bg-purple-600 text-white' : (darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-50')}`}
                  >
                    <span>{translations[l].flag}</span>
                    <span>{translations[l].langName}</span>
                  </button>
                ))}
              </div>
            )}

            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ImageGallery = ({ images, darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (!images || images.length <= 1 || lightboxImage) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images, lightboxImage]);

  if (!images || images.length === 0) return null;
  const next = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <>
      <div className={`relative w-full group rounded-3xl overflow-hidden transition-all duration-500 mb-12 h-[400px] md:h-[600px] flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center cursor-zoom-in ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            onClick={() => setLightboxImage(img)}
          >
            <img
              src={img}
              alt={`Projet visual ${idx + 1}`}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <Maximize2 size={24} />
            </div>
          </div>
        ))}
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 border border-white/20 transition-all hover:bg-white/30 z-10"><ChevronLeft size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 border border-white/20 transition-all hover:bg-white/30 z-10"><ChevronRight size={28} /></button>
          </>
        )}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300 dark:bg-slate-700'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX VRAIMENT PLEIN ÉCRAN AVEC BOUTON DE SORTIE ANIMÉ */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl animate-in fade-in duration-500 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-8 right-8 flex items-center gap-3 px-8 py-4 bg-purple-500/10 hover:bg-purple-600 text-purple-400 hover:text-white rounded-full transition-all duration-500 border border-purple-500/30 backdrop-blur-xl z-[110] group shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95"
            onClick={() => setLightboxImage(null)}
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform duration-500">Fermer</span>
            <div className="relative">
              <X size={28} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-10 transition-all duration-700"></div>
            </div>
          </button>

          <div className="w-screen h-screen flex items-center justify-center p-2 md:p-10">
            <img
              src={lightboxImage}
              alt="Vue plein écran"
              className="max-w-full max-h-full object-contain animate-in zoom-in-90 duration-500 select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Hero = ({ t, darkMode }) => (
  <section className={`relative min-h-[85vh] flex items-center pt-20 overflow-hidden transition-colors duration-700 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
    <CustomStyles />
    <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -mr-48 -mt-24 opacity-60 transition-colors duration-700 ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}></div>
    <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -ml-24 -mb-24 opacity-60 transition-colors duration-700 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}></div>
    <div className="max-w-6xl mx-auto px-6 relative z-10 w-full text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-2 py-2 px-4 rounded-full border text-xs font-black uppercase tracking-widest mb-8 ${darkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'}`}>
            {t.hero.badge}
          </div>
          <h1 className={`text-5xl md:text-8xl font-black leading-[1.1] mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">{t.hero.subtitle}</span>
          </h1>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button onClick={(e) => smoothScrollTo(e, '#projects')} className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black shadow-xl transition-all ${darkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              {t.hero.btnWork} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="relative shrink-0 order-first md:order-last">
          {/* EFFET DE LUEUR PULSÉE DERRIÈRE LE CADRE */}
          <div className="absolute inset-0 bg-purple-500 rounded-[45px] blur-3xl opacity-20 animate-glow-pulse"></div>

          <div className={`relative w-64 h-64 md:w-96 md:h-96 rounded-[40px] p-[3px] overflow-hidden group shadow-2xl transition-all duration-700 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            {/* BORDURE DÉGRADÉE TOURNANTE (Uniquement visible via le padding p-[3px]) */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_20%,#9333ea_50%,transparent_80%)] animate-border-rotate group-hover:bg-[conic-gradient(from_0deg,transparent_20%,#6366f1_50%,transparent_80%)] transition-all duration-1000"></div>

            {/* CONTENEUR IMAGE INTERNE */}
            <div className={`relative w-full h-full rounded-[37px] overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
              <img
                src="images/portrait/cv_image.png"
                alt="Portrait Matéo Esteban"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback si l'image ne charge pas */}
              <div style={{ display: 'none' }} className="w-full h-full items-center justify-center font-black uppercase tracking-widest text-xs text-center px-4 text-slate-400">
                Portrait <br /> Matéo Esteban
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectDetail = ({ project, setView, lang, t, darkMode }) => {
  const content = translations[lang].detail;
  const projectContent = project.details[lang] || project.details['fr'];

  return (
    <div className={`pt-32 pb-32 min-h-screen transition-colors duration-700 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <button onClick={() => setView({ type: 'home' })} className={`flex items-center gap-3 font-black transition-all mb-12 group uppercase text-xs tracking-widest ${darkMode ? 'text-slate-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'}`}>
          <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> {content.back}
        </button>

        <header className="mb-12">
          <span className={`px-4 py-1.5 rounded-full font-black uppercase text-[10px] border tracking-wider mb-6 inline-block ${darkMode ? 'bg-purple-900/30 text-purple-300 border-purple-800' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>{project.cat[lang]}</span>
          <h2 className={`text-4xl md:text-6xl font-black transition-colors duration-700 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title[lang]}</h2>
        </header>

        <ImageGallery images={project.images} darkMode={darkMode} />

        {/* LIEN VERS L'APPLICATION (Sous les images) */}
        {project.link && (
          <div className="flex justify-center -mt-6 mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900/20' : 'bg-gray-900 text-white hover:bg-purple-600 shadow-gray-200'}`}
            >
              <Zap size={16} className="animate-pulse" /> {translations[lang].detail.app} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className={`p-10 rounded-[2.5rem] border shadow-sm transition-all ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}><Layers className="text-purple-600" size={28} /> {content.context}</h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xl leading-relaxed`}>{projectContent?.contexte}</p>
              </div>
              <div className={`p-10 rounded-[2.5rem] border shadow-sm transition-all ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}><Terminal className="text-purple-600" size={28} /> {content.methodology}</h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xl leading-relaxed`}>{projectContent?.methodologie}</p>
              </div>
              <div className="p-10 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-[2.5rem] shadow-2xl shadow-purple-500/20 text-left">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><CheckCircle2 size={28} /> {content.results}</h3>
                <p className="text-purple-50 text-xl leading-relaxed font-medium whitespace-pre-line">{projectContent?.resultats}</p>
              </div>
            </section>
          </div>
          <aside className="space-y-8">
            <div className={`p-10 rounded-[2.5rem] border shadow-sm sticky top-32 transition-all ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
              <h4 className="font-black mb-8 uppercase text-xs tracking-widest text-purple-600 text-left">{content.stack}</h4>
              <div className="space-y-8 text-left">
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((t, i) => (<span key={i} className={`px-4 py-2 rounded-xl text-xs font-black uppercase border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>{t}</span>))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className={`mt-8 flex items-center justify-center gap-3 w-full py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-900 text-white hover:bg-purple-600 shadow-gray-200'}`}>
                    {content.github} <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState({ type: 'home', data: null });
  const [lang, setLang] = useState('fr');
  const [darkMode, setDarkMode] = useState(false);
  const [expandedCats, setExpandedCats] = useState([]);
  const t = translations[lang];

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const toggleExpand = (id) => {
    setExpandedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500 selection:text-white transition-colors duration-700 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-gray-900'}`}>
      <Navigation setView={setView} view={view} lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />

      <main>
        {view.type === 'home' ? (
          <>
            <Hero t={t} darkMode={darkMode} />
            <section id="about" className={`py-32 transition-colors duration-700 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white'}`}>
              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                <div className="relative text-left">
                  <h2 className={`text-4xl font-black mb-8 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.about.highlight} <span className="text-purple-600">{t.about.title}</span></h2>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xl leading-relaxed mb-8`}>{t.about.text}</p>
                  <div className={`flex items-center gap-4 p-6 rounded-3xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Layers size={24} /></div>
                    <p className={`${darkMode ? 'text-purple-300' : 'text-purple-900'} font-bold italic`}>"{t.about.quote}"</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  {[{ l: t.about.card1, v: t.about.card1Val, s: t.about.card1Sub }, { l: t.about.card2, v: t.about.card2Val, s: t.about.card2Sub }, { l: t.about.card3, v: t.about.card3Val, s: t.about.card3Sub }, { l: t.about.card4, v: t.about.card4Val, s: t.about.card4Sub }].map((it, i) => (
                    <div key={i} className={`p-8 rounded-3xl border transition-all group shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-purple-500' : 'bg-gray-50 border-gray-100 hover:border-purple-200 hover:bg-white'}`}>
                      <h4 className="text-[10px] font-black uppercase text-purple-500 tracking-widest mb-2">{it.l}</h4>
                      <p className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{it.v}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">{it.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section id="experience" className={`py-32 transition-colors duration-700 ${darkMode ? 'bg-slate-800/30' : 'bg-white border-t border-gray-100'}`}>
              <div className="max-w-6xl mx-auto px-6">
                <div className="mb-20 text-left">
                  <h2 className={`text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.path.title} <span className="text-purple-600">{t.path.subtitle}</span></h2>
                  <div className="w-20 h-1.5 bg-purple-600 rounded-full"></div>
                </div>
                <div className="md:flex md:gap-8 text-left">
                  {experiences.map((exp, i) => (
                    <div key={i} className="mb-12 md:mb-0 md:flex-1">
                      <div className={`p-8 rounded-[2rem] border hover:shadow-xl transition-all duration-300 h-full ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-purple-500' : 'bg-gray-50 border-gray-100 hover:border-purple-200 hover:bg-white'}`}>
                        <div className="flex items-center gap-2 text-purple-600 mb-4 font-bold text-sm uppercase tracking-wider"><Calendar size={16} />{exp.period}</div>
                        <h3 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{exp.company}</h3>
                        <p className={`font-black mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-500'}`}>{exp.role[lang]}</p>
                        <p className={`leading-relaxed text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{exp.desc[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section id="skills" className={`py-32 transition-colors duration-700 ${darkMode ? 'bg-slate-900' : 'bg-gray-50/50 border-t border-gray-100'}`}>
              <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="mb-20">
                  <h2 className={`text-4xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.skills.title} <span className="text-purple-600">{t.skills.subtitle}</span></h2>
                  <div className="w-24 h-2 bg-purple-600 mx-auto rounded-full mb-8"></div>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} font-bold`}>{t.skills.intro}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                  {skillCategoriesData.map((cat, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-xl group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                      <h3 className={`text-xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r ${cat.color}`}>{cat.title[lang]}</h3>
                      <div className="space-y-4">
                        {cat.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group/item bg-opacity-50 hover:brightness-95">
                            <div className={`${cat.iconBg} ${cat.itemText} p-2.5 rounded-xl transition-transform group-hover/item:scale-110 group-hover/item:rotate-6`}>{item.icon}</div>
                            <span className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>{item.name[lang]}</span>
                          </div>
                        ))}
                        {cat.extraItems && (
                          <div className={`space-y-4 overflow-hidden transition-all duration-500 ${expandedCats.includes(cat.id) ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            {cat.extraItems.map((item, idx) => (
                              <div key={idx} className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group/item hover:brightness-95 shadow-sm`}>
                                <div className={`${cat.iconBg} ${cat.itemText} p-2.5 rounded-xl transition-transform group-hover/item:scale-110 group-hover/item:rotate-6`}>{item.icon}</div>
                                <span className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>{item.name[lang]}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {cat.extraItems && (
                          <button onClick={() => toggleExpand(cat.id)} className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed transition-all duration-300 active:scale-95 ${darkMode ? 'border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-400' : 'border-gray-200 text-gray-400 hover:border-purple-600 hover:text-purple-600'}`}>
                            <div className={`p-1 rounded-full transition-transform duration-500 ${expandedCats.includes(cat.id) ? 'rotate-45' : 'rotate-0'}`}><Plus size={18} /></div>
                            <span className="text-xs font-black uppercase tracking-widest">{expandedCats.includes(cat.id) ? t.skills.showLess : t.skills.showMore}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section id="projects" className={`py-32 transition-colors duration-700 ${darkMode ? 'bg-slate-800/30' : 'bg-white'}`}>
              <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="mb-20">
                  <h2 className={`text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.projects.title} <span className="text-purple-600">{t.projects.subtitle}</span></h2>
                  <p className="text-slate-500 font-bold italic">{t.projects.intro}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                  {projectsData.map((p) => (
                    <div key={p.id} className={`group flex flex-col h-full rounded-[2.5rem] overflow-hidden border shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                      <div className={`h-56 bg-gradient-to-br ${p.gradient} relative p-8 flex items-center justify-center overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <div className="text-white transform transition-transform group-hover:scale-125 drop-shadow-lg">{p.icon}</div>
                        <span className="absolute bottom-6 left-6 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20">{p.cat[lang]}</span>
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className={`text-xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.title[lang]}</h3>
                        <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm leading-relaxed mb-8 flex-1`}>{p.desc[lang]}</p>
                        <button onClick={() => setView({ type: 'project', data: p })} className="flex items-center gap-3 text-purple-600 font-black hover:gap-5 transition-all text-sm uppercase tracking-widest">
                          {t.projects.btnView} <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section id="contact" className="py-32 bg-purple-600 relative overflow-hidden text-center transition-colors duration-700">
              <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">{t.contact.title}</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a href="mailto:promateoesteban1@gmail.com" target="_blank" rel="noreferrer" onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:promateoesteban1@gmail.com'; }} className="px-10 py-5 bg-white text-purple-600 rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 transition-all flex items-center gap-3"><Mail size={24} /> {t.contact.btn}</a>
                  <div className="flex gap-4">
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-5 bg-white/20 text-white rounded-[2rem] hover:bg-white hover:text-purple-600 transition-all shadow-xl backdrop-blur-md active:scale-90"><Linkedin size={28} /></a>
                    <a href="https://github.com/mat-esteban" target="_blank" rel="noreferrer" className="p-5 bg-white/20 text-white rounded-[2rem] hover:bg-white hover:text-purple-600 transition-all shadow-xl backdrop-blur-md active:scale-90"><GithubIcon size={28} /></a>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <ProjectDetail project={view.data} setView={setView} lang={lang} t={t} darkMode={darkMode} />
        )}
      </main>
      <footer className={`${darkMode ? 'bg-slate-950' : 'bg-gray-950'} py-20 transition-colors`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div><span className="font-black text-3xl text-white tracking-tighter transition-colors duration-700">M<span className="text-purple-600">.</span>Esteban</span><p className="text-gray-500 font-bold mt-2 transition-colors duration-700">{t.footer.sub}</p></div>
          <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-700">© {new Date().getFullYear()} Matéo Esteban • Portfolio</div>
        </div>
      </footer>
    </div>
  );
}
