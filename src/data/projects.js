import crime1 from '../assets/crime/crime-1.png';
import crime2 from '../assets/crime/crime-2.png';
import crime3 from '../assets/crime/crime-3.png';
import crime4 from '../assets/crime/crime-4.png';
import crime5 from '../assets/crime/crime-5.png';

export const projects = [
    {
        id: 1,
        title: "Architexture: AI Design Framework",
        category: "Generative AI",
        description: "Self-contained AI using local LLMs and GANs to generate and validate architectural designs.",
        fullDescription: "Developed a full-stack AI application using Python, PyTorch, and Flask. Trained models for multiple styles (Brutalism, Art Deco) and deployed the system as a web app. Utilizes Hugging Face transformers for design validation.",
        tags: ["Python", "PyTorch", "Flask", "GANs", "Hugging Face"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    },
    {
        id: 2,
        title: "Resume Ranker AI",
        category: "NLP & Automation",
        description: "AI system that analyzes and ranks resumes based on semantic similarity to job descriptions.",
        fullDescription: "Built with Flask and OpenAI LLMs. Implements text extraction from PDF/DOCX via pdfplumber and uses ClinicalBERT for advanced semantic understanding to identify skill gaps and align candidates with JDs.",
        tags: ["Flask", "OpenAI API", "ClinicalBERT", "NLP", "React"],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
    },
    {
        id: 3,
        title: "Predicting Hospital Readmissions",
        category: "Machine Learning",
        description: "ML pipeline predicting 30-day patient readmission risk with 74.7% accuracy.",
        fullDescription: "Analyzed 25K+ patient records using Random Forest and SMOTEENN for imbalance handling. Integrated Azure SQL for data management and deployed as a cloud application with ClinicalBERT recommendations.",
        tags: ["Scikit-learn", "Azure SQL", "Random Forest", "Python"],
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80"
    },
    {
        id: 4,
        title: "News Summarization & TTS",
        category: "NLP",
        description: "Full-stack app for news summarization, sentiment analysis, and Hindi text-to-speech.",
        fullDescription: "Applied TextRank and hybrid VADER-DistilBERT models for robust text processing. Containerized with Docker and deployed on Hugging Face Spaces for public access.",
        tags: ["Streamlit", "Docker", "Hugging Face", "VADER", "DistilBERT"],
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
    },
    {
        id: 5,
        title: "Predictive Crime Analysis",
        category: "Data Analytics",
        description: "Forecasting crime patterns in Karnataka using ARIMA time-series modeling.",
        fullDescription: "Engineered a predictive model achieving 85% accuracy. Created visual tools including heat maps and geographic clusters using Seaborn and Flask.",
        tags: ["ARIMA", "Seaborn", "Flask", "Scikit-learn"],
        image: crime1,
        gallery: [crime1, crime2, crime3, crime4, crime5]
    }
];
