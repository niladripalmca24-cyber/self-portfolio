// Niladri Pal Portfolio - Projects & Engineering Dossier Data
// Synchronized with Official Resume: AI/ML Engineer • Full-Stack Data Solutions • Automation & Cloud Systems

const PROJECTS_DATA = [
  {
    id: "ai-study-assistant",
    title: "Smart Study Assistance & Text Retrieval System",
    badge: "GenAI & RAG Architecture",
    tagline: "Context-aware academic intelligence with semantic chunking, vector indexing, and sub-200ms latency.",
    liveDemoUrl: "https://ai-study-assistant-1-lwsb.onrender.com",
    githubUrl: "https://github.com/niladripalmca24-cyber",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "LangChain", "FastAPI", "NLP", "Render", "Vector DB", "Docker"],
    metrics: [
      { label: "Query Response", value: "<200ms" },
      { label: "Retrieval Score", value: "92% Relevance" },
      { label: "Index Capacity", value: "100k+ Chunks" },
      { label: "Hosting / CI/CD", value: "Render Cloud" }
    ],
    overview: "Engineered an intelligent study assistant utilizing RAG architecture, semantic chunking, and vector indexing for context-aware academic content retrieval. Built an asynchronous FastAPI backend delivering sub-second response times (<200ms); containerized and deployed on Render Cloud via GitHub CI/CD.",
    problem: "Traditional academic search and conversational tools suffer from context fragmentation, slow query resolution, and hallucinations across lengthy syllabi and research materials.",
    solution: "Architected a high-throughput RAG pipeline with hierarchical semantic chunking, dense vector indexing (FAISS & ChromaDB), and an asynchronous FastAPI microservice with connection pooling and token caching.",
    architecture: [
      { title: "Semantic Chunking & Parsing", desc: "Preserves structured tables, academic equations, and hierarchical chapter headers." },
      { title: "Vector Index Store", desc: "High-dimensional vector embeddings with cosine similarity distance and hybrid keyword reranking." },
      { title: "Async FastAPI Serving", desc: "Non-blocking asynchronous endpoints delivering sub-200ms roundtrip response times." },
      { title: "Docker & GitHub CI/CD", desc: "Automated containerization and zero-downtime deployment pipelines targeting Render Cloud." }
    ],
    challenges: "Preserving mathematical formulas, diagram captions, and tabular data integrity across multi-page PDF documents during automated vectorization.",
    results: "Delivered sub-200ms retrieval latency with 92% answer relevance score benchmarked on comprehensive academic question sets."
  },
  {
    id: "urban-twin",
    title: "Urban-Twin: Multi-Camera Traffic Analytics",
    badge: "Computer Vision & Spatial Analytics",
    tagline: "Real-time streaming analytics pipelines calculating vehicle velocities, congestion density, and wait times.",
    liveDemoUrl: "https://urbantwin-ai.onrender.com",
    githubUrl: "https://github.com/niladripalmca24-cyber",
    heroImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Spatial Tracking", "Computer Vision", "Cloud Dashboard", "FastAPI", "OpenCV", "Render"],
    metrics: [
      { label: "Streaming Cadence", value: "Real-time" },
      { label: "Pipeline Latency", value: "Sub-50ms" },
      { label: "Detection Accuracy", value: "96.4% mAP" },
      { label: "Dashboard Host", value: "Render Live" }
    ],
    overview: "Designed real-time streaming analytics pipelines calculating vehicle velocities, congestion density, and wait times; hosted a live tracking dashboard on Render.",
    problem: "Managing high-throughput RTSP surveillance feeds requires low-latency edge inference capable of tracking overlapping vehicles under sudden lighting changes and occlusions.",
    solution: "Built a multi-camera computer vision pipeline combining spatial tracking heuristics, vehicle velocity estimation, queue density analytics, and a responsive web monitoring dashboard.",
    architecture: [
      { title: "Video Stream Ingestion", desc: "Multi-threaded frame grabbers with dynamic buffer queuing and frame-skipping protection." },
      { title: "Object Detection & Tracking", desc: "Spatial tracking vectors and Kalman filtering for persistent vehicle ID continuity." },
      { title: "Telemetry Aggregation", desc: "Real-time velocity and congestion metrics computed in rolling temporal windows." },
      { title: "Cloud Dashboard", desc: "Live web monitoring dashboard deployed on Render streaming telemetry readouts." }
    ],
    challenges: "Maintaining persistent vehicle identifiers across camera occlusions, intersection transitions, and glare artifacts during peak hours.",
    results: "Achieved sub-50ms processing pipeline speeds, high tracking fidelity across multi-lane traffic, and real-time congestion alerts."
  },
  {
    id: "earth-satellite",
    title: "Earth & Satellite Imagery Analytics Platform",
    badge: "Geospatial Vision & Satellite AI",
    tagline: "Multi-spectral satellite imagery and spatial raster analytics detecting land-cover transitions and vegetation indices (NDVI).",
    liveDemoUrl: "https://earth-and-satellite-1.onrender.com",
    githubUrl: "https://github.com/niladripalmca24-cyber",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Computer Vision", "Geospatial Data", "FastAPI", "Render", "NDVI Rasters", "WebGL"],
    metrics: [
      { label: "Inference Latency", value: "<100ms" },
      { label: "Spectral Analysis", value: "NDVI / Multispectral" },
      { label: "API Framework", value: "FastAPI REST" },
      { label: "Deployment", value: "Render Live" }
    ],
    overview: "Processed multi-spectral satellite imagery and spatial rasters to detect land-cover transitions, vegetation indices (NDVI), and topographical variations; deployed on Render to serve live inference via REST APIs.",
    problem: "Processing high-resolution multi-spectral satellite tiles requires heavy matrix calculations and memory footprints that easily bottleneck traditional web APIs.",
    solution: "Developed an asynchronous spatial raster processing engine calculating NDVI and surface transitions on the fly, with tile-level coordinate caching and live REST API endpoints on Render.",
    architecture: [
      { title: "Raster & Tile Ingestion", desc: "Efficient slicing and normalization of multi-spectral bands across geographic bounding boxes." },
      { title: "NDVI & Land-Cover Engine", desc: "Vectorized spectral index computations (Normalized Difference Vegetation Index) and transition classification." },
      { title: "Asynchronous Serving", desc: "FastAPI REST endpoints serving cached raster slices and classification telemetry." },
      { title: "Interactive UI", desc: "Interactive visualization layer mapping topographical indices onto geospatial viewers." }
    ],
    challenges: "Handling cloud-cover artifacts and coordinate projection transformations (WGS84 to UTM) without latency spikes during tile requests.",
    results: "Delivered sub-100ms API response times for raster tile evaluations, deployed in production on Render."
  },
  {
    id: "retail-sales-forecast",
    title: "Retail Sales Forecasting & Demand Analytics",
    badge: "Time Series & Predictive ML",
    tagline: "Multi-year retail purchasing trends, rolling window aggregations, lag features, and RMSE optimization.",
    liveDemoUrl: "https://github.com/niladripalmca24-cyber",
    githubUrl: "https://github.com/niladripalmca24-cyber",
    heroImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Time Series", "Scikit-Learn", "Pandas", "Feature Engineering", "RMSE Tuning"],
    metrics: [
      { label: "Evaluation Metric", value: "Minimizing RMSE" },
      { label: "Historical Horizon", value: "Multi-Year Data" },
      { label: "Feature Engine", value: "Rolling Lag Windows" },
      { label: "Optimization", value: "Inventory Replenish" }
    ],
    overview: "Modeled multi-year retail purchasing trends using rolling window aggregations and lag features; minimized RMSE to optimize supply inventory replenishment.",
    problem: "Volatile customer demand patterns, promotional seasonality, and stockouts lead to erratic supply chain forecasts and substantial operational carrying costs.",
    solution: "Engineered an end-to-end time series feature pipeline generating multi-scale rolling means, standard deviations, and seasonal lag features, training gradient-boosted and regularized predictive models.",
    architecture: [
      { title: "ETL & Temporal Cleaning", desc: "Automated ingestion pipeline handling calendar alignment, holiday flags, and promotional indexing." },
      { title: "Lag & Rolling Features", desc: "Extracted 7-day, 14-day, and 30-day moving windows, exponential moving averages, and trend differentials." },
      { title: "Model Cross-Validation", desc: "Temporal split cross-validation preventing future leakage while tuning hyperparameters." },
      { title: "Inventory Optimization", desc: "Translated forecast quantiles into actionable minimum/maximum safety stock replenishment thresholds." }
    ],
    challenges: "Mitigating catastrophic forecasting error on newly introduced SKUs with sparse historical purchase records.",
    results: "Significantly minimized RMSE across demand clusters, directly enabling automated supply replenishment recommendations."
  },
  {
    id: "real-estate-valuation",
    title: "Predictive Real Estate Valuation System",
    badge: "Statistical Modeling & Automated EDA",
    tagline: "Comprehensive EDA, outlier treatment, and categorical encoding across 10,000+ records achieving R² = 0.88.",
    liveDemoUrl: "https://github.com/niladripalmca24-cyber",
    githubUrl: "https://github.com/niladripalmca24-cyber",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Scikit-Learn", "Pandas", "Statistical Modeling", "REST API", "EDA", "Outlier Imputation"],
    metrics: [
      { label: "Model Goodness", value: "R² = 0.88" },
      { label: "Data Volume", value: "10,000+ Records" },
      { label: "Serving Architecture", value: "REST API Endpoint" },
      { label: "Validation Strategy", value: "K-Fold Cross-Val" }
    ],
    overview: "Executed full EDA, outlier treatment, and categorical encoding across 10,000+ records; trained regularized regression models achieving an R² score of 0.88.",
    problem: "Real estate data contains high variance, skewed distribution curves, missing physical attributes, and extreme valuation outliers that distort simple regression baselines.",
    solution: "Implemented an automated statistical preprocessing pipeline with Tukey interquartile outlier imputation, target/frequency encoding, and regularized regression models served via a modular REST API.",
    architecture: [
      { title: "Exploratory Data Analysis", desc: "Automated distribution scanning, correlation heatmaps, and skewness normalization." },
      { title: "Outlier Imputation & Scaling", desc: "Robust scaler transforms and IQR threshold clipping preventing leverage point distortions." },
      { title: "Regularized Model Ensemble", desc: "Ridge, Lasso, and gradient-boosted regressors tuned for maximum variance explanation." },
      { title: "Modular REST API", desc: "Packaged trained inference pipelines into clean API endpoints with input schema validation." }
    ],
    challenges: "Balancing micro-neighborhood spatial effects against macro-level property features without inducing multicollinearity.",
    results: "Achieved a verified R² score of 0.88 with sub-50ms inference latency across 10,000+ property evaluations."
  }
];

const SKILLS_DATA = [
  {
    category: "AI, GenAI & Automation",
    icon: "psychology",
    description: "LLM orchestration, RAG architectures with vector embeddings, computer vision, and predictive machine learning models.",
    skills: [
      { name: "LLM Orchestration", level: "Production", highlight: "LangChain, LlamaIndex, Prompt Engineering" },
      { name: "RAG Architecture", level: "Advanced", highlight: "Semantic chunking & high-dimensional embeddings" },
      { name: "Vector Databases", level: "Production", highlight: "FAISS, ChromaDB vector indexing" },
      { name: "Machine Learning Frameworks", level: "Advanced", highlight: "PyTorch, Scikit-Learn (>85% accuracy)" },
      { name: "Computer Vision & NLP", level: "Advanced", highlight: "OpenCV, spatial tracking & text analytics" },
      { name: "Workflow Automation", level: "Production", highlight: "Feature engineering & automated inference" }
    ]
  },
  {
    category: "Languages & Scripting",
    icon: "terminal",
    description: "High-efficiency scripting, relational database queries, system automation, and modern web syntax.",
    skills: [
      { name: "Python (Advanced)", level: "Expert", highlight: "Object-oriented, async pipelines, PyTorch, Pandas" },
      { name: "SQL & Relational DBs", level: "Advanced", highlight: "PostgreSQL, MySQL, SQLite, Window Functions, CTEs" },
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: "Modern async/await, DOM APIs, Three.js 3D WebGL" },
      { name: "Bash / Shell Scripting", level: "Advanced", highlight: "Linux automation, batch jobs, log parsing" },
      { name: "HTML5 & Modern CSS3", level: "Expert", highlight: "Semantic markup, responsive layouts, glassmorphism" }
    ]
  },
  {
    category: "Web & Backend Engineering",
    icon: "dns",
    description: "High-throughput asynchronous APIs, microservices, JSON streaming, and rigorous endpoint testing.",
    skills: [
      { name: "FastAPI", level: "Production", highlight: "Asynchronous microservices with sub-200ms latency" },
      { name: "Flask", level: "Advanced", highlight: "Lightweight web apps & modular blueprint routing" },
      { name: "RESTful API Design", level: "Production", highlight: "Clean REST semantics, OpenAPI/Swagger docs" },
      { name: "Asynchronous Execution", level: "Advanced", highlight: "Python asyncio, non-blocking coroutines, event loops" },
      { name: "JSON Streaming & Testing", level: "Advanced", highlight: "Streaming responses, Postman automated test suites" }
    ]
  },
  {
    category: "Data Analytics & Databases",
    icon: "analytics",
    description: "Multi-source ETL data ingestion pipelines, statistical validation, time-series forecasting, and model evaluation.",
    skills: [
      { name: "Pandas & NumPy", level: "Expert", highlight: "High-performance vector operations & array computing" },
      { name: "Advanced SQL", level: "Advanced", highlight: "Window functions, recursive CTEs, indexing, query tuning" },
      { name: "Automated ETL Pipelines", level: "Production", highlight: "Multi-source ingestion, cutting overhead by 35%" },
      { name: "Exploratory Data Analysis (EDA)", level: "Expert", highlight: "Outlier imputation, distribution modeling, skewness" },
      { name: "Model Evaluation", level: "Advanced", highlight: "MSE, RMSE, R² scores, k-fold cross-validation" },
      { name: "Time Series Modeling", level: "Advanced", highlight: "Rolling window aggregations & lag feature engineering" }
    ]
  },
  {
    category: "Cloud, DevOps & Deployment",
    icon: "cloud_done",
    description: "Containerization, automated CI/CD workflows, PaaS hosting platforms, and container runtimes.",
    skills: [
      { name: "Docker Containerization", level: "Production", highlight: "Multi-stage builds, minimal images, microservices" },
      { name: "PaaS Cloud Hosting", level: "Production", highlight: "Render, Vercel, Netlify production deployments" },
      { name: "Google Cloud Run", level: "Proficient", highlight: "Serverless containerized cloud execution" },
      { name: "Git & GitHub CI/CD", level: "Advanced", highlight: "Automated build, test, and zero-downtime deploy" }
    ]
  },
  {
    category: "Systems & Productivity",
    icon: "settings_suggest",
    description: "Operating system administration, endpoint compliance automation, and analytical data modeling tools.",
    skills: [
      { name: "Linux Administration", level: "Advanced", highlight: "Kali Linux, Ubuntu server, system hardening" },
      { name: "Log Telemetry & Compliance", level: "Advanced", highlight: "Syslog/auth.log parsing, audit automation" },
      { name: "Microsoft Excel (Advanced)", level: "Expert", highlight: "Pivot tables, dynamic lookups, complex data modeling" },
      { name: "AI Excel Tools & Copilot", level: "Advanced", highlight: "Automated spreadsheet analytics & productivity workflows" }
    ]
  }
];

const EXPERIENCE_DATA = [
  {
    period: "Jan 2026 – Jun 2026",
    role: "AI/ML & Data Trainee",
    company: "Euphoria GenX",
    location: "Kolkata, India",
    bullets: [
      "Automated Data Pipelines: Architected automated Python ETL pipelines for multi-source data ingestion, eliminating manual intervention and slashing preprocessing overhead by 35%.",
      "ML Baselines & Validation: Developed and tuned supervised predictive models using Scikit-Learn; maintained accuracy consistently above 85% via k-fold cross-validation and hyperparameter optimization.",
      "Exploratory Data Analysis & APIs: Conducted statistical validation and anomaly detection on high-dimensional datasets; packaged trained inference routines into modular REST API endpoints."
    ],
    tech: ["Python ETL", "Scikit-Learn", "FastAPI", "Pandas", "Cross-Validation", "REST APIs"]
  },
  {
    period: "Mar 2025 – Jul 2025",
    role: "Cybersecurity Intern",
    company: "Ardent Computech Pvt. Ltd.",
    location: "Kolkata, India",
    bullets: [
      "Log Telemetry Analytics: Analyzed structured Linux system log streams (syslog, auth.log) and high-throughput network telemetry to detect operational anomalies, performance bottlenecks, and security events.",
      "Compliance Automation: Authored custom Python automation utilities to extract, structure, and sanitize endpoint telemetry for automated audit reporting; hardened Linux configurations."
    ],
    tech: ["Python Automation", "Linux Syslog", "Network Telemetry", "Security Auditing", "Bash Scripting"]
  }
];

const EDUCATION_DATA = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Future Institute of Engineering and Management",
    period: "2024 – 2026",
    location: "Kolkata, WB",
    focus: "Advanced Systems, Artificial Intelligence, Machine Learning, Full-Stack Architecture"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Raiganj University",
    period: "2019 – 2022",
    location: "West Bengal, India",
    focus: "Computer Applications, Data Structures, Relational Databases, Web Technologies"
  }
];

const CERTIFICATIONS_DATA = [
  {
    title: "NPTEL Certification: Data Analytics Using Python",
    description: "Validated expertise in Pandas, NumPy, statistical modeling, and machine learning algorithms."
  },
  {
    title: "Smart India Hackathon (SIH) Participant",
    description: "Developed real-time data analytical solutions within an intensive 36-hour sprint."
  },
  {
    title: "Leadership & Coordination: Cultural Club Organizing Committee",
    description: "Managed event logistics, operational budgets, and technical resources."
  }
];
