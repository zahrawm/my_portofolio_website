import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, ChevronDown, Star } from 'lucide-react';
import fitnessImg from'../assets/fitness.png';
import ecommerceImg from '../assets/ecommerce.png';
import rideImg from '../assets/ride.png';

interface Project {
  title: string;
  description: string;
  image: string | any; 
  tech: string[];
  github: string;
  live: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface VisibilityState {
  [key: string]: boolean;
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  const projects: Project[] = [
    {
      title: 'E-commerce Website',
      description: 'An ecommerce website with MERN STACK',
      image: ecommerceImg,
      tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/zahrawm/woo--ecommerce-website',
      live: 'https://woo-ecommerce-website-frontend.vercel.app/'
    },
    {
      title: 'Gym Guide Fitness App',
      description: 'A fitness app that guides users through workouts',
      image: fitnessImg,
      tech: ['Flutter', 'Dart', 'Firebase', 'Material Design'],
      github: 'https://github.com/zahrawm/gym-guide-app',
      live: 'https://github.com/zahrawm/gym-guide-app'
    },
    {
      title: 'Bolt-Ride Sharing App',
      description: 'Flutter-based mobile app for rides',
      image: rideImg,
      tech: ['Flutter', 'Dart', 'Firebase', 'REST API'],
      github: 'https://github.com/zahrawm/Bolt-app',
      live: 'https://github.com/zahrawm/Bolt-app'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform">
      <div className=""> 
        <a 
          href={project.live} 
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            style={{ 
              minHeight: '192px',
              maxHeight: '192px'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop';
            }}
          />
        </a>
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
            <a 
              href={project.github} 
              className="text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a 
              href={project.live} 
              className="text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const handleSendMessage = (): void => {
    alert('Message sent! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-white">
      
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>
            
           
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm font-medium transition-all duration-200 hover:text-blue-600 ${
                    activeSection === section ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

           
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      
     
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">FA</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fatimah Adam
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Software Engineer & Mobile App Developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
          </div>
        </div>
      </section>
     
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Passionate Software Engineer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I'm a dedicated software engineer specializing in mobile app and website development. 
                I have experience working with leading tech companies including Really Great Tech, 
                Developers in Vogue, Ispace, and Namibra.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I'm passionate about creating intuitive mobile experiences and robust web applications 
                that solve real-world problems. When I'm not coding, I enjoy exploring new technologies 
                and contributing to the developer community.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/zahrawm" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/fatimah-adam" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:adamfatima2557@gmail.com" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">30+</div>
                    <div className="text-sm opacity-90">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm opacity-90">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Flutter</h4>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Dart</h4>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">JavaScript</h4>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">React</h4>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Node.js</h4>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Mobile Dev</h4>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">What I Do</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">Mobile App Development</h4>
                  <p className="text-gray-600">Creating cross-platform mobile apps with Flutter and native performance</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">Web Development</h4>
                  <p className="text-gray-600">Building responsive web applications with modern frameworks and technologies</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">Full Stack Solutions</h4>
                  <p className="text-gray-600">End-to-end development from frontend to backend with database integration</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">Experience</h4>
                  <p className="text-gray-600">Worked with Really Great Tech, Developers in Vogue, Ispace, and Namibra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Let's Work Together</h3>
                <p className="text-gray-600 mb-8">
                  I'm always excited about new opportunities and challenging projects. 
                  Let's discuss how we can bring your mobile and web ideas to life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">adamfatima2557@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">github.com/zahrawm</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">0545515826 / 0201112557</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Fatimah Adam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}