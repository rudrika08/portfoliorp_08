export interface KnowledgeChunk {
  id: string
  category: 'bio' | 'education' | 'experience' | 'projects' | 'skills' | 'contact' | 'certificates'
  title: string
  content: string
  tags: string[]
  keywords: string[] // for keyword boost in hybrid search
}

export const portfolioChunks: KnowledgeChunk[] = [
  // ── BIO ──────────────────────────────────────────────────────────────────
  {
    id: 'bio-01',
    category: 'bio',
    title: 'About Rudrika Panigrahi',
    content: `Rudrika Panigrahi is a B.Tech Computer Science student at KIIT University, Bhubaneswar, Odisha, India. She is a Full-Stack Developer and AI/ML Engineer with a strong foundation in data structures, algorithms, problem solving, and collaborative software development. She specializes in building scalable web applications and intelligent AI-based systems using modern technologies like React, Node.js, FastAPI, and vector databases.`,
    tags: ['bio', 'identity', 'about'],
    keywords: ['rudrika', 'panigrahi', 'full stack', 'developer', 'ai', 'ml', 'enthusiast', 'kiit', 'computer science', 'btech'],
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    id: 'edu-01',
    category: 'education',
    title: 'Education — KIIT University',
    content: `Rudrika is pursuing a B.Tech in Computer Science from KIIT University (Kalinga Institute of Industrial Technology), Bhubaneswar, Odisha, India. KIIT is a top-ranked private engineering institution in India, known for strong industry connections and technical programmes. She has a strong foundation in Data Structures & Algorithms, software engineering, and computer science fundamentals.`,
    tags: ['education', 'KIIT', 'university', 'btech'],
    keywords: ['kiit', 'kalinga', 'university', 'btech', 'computer science', 'bhubaneswar', 'odisha', 'engineering', 'education', 'degree', 'college'],
  },

  // ── EXPERIENCE — FED KIIT ─────────────────────────────────────────────────
  {
    id: 'exp-01',
    category: 'experience',
    title: 'Experience — Senior Technical Executive at FED KIIT',
    content: `Rudrika serves as Senior Technical Executive at FED KIIT (Federation of Entrepreneurship Development, KIIT University) from November 2024 to present, based in Bhubaneswar, Odisha. In this role she developed the C25 Campus Map — a production-ready interactive campus navigation system used by the university community. She also integrated an automated certificate distribution system and a QR-based attendance tracking system, improving administrative workflows.`,
    tags: ['experience', 'FED KIIT', 'work', 'technical executive'],
    keywords: ['fed kiit', 'federation', 'entrepreneurship', 'senior technical executive', 'campus map', 'c25', 'navigation', 'certificate', 'qr', 'attendance', 'bhubaneswar'],
  },
  {
    id: 'exp-01b',
    category: 'experience',
    title: 'Experience — FED KIIT Technical Achievements',
    content: `At FED KIIT (November 2024–present), Rudrika's key technical contributions include: building the C25 Campus Map (an interactive, production-grade navigation tool), integrating automated certificate distribution workflows, and implementing QR-code-based attendance tracking. These systems improved operational efficiency for the Federation of Entrepreneurship Development at KIIT University. This is her current ongoing role as Senior Technical Executive.`,
    tags: ['experience', 'FED KIIT', 'achievements', 'campus'],
    keywords: ['fed kiit', 'campus map', 'c25', 'qr attendance', 'certificate distribution', 'technical executive', 'kiit', 'current role', 'november 2024'],
  },

  // ── EXPERIENCE — ISRO ─────────────────────────────────────────────────────
  {
    id: 'exp-02',
    category: 'experience',
    title: 'Experience — Summer Intern at ISRO',
    content: `Rudrika interned as a Summer Intern at ISRO (Indian Space Research Organisation), RO/SCOF division, from May 2025 to June 2025. She developed and deployed a production web portal for IYD-2025 (International Year of Development 2025) using Java and JSP (JavaServer Pages). She also improved internal digital workflows and coordination across teams at the organisation.`,
    tags: ['experience', 'ISRO', 'internship', 'java', 'jsp'],
    keywords: ['isro', 'indian space research organisation', 'intern', 'internship', 'summer intern', 'java', 'jsp', 'web portal', 'iyd', '2025', 'ro scof', 'space', 'government'],
  },
  {
    id: 'exp-02b',
    category: 'experience',
    title: 'Experience — ISRO Internship Details',
    content: `At ISRO RO/SCOF (May–June 2025), Rudrika built a production-ready web portal for IYD-2025 using Java and JSP, demonstrating ability to work with enterprise Java technologies in a government research organisation setting. The portal improved internal digital workflows and inter-team coordination. ISRO (Indian Space Research Organisation) is India's national space agency. This internship reflects her ability to adapt to institutional tech stacks and deliver production-quality software.`,
    tags: ['experience', 'ISRO', 'java', 'government', 'production'],
    keywords: ['isro', 'java', 'jsp', 'iyd 2025', 'ro scof', 'space agency', 'government', 'production', 'web portal', 'workflow', 'internship'],
  },

  // ── PROJECTS — StaySync ───────────────────────────────────────────────────
  {
    id: 'proj-01',
    category: 'projects',
    title: 'Project — StaySync (AI-Powered Group Inventory Platform)',
    content: `StaySync is an AI-Powered Group Inventory Platform built for MICE (Meetings, Incentives, Conferences, Exhibitions) events. Features include multi-role RBAC (Role-Based Access Control), real-time WebSocket inventory tracking, an AI chatbot powered by LLM APIs and vector search using Qdrant, and Razorpay payment integration. Tech stack: React, Node.js, FastAPI, MongoDB, Qdrant (vector database), OpenAI APIs, Docker.`,
    tags: ['project', 'StaySync', 'AI', 'MICE', 'inventory', 'chatbot'],
    keywords: ['staysync', 'mice', 'inventory', 'group', 'platform', 'rbac', 'websocket', 'real-time', 'ai chatbot', 'llm', 'qdrant', 'vector', 'razorpay', 'payment', 'react', 'nodejs', 'fastapi', 'mongodb', 'docker', 'openai'],
  },
  {
    id: 'proj-01b',
    category: 'projects',
    title: 'Project — StaySync Architecture & AI Features',
    content: `StaySync uses a microservices architecture with React frontend, Node.js API gateway, and FastAPI ML services. The AI chatbot component uses Qdrant as a vector database for semantic search over inventory/event data, with LLM APIs for natural language responses. Real-time inventory updates are handled via Socket.IO WebSockets. Multi-role RBAC ensures organizers, vendors, and attendees see appropriate views. Payments are processed via Razorpay integration. Containerized with Docker for deployment.`,
    tags: ['project', 'StaySync', 'architecture', 'microservices', 'vector database'],
    keywords: ['staysync', 'microservices', 'react', 'fastapi', 'socket.io', 'qdrant', 'vector database', 'semantic search', 'rbac', 'docker', 'razorpay', 'llm', 'chatbot', 'inventory tracking'],
  },

  // ── PROJECTS — Agentic AI Banking ─────────────────────────────────────────
  {
    id: 'proj-02',
    category: 'projects',
    title: 'Project — Agentic AI Banking Platform',
    content: `Rudrika built an Agentic AI Banking Platform — a multi-agent AI system for NBFC (Non-Banking Financial Company) loan onboarding. It covers KYC (Know Your Customer) verification, risk assessment with FOIR (Fixed Obligation to Income Ratio) checks, and loan decisioning. The system features stateful context management and human-in-the-loop escalation routing. Tech stack: Python, Multi-Agent AI frameworks, Stateful Workflows.`,
    tags: ['project', 'banking', 'AI agents', 'NBFC', 'KYC', 'loan'],
    keywords: ['agentic', 'banking', 'multi-agent', 'ai', 'nbfc', 'loan', 'kyc', 'foir', 'risk', 'python', 'stateful', 'human in the loop', 'escalation', 'financial', 'onboarding'],
  },
  {
    id: 'proj-02b',
    category: 'projects',
    title: 'Project — Agentic Banking Platform Design',
    content: `The Agentic AI Banking Platform demonstrates advanced AI engineering: multiple specialized agents handle distinct tasks (KYC agent, risk assessment agent, decisioning agent), with stateful context passed between them. Human-in-the-loop routing escalates edge cases to human reviewers. FOIR checks automatically calculate loan eligibility based on income and existing obligations. This project shows Rudrika's expertise in agentic AI system design and financial technology.`,
    tags: ['project', 'multi-agent', 'AI', 'banking', 'fintech'],
    keywords: ['multi-agent', 'stateful', 'kyc agent', 'risk agent', 'foir', 'loan eligibility', 'human in the loop', 'python', 'agentic ai', 'fintech', 'escalation routing'],
  },

  // ── PROJECTS — Twitter Sentiment ──────────────────────────────────────────
  {
    id: 'proj-03',
    category: 'projects',
    title: 'Project — Twitter Sentiment Analyser',
    content: `Twitter Sentiment Analyser is an ML classifier that categorises tweets as positive, negative, or neutral. Trained on the Sentiment140 dataset (1.6 million tweets) with a complete NLP preprocessing pipeline. Deployed as a real-time Streamlit web app. Tech stack: Python, NLP, Scikit-learn, TF-IDF vectorization, Streamlit.`,
    tags: ['project', 'NLP', 'sentiment analysis', 'machine learning', 'Streamlit'],
    keywords: ['twitter', 'sentiment', 'analyser', 'ml', 'machine learning', 'nlp', 'scikit-learn', 'tfidf', 'streamlit', 'sentiment140', 'classifier', 'tweets', 'positive', 'negative', 'neutral', 'python'],
  },

  // ── PROJECTS — Tech Blog ──────────────────────────────────────────────────
  {
    id: 'proj-04',
    category: 'projects',
    title: 'Project — Tech-Blog Website',
    content: `Tech-Blog Website is a full-stack blogging platform with RESTful APIs for blogs, comments, likes, and categories. Features JWT (JSON Web Token) authentication and a React Quill rich text editor for content creation. Tech stack: React, Node.js, Express.js, MongoDB, JWT authentication.`,
    tags: ['project', 'blog', 'full-stack', 'JWT', 'REST API'],
    keywords: ['tech blog', 'blogging', 'restful', 'api', 'jwt', 'authentication', 'react quill', 'rich text editor', 'comments', 'likes', 'react', 'nodejs', 'express', 'mongodb', 'full stack'],
  },

  // ── SKILLS — Languages ────────────────────────────────────────────────────
  {
    id: 'skill-01',
    category: 'skills',
    title: 'Skills — Programming Languages',
    content: `Rudrika is proficient in the following programming languages: Java, Python, JavaScript, C, and SQL. She uses Java for enterprise applications (e.g., ISRO internship), Python for AI/ML and backend APIs, JavaScript for full-stack web development, and SQL for relational data queries.`,
    tags: ['skills', 'languages', 'programming'],
    keywords: ['java', 'python', 'javascript', 'c', 'sql', 'programming', 'language', 'coding', 'scripting'],
  },
  {
    id: 'skill-02',
    category: 'skills',
    title: 'Skills — Frameworks & Libraries',
    content: `Rudrika works with: React.js (frontend UI), Node.js (server-side JS), Express.js (REST APIs), FastAPI (high-performance Python APIs), Streamlit (ML web apps), Socket.IO (real-time bidirectional events). She uses Next.js for full-stack React applications including this portfolio.`,
    tags: ['skills', 'frameworks', 'React', 'Node.js', 'Next.js'],
    keywords: ['react', 'reactjs', 'nodejs', 'express', 'expressjs', 'fastapi', 'streamlit', 'socket.io', 'nextjs', 'next.js', 'framework', 'library', 'frontend', 'backend'],
  },
  {
    id: 'skill-03',
    category: 'skills',
    title: 'Skills — Databases & Storage',
    content: `Rudrika has experience with: MongoDB (NoSQL document database — used in StaySync and Tech-Blog), Qdrant (vector database for semantic search and AI applications — used in StaySync for the AI chatbot).`,
    tags: ['skills', 'databases', 'MongoDB', 'Qdrant', 'vector database'],
    keywords: ['mongodb', 'qdrant', 'vector database', 'nosql', 'database', 'semantic search', 'embeddings', 'document store'],
  },
  {
    id: 'skill-04',
    category: 'skills',
    title: 'Skills — AI / ML',
    content: `Rudrika has hands-on AI/ML experience: LLM Agents (autonomous multi-agent systems), NLP (Natural Language Processing, text classification, TF-IDF), Scikit-learn (classical ML), vector databases (Qdrant), RAG systems (Retrieval-Augmented Generation). She has built production AI chatbots and multi-agent banking pipelines.`,
    tags: ['skills', 'AI', 'ML', 'LLM', 'NLP', 'RAG'],
    keywords: ['llm', 'agents', 'nlp', 'natural language processing', 'scikit-learn', 'machine learning', 'ai', 'ml', 'rag', 'retrieval augmented generation', 'vector', 'tfidf', 'classification', 'chatbot'],
  },
  {
    id: 'skill-05',
    category: 'skills',
    title: 'Skills — DevOps & Tools',
    content: `Rudrika is proficient with: Docker Compose (multi-container orchestration), Nginx (reverse proxy and web server), Git (version control), GitHub Actions (CI/CD pipelines), Linux (shell scripting and server management).`,
    tags: ['skills', 'DevOps', 'Docker', 'Git', 'Linux'],
    keywords: ['docker', 'docker compose', 'nginx', 'git', 'github actions', 'linux', 'devops', 'cicd', 'ci cd', 'containerization', 'shell', 'deployment', 'orchestration'],
  },
  {
    id: 'skill-06',
    category: 'skills',
    title: 'Skills — Core Competencies',
    content: `Rudrika's core competencies include: Data Structures & Algorithms (DSA), Data Analysis, Full-Stack Web Development, Machine Learning fundamentals, collaborative software development, system design, and problem-solving.`,
    tags: ['skills', 'DSA', 'algorithms', 'full stack', 'system design'],
    keywords: ['dsa', 'data structures', 'algorithms', 'data analysis', 'full stack', 'system design', 'machine learning', 'problem solving', 'collaborative', 'software engineering'],
  },

  // ── CERTIFICATES ──────────────────────────────────────────────────────────
  {
    id: 'cert-01',
    category: 'certificates',
    title: 'Certificate — Supervised Machine Learning: Regression and Classification',
    content: `Rudrika completed "Supervised Machine Learning: Regression and Classification" from DeepLearning.AI on Coursera in May 2026. This course covered regression and classification models, model evaluation techniques, and practical implementation in Python using Scikit-learn. The certification validates her understanding of core ML algorithms and supervised learning paradigms. Credential: https://www.coursera.org/account/accomplishments/verify/F83YMZ3DVKE6`,
    tags: ['certificate', 'machine learning', 'DeepLearning.AI', 'Coursera', 'regression', 'classification'],
    keywords: ['supervised machine learning', 'regression', 'classification', 'model evaluation', 'python', 'scikit-learn', 'deeplearning.ai', 'coursera', 'certificate', 'credentials', 'ml certification', 'may 2026'],
  },
  {
    id: 'cert-02',
    category: 'certificates',
    title: 'Certificate — Frontend Developer (React)',
    content: `Rudrika earned the Frontend Developer (React) certification from HackerRank in May 2026. This credential demonstrates her proficiency in React.js, JavaScript, and CSS for building responsive front-end applications. The certification validates her ability to develop modern user interfaces with React. Credential: https://www.hackerrank.com/certificates/29d25180739c`,
    tags: ['certificate', 'React', 'JavaScript', 'CSS', 'HackerRank', 'frontend'],
    keywords: ['frontend developer', 'react', 'reactjs', 'javascript', 'css', 'hackerrank', 'certificate', 'credentials', 'ui development', 'frontend certification', 'may 2026'],
  },
  {
    id: 'cert-03',
    category: 'certificates',
    title: 'Certificate — Strategy and Game Theory for Management',
    content: `Rudrika completed "Strategy and Game Theory for Management" from IIM Ahmedabad (IIMA) on Coursera on January 23, 2026. This course covered game theory principles, strategic decision-making, critical thinking, and management applications. The certification demonstrates her understanding of strategic frameworks applicable to business and organizational decisions. Credential: https://www.coursera.org/account/accomplishments/verify/2MEWQP9CI8GH`,
    tags: ['certificate', 'game theory', 'strategy', 'management', 'IIM Ahmedabad', 'business'],
    keywords: ['strategy', 'game theory', 'management', 'decision making', 'critical thinking', 'iim', 'iim ahmedabad', 'iima', 'coursera', 'certificate', 'january 2026', 'business strategy'],
  },
  {
    id: 'cert-04',
    category: 'certificates',
    title: 'Certificate — Business Analytics for Decision Making',
    content: `Rudrika completed "Business Analytics for Decision Making" from University of Colorado Boulder on Coursera on January 24, 2026. This course covered business analytics methodologies, optimization techniques, and data-driven decision making. The certification validates her ability to apply analytics to solve business problems and make informed strategic decisions. Credential: https://www.coursera.org/account/accomplishments/verify/9YTVEX6G8ARC`,
    tags: ['certificate', 'business analytics', 'data analysis', 'optimization', 'University of Colorado'],
    keywords: ['business analytics', 'analytics', 'optimization', 'data-driven decisions', 'decision making', 'university of colorado boulder', 'coursera', 'certificate', 'january 2026', 'business intelligence'],
  },
  {
    id: 'cert-05',
    category: 'certificates',
    title: 'Certificate — Go for Gold Contest - Gold Level',
    content: `Rudrika achieved Gold Level in the "Go for Gold Contest" by Accenture iAspire on December 26, 2025. This competitive achievement demonstrates her problem-solving abilities, competitive performance under pressure, and professional excellence. The Accenture iAspire program recognizes high-performing talent in technical and professional domains. Credential: https://www.linkedin.com/in/rudrika-panigrahi-6085b5268/overlay/Certifications/570408425/treasury/?profileId=ACoAAEGVnCgBVHbcyHMpjs36i2Lkz8H7ZXtJp4Y`,
    tags: ['certificate', 'Accenture', 'competition', 'gold level', 'problem solving'],
    keywords: ['go for gold', 'accenture', 'iaspire', 'gold level', 'problem solving', 'competitive', 'performance', 'professional excellence', 'december 2025', 'certificate', 'achievement'],
  },
  {
    id: 'cert-all',
    category: 'certificates',
    title: 'Certifications Overview — All Credentials',
    content: `Rudrika has earned 5 professional certifications across machine learning, frontend development, business strategy, and analytics. Her certifications include: Supervised Machine Learning (DeepLearning.AI/Coursera, May 2026), Frontend Developer React (HackerRank, May 2026), Strategy and Game Theory for Management (IIM Ahmedabad/Coursera, Jan 2026), Business Analytics for Decision Making (University of Colorado Boulder/Coursera, Jan 2026), and Gold Level in Accenture iAspire Go for Gold Contest (Dec 2025). These validate her expertise across technical, analytical, and strategic domains.`,
    tags: ['certificate', 'credentials', 'certifications', 'overview', 'professional development'],
    keywords: ['certificates', 'certifications', 'credentials', 'coursera', 'deeplearning.ai', 'hackerrank', 'iim', 'accenture', 'professional development', 'learning', 'qualifications', 'verified', 'certified'],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    id: 'contact-01',
    category: 'contact',
    title: 'Contact & Links — How to Reach Rudrika',
    content: `Contact Rudrika Panigrahi: Email: rudrika.812@gmail.com | Phone: +91-7855027314 | Location: KIIT University, Bhubaneswar, Odisha, India | GitHub: https://github.com/rudrika08 | LinkedIn: https://www.linkedin.com/in/rudrika-panigrahi-6085b5268/ | Resume/CV: https://drive.google.com/file/d/1YgSaJOxyoI3bzgsLHgB5-sLF2ppkyXC1/view?usp=sharing. She is open to full-time roles, internships, freelance projects, and collaboration opportunities in full-stack development and AI/ML.`,
    tags: ['contact', 'email', 'LinkedIn', 'GitHub', 'hire', 'resume'],
    keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'hire', 'reach', 'connect', 'resume', 'cv', 'location', 'bhubaneswar', 'odisha', 'opportunity', 'job', 'internship', 'collaborate'],
  },
]
