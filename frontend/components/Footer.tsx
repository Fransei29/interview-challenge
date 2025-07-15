"use client";

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  CommandLineIcon,
  PaintBrushIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const techStack = [
    {
      name: "Next.js",
      icon: CodeBracketIcon,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "TypeScript",
      icon: CommandLineIcon,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      name: "Tailwind CSS",
      icon: PaintBrushIcon,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="mt-12 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
        <div className="flex items-center justify-center space-x-8 text-muted-foreground">
          {techStack.map((tech) => {
            const IconComponent = tech.icon;
            return (
              <motion.div 
                key={tech.name}
                className="flex items-center space-x-2 group cursor-pointer"
                variants={itemVariants}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className={`w-8 h-8 bg-gradient-to-br ${tech.gradient} rounded-lg flex items-center justify-center shadow-md`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className="w-4 h-4 text-white" />
                </motion.div>
                <span className="font-medium group-hover:text-card-foreground transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
        <motion.p 
          className="mt-4 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          Backend: NestJS + TypeORM + SQLite | Built with modern web technologies
        </motion.p>
        <motion.div 
          className="mt-2 flex items-center justify-center space-x-2"
          variants={itemVariants}
        >
          <span className="text-sm text-muted-foreground font-medium">
            Made with
          </span>
          <motion.div
            transition={{ duration: 0.3 }}
          >
            <HeartIcon className="w-4 h-4 text-red-500" />
          </motion.div>
          <span className="text-sm text-muted-foreground font-medium">
            by Franco Seiler
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
} 