import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    console.log('Waitlist email:', email);
    setSubmitted(true);
    setError(null);
  };

  const handleTryItOut = () => {
    window.location.href = '/new';
  };

  const features = [
    {
      icon: '📄',
      title: 'PDF to Interactive Courses',
      desc: 'Transform textbooks like NCERT chapters into engaging, interactive lessons with AI explanations.',
    },
    {
      icon: '🧠',
      title: 'Personalized Learning Paths',
      desc: 'Custom study plans that adapt to your goals, level, and learning pace.',
    },
    {
      icon: '💡',
      title: 'Learn by Building',
      desc: 'Master concepts through hands-on projects and real-world applications.',
    },
    {
      icon: '🤖',
      title: 'AI Tutor Chat',
      desc: 'Get instant explanations and guided practice problems tailored to your style.',
    },
  ];

  const useCases = [
    {
      title: '🎓 Students',
      desc: 'Interactive NCERT lessons. Personalized JEE, NEET, and board exam prep.',
    },
    {
      title: '💼 Professionals',
      desc: 'Master DSA, ML, and tech skills through building real projects.',
    },
    {
      title: '🔬 Self-Learners',
      desc: 'Explore any topic with AI guidance - from physics to programming.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white font-sans">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md border-b border-neutral-800/50"
      >
        <div className="text-2xl font-bold tracking-tight">LearnX</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTryItOut}
          className="bg-white text-black px-6 py-2.5 rounded-full font-medium tracking-tight hover:bg-neutral-200 transition-all duration-300 shadow-lg"
        >
          Try it out →
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Your AI Tutor for{' '}
            <span className="relative">
              Everything
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-neutral-400/50 to-neutral-600/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed tracking-wide"
          >
            Transform any textbook into interactive lessons. Get personalized learning paths.
            Master concepts by building real projects.
          </motion.p>
          <AnimatePresence>
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto"
              >
                <div className="flex gap-4 mb-4">
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your email for early access"
                    whileFocus={{ borderColor: 'rgba(255,255,255,0.5)' }}
                    className="flex-1 bg-neutral-900/30 border border-neutral-700/50 rounded-full px-6 py-3 text-white placeholder-neutral-500 outline-none focus:border-white/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="bg-white text-black px-6 py-3 rounded-full font-medium tracking-tight hover:bg-neutral-200 transition-all duration-300 shadow-lg"
                  >
                    Join Waitlist
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm tracking-tight"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-white font-medium text-lg mb-2 tracking-tight">🎉 You're on the list!</p>
                <p className="text-neutral-300 tracking-tight">We'll notify you when LearnX launches</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-8 bg-neutral-950/30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight mb-12"
          >
            Learning is Broken
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                problem: 'Textbooks are overwhelming and boring',
                solution: 'AI converts them into bite-sized, interactive lessons',
              },
              {
                problem: 'One-size-fits-all education doesn’t work',
                solution: 'Personalized paths that adapt to your pace',
              },
              {
                problem: 'Passive learning leads to poor retention',
                solution: 'Learn by doing with real projects',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(255,255,255,0.1)' }}
                className="border border-neutral-800/30 rounded-2xl p-6 bg-neutral-900/20 backdrop-blur-sm transition-all duration-300"
              >
                <div className="text-neutral-300 font-medium mb-2 tracking-tight">Problem</div>
                <p className="text-white mb-4 tracking-tight">{item.problem}</p>
                <div className="text-neutral-300 font-medium mb-2 tracking-tight">Solution</div>
                <p className="text-neutral-300 tracking-tight">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-center mb-16"
          >
            How LearnX Works
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(255,255,255,0.1)' }}
                className="border border-neutral-800/30 rounded-2xl p-8 bg-neutral-900/20 backdrop-blur-sm transition-all duration-300"
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-neutral-300 leading-relaxed tracking-tight">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-8 bg-neutral-950/30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-center mb-16"
          >
            Perfect For
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(255,255,255,0.1)' }}
                className="border border-neutral-800/30 rounded-2xl p-6 bg-neutral-900/20 backdrop-blur-sm text-center transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed tracking-tight">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight mb-6"
          >
            Ready to Learn Smarter?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-300 mb-8 text-lg tracking-tight"
          >
            Join our waitlist for early access and help shape the future of AI education
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryItOut}
              className="bg-white text-black px-8 py-3 rounded-full font-medium tracking-tight hover:bg-neutral-200 transition-all duration-300 shadow-lg"
            >
              Try LearnX Now
            </motion.button>
            <span className="text-neutral-400 text-sm tracking-tight">No signup required</span>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/30 py-12 px-8 bg-neutral-950/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg font-semibold mb-6 tracking-tight"
          >
            Let's Build the Future of Learning
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center items-center gap-4 text-neutral-300 mb-8"
          >
            <a
              href="mailto:musharraf.learnx@gmail.com"
              className="hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <HiOutlineMail size={20} />
              </motion.div>
              musharraf.learnx@gmail.com
            </a>
            <a
              href="https://github.com/Musharraf1128/learnX"
              className="hover:text-white transition-colors duration-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <FaGithub size={20} />
              </motion.div>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/musharaf-shah-0904451b7/"
              className="hover:text-white transition-colors duration-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <FaLinkedin size={20} />
              </motion.div>
              LinkedIn
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-neutral-400 text-sm tracking-tight"
          >
            © 2025 LearnX. Building personalized AI education.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
