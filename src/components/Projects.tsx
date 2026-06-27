"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  ExternalLink, Github, Star, Filter, 
  Terminal, ArrowRight, Sparkles, Shield, 
  Briefcase, Rocket, Code2
} from "lucide-react";
import TiltCard from "./TiltCard";
import { githubConfig, fetchGitHubRepos, GitHubRepo } from "@/lib/config";

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  url?: string;
  github?: string;
  status: 'live' | 'development' | 'archived';
  featured?: boolean;
  stars: number;
  category: string;
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Fetch GitHub repositories and convert to project format
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const repos = await fetchGitHubRepos();
        
        // Convert GitHub repos to project format
        const projects: Project[] = repos.map((repo, index) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description available",
          longDescription: repo.description ?? undefined, // Use description as long description if available, convert null to undefined
          tech: repo.language ? [repo.language] : [],
          url: repo.homepage ?? undefined, // Convert null to undefined for type safety
          github: repo.html_url,
          status: repo.archived ? 'archived' : repo.fork ? 'development' : 'live',
          featured: index < 3, // Feature first 3 projects
          stars: repo.stargazers_count,
          category: repo.language || "Other"
        }));
        
        setProjectsData(projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects from GitHub");
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchProjects();
  }, []);

  // Helper functions for project styling
  const getProjectColor = (category: string): string => {
    switch (category) {
      case "Frontend": return "warning";
      case "Backend": return "accent";
      case "DevOps": return "secondary";
      case "AI/ML": return "primary";
      default: return "primary";
    }
  };

  const getProjectGradient = (category: string): string => {
    switch (category) {
      case "Frontend": return "from-warning/20 to-warning/5";
      case "Backend": return "from-accent/20 to-accent/5";
      case "DevOps": return "from-secondary/20 to-secondary/5";
      case "AI/ML": return "from-primary/20 to-primary/5";
      default: return "from-primary/20 to-primary/5";
    }
  };

  const getProjectIcon = (category: string) => {
    switch (category) {
      case "Frontend": return <Rocket />;
      case "Backend": return <Briefcase />;
      case "DevOps": return <Shield />;
      case "AI/ML": return <Sparkles />;
      default: return <Sparkles />;
    }
  };

  const categories = ["All", "Frontend", "Backend", "DevOps", "AI/ML"];

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
  };

  if (loading) return <div className="flex h-[600px] items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-[600px] items-center justify-center">Error: {error}</div>;

  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-secondary/5" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-primary/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Explore my open source contributions and personal projects
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap gap-4 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
                activeFilter === category 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-transparent text-muted hover:bg-primary/10 border border-transparent'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
           {filteredProjects.map((project) => {
             const color = getProjectColor(project.category);
             const gradient = getProjectGradient(project.category);
             const IconComponent = getProjectIcon(project.category);
             
             return (
               <motion.div
                 key={project.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: (project.id * 0.1) }}
                 className="group"
               >
                 <TiltCard>
                   <div className="relative rounded-2xl glass border border-primary/20 overflow-hidden">
                     {/* Project Image/Background */}
                     <div className="absolute inset-0">
                       <div className="absolute inset-0 bg-gradient-to-tr {gradient} opacity-20" />
                       <div className="absolute inset-0 grid-opacity" />
                     </div>
                     
                     {/* Project Content */}
                     <div className="relative p-6">
                       {/* Header */}
                       <div className="mb-4 flex flex-col">
                         <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                         <div className="flex items-center gap-2 mb-2">
                           {IconComponent}
                           <span className="text-muted text-sm font-mono">{project.category}</span>
                         </div>
                         <p className="text-muted line-clamp-3">{project.description}</p>
                       </div>
                      
                      {/* Tech Stack */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tech.map((tech, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`px-2 py-1 rounded text-xs font-mono ${
                              color === 'primary' ? 'bg-primary/20 text-primary' :
                              color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                              color === 'accent' ? 'bg-accent/20 text-accent' :
                              'bg-warning/20 text-warning'
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        
                        {project.tech.length > 4 && (
                          <motion.span
                            key="more"
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className={`px-2 py-1 rounded text-xs font-mono ${
                              color === 'primary' ? 'bg-primary/20 text-primary' :
                              color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                              color === 'accent' ? 'bg-accent/20 text-accent' :
                              'bg-warning/20 text-warning'
                            }`}
                          >
                            +{project.tech.length - 4}
                          </motion.span>
                        )}
                      </div>
                      
                      {/* Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm font-mono transition-colors ${
                              color === 'primary' ? 'text-primary hover:text-primary/80' :
                              color === 'secondary' ? 'text-secondary hover:text-secondary/80' :
                              color === 'accent' ? 'text-accent hover:text-accent/80' :
                              'text-warning hover:text-warning/80'
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-mono text-muted hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                        
                        <div className="flex-grow" />
                        
                        <motion.div
                          animate={{ x: hoveredId === project.id ? 0 : 4 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center gap-1 text-sm font-mono ${
                            color === 'primary' ? 'text-primary' :
                            color === 'secondary' ? 'text-secondary' :
                            color === 'accent' ? 'text-accent' :
                            'text-warning'
                          }`}
                        >
                          <span className="text-xs">View</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      </div>
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <div className="px-2 py-1 rounded bg-warning/10 border border-warning/30">
                            <span className="text-xs font-mono text-warning">Featured</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Corner decoration */}
                      <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl ${
                        color === 'primary' ? 'border-primary/20' :
                        color === 'secondary' ? 'border-secondary/20' :
                        color === 'accent' ? 'border-accent/20' :
                        'border-warning/20'
                      }`} />
                    </div>
                  </div>
                </TiltCard>
                
                 {/* Long Description Modal Trigger */}
                <motion.div
                  onClick={() => {
                    setModalProject(project);
                    setShowModal(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  {/* Long Description Modal */}
                  {showModal && modalProject && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, damping: 15 }}
                        className="relative w-full max-w-2xl max-h-[80vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-4">{modalProject.name}</h3>
                          <div className="space-y-4">
                            <p className="text-muted">{modalProject.longDescription}</p>
                            {modalProject.tech.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {modalProject.tech.map((tech, index) => (
                                  <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`px-2 py-1 rounded text-xs font-mono ${
                                      getProjectColor(modalProject.category) === 'primary' ? 'bg-primary/20 text-primary' :
                                      getProjectColor(modalProject.category) === 'secondary' ? 'bg-secondary/20 text-secondary' :
                                      getProjectColor(modalProject.category) === 'accent' ? 'bg-accent/20 text-accent' :
                                      'bg-warning/20 text-warning'
                                    }`}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                              {modalProject.url && (
                                <a
                                  href={modalProject.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2 text-sm font-mono transition-colors ${
                                    getProjectColor(modalProject.category) === 'primary' ? 'text-primary hover:text-primary/80' :
                                    getProjectColor(modalProject.category) === 'secondary' ? 'text-secondary hover:text-secondary/80' :
                                    getProjectColor(modalProject.category) === 'accent' ? 'text-accent hover:text-accent/80' :
                                    'text-warning hover:text-warning/80'
                                  }`}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Live Demo</span>
                                </a>
                              )}
                              
                              {modalProject.github && (
                                <a
                                  href={modalProject.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm font-mono text-muted hover:text-white transition-colors"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>Code</span>
                                </a>
                              )}
                              
                              <div className="flex-grow" />
                              
                              <motion.div
                                animate={{ x: hoveredId === modalProject.id ? 0 : 4 }}
                                transition={{ duration: 0.2 }}
                                className={`flex items-center gap-1 text-sm font-mono ${
                                  getProjectColor(modalProject.category) === 'primary' ? 'text-primary' :
                                  getProjectColor(modalProject.category) === 'secondary' ? 'text-secondary' :
                                  getProjectColor(modalProject.category) === 'accent' ? 'text-accent' :
                                  'text-warning'
                                }`}
                              >
                                <span className="text-xs">View</span>
                                <ArrowRight className="w-3 h-3" />
                              </motion.div>
                            </div>
                          </div>
                          
                          <motion.button
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setShowModal(false);
                              setModalProject(null);
                            }}
                            className="w-full px-4 py-2 rounded-lg bg-primary/20 text-primary font-mono text-sm border border-primary/30 hover:bg-primary/30 transition-colors"
                          >
                            Close
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Show message when no projects match filter */}
          {filteredProjects.length === 0 && (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-full text-center py-12"
            >
              <h3 className="text-xl font-semibold text-muted mb-4">
                No projects found
              </h3>
              <p className="text-muted">
                Try adjusting your filters to see more projects.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glass border border-primary/20">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-muted font-mono text-sm">More projects on GitHub</span>
            <motion.a
              href="https://github.com/zing254"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
            >
              View All →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warning/50 to-transparent" />
    </section>
  );
}