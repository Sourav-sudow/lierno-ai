export const coursesData = {
  BCA: {
    name: "Bachelor of Computer Applications",
    years: {
      "1st Year": {
        subjects: {
          DBMS: {
            name: "Database Management System",
            topics: [
              {
                title: "Normalization",
                videoUrl: "https://www.youtube.com/embed/XXXXXXXX"
              },
              {
                title: "SQL",
                videoUrl: "https://www.youtube.com/embed/hlGoQC332VM",
                narration:
                  "In this lesson, we will learn SQL, which stands for Structured Query Language. SQL is used to store, retrieve, and manage data in databases. By the end of this lesson, you will understand how to write basic SQL queries and work with databases confidently."
              },
              {
                title: "ER Diagram",
                videoUrl: "https://www.youtube.com/embed/XXXXXXXX"
              },
              {
                title: "Transactions",
                videoUrl: "https://www.youtube.com/embed/XXXXXXXX"
              },
              {
                title: "Indexing",
                videoUrl: "https://www.youtube.com/embed/XXXXXXXX"
              }
            ]
          },
          DS: {
            name: "Data Structures",
            topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting Algorithms"]
          }
        }
      },
      "2nd Year": {
        subjects: {
          OS: {
            name: "Operating System",
            topics: ["Process Management", "Memory Management", "File Systems", "Deadlock", "Synchronization"]
          },
          WebDev: {
            name: "Web Development",
            topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"]
          }
        }
      },
      "3rd Year": {
        subjects: {
          ML: {
            name: "Machine Learning",
            topics: ["Linear Regression", "Decision Trees", "Neural Networks", "NLP", "Computer Vision"]
          },
          CloudComputing: {
            name: "Cloud Computing",
            topics: ["AWS", "Azure", "GCP", "Containers", "Kubernetes"]
          }
        }
      }
    }
  },
  BTech: {
    name: "Bachelor of Technology",
    years: {
      "1st Year": {
        subjects: {
          "Data Structures": {
            name: "Data Structures",
            topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting Algorithms"]
          },
          "Mathematics": {
            name: "Discrete Mathematics",
            topics: ["Set Theory", "Logic", "Graph Theory", "Combinatorics", "Recurrence Relations"]
          }
        }
      },
      "2nd Year": {
        subjects: {
          "Algorithms": {
            name: "Design & Analysis of Algorithms",
            topics: ["Divide & Conquer", "Dynamic Programming", "Greedy Algorithms", "NP Completeness", "Complexity Analysis"]
          },
          "Database": {
            name: "Database Systems",
            topics: ["Relational Model", "SQL", "Normalization", "Indexing", "Query Optimization"]
          }
        }
      },
      "3rd Year": {
        subjects: {
          "AI": {
            name: "Artificial Intelligence",
            topics: ["Search Algorithms", "Expert Systems", "Robotics", "Natural Language Processing", "Computer Vision"]
          },
          "SoftwareEngineering": {
            name: "Software Engineering",
            topics: ["SDLC", "Design Patterns", "Testing", "DevOps", "Agile Methodology"]
          }
        }
      }
    }
  },
  MCA: {
    name: "Master of Computer Applications",
    years: {
      "1st Year": {
        subjects: {
          "Advanced DBMS": {
            name: "Advanced Database Management System",
            topics: ["Query Optimization", "Transaction Management", "Distributed Databases", "NoSQL", "Data Warehousing"]
          },
          "AdvancedOS": {
            name: "Advanced Operating System",
            topics: ["Kernel Architecture", "Process Scheduling", "Memory Management", "I/O Systems", "Security"]
          }
        }
      },
      "2nd Year": {
        subjects: {
          "ML": {
            name: "Machine Learning",
            topics: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning", "NLP"]
          },
          "WebServices": {
            name: "Web Services & SOA",
            topics: ["REST APIs", "SOAP", "Microservices", "Docker", "API Gateway"]
          }
        }
      },
      "3rd Year": {
        subjects: {
          "ResearchMethodology": {
            name: "Research Methodology",
            topics: ["Research Design", "Data Collection", "Statistical Analysis", "Paper Writing", "Presentation Skills"]
          },
          "AdvancedAI": {
            name: "Advanced AI & Robotics",
            topics: ["Deep Neural Networks", "Autonomous Systems", "Computer Vision", "Sensor Technology", "Embedded AI"]
          }
        }
      }
    }
  }
};

export type Course = keyof typeof coursesData;
