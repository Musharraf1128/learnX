import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Welcome: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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
    // For demo purposes - in real app this would use React Router
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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 border-b border-neutral-800">
        <div className="text-2xl font-bold">LearnX</div>
        <button
          onClick={handleTryItOut}
          className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-all"
        >
          Try it out →
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            Your AI Tutor for{' '}
            <span className="underline decoration-neutral-400 decoration-2">Everything</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transform any textbook into interactive lessons. Get personalized learning paths.
            Master concepts by building real projects.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mb-16"
          >
            {!submitted ? (
              <div className="max-w-md mx-auto">
                <div className="flex gap-3 mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your email for early access"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-white transition-colors"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-all"
                  >
                    Join Waitlist
                  </button>
                </div>
                {error && <p className="text-neutral-400 text-sm">{error}</p>}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white font-medium text-lg mb-2">🎉 You're on the list!</p>
                <p className="text-neutral-400">We'll notify you when LearnX launches</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-6 py-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Learning is Broken</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="border border-neutral-800 rounded-xl p-6">
              <div className="text-neutral-400 font-medium mb-2">Problem</div>
              <p className="text-white mb-4">Textbooks are overwhelming and boring</p>
              <div className="text-neutral-400 font-medium mb-2">Solution</div>
              <p className="text-neutral-400">AI converts them into bite-sized, interactive lessons</p>
            </div>
            <div className="border border-neutral-800 rounded-xl p-6">
              <div className="text-neutral-400 font-medium mb-2">Problem</div>
              <p className="text-white mb-4">One-size-fits-all education doesn't work</p>
              <div className="text-neutral-400 font-medium mb-2">Solution</div>
              <p className="text-neutral-400">Personalized paths that adapt to your pace</p>
            </div>
            <div className="border border-neutral-800 rounded-xl p-6">
              <div className="text-neutral-400 font-medium mb-2">Problem</div>
              <p className="text-white mb-4">Passive learning leads to poor retention</p>
              <div className="text-neutral-400 font-medium mb-2">Solution</div>
              <p className="text-neutral-400">Learn by doing with real projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How LearnX Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-neutral-800 rounded-xl p-8 hover:border-neutral-600 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-neutral-800 rounded-xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Learn Smarter?</h2>
          <p className="text-neutral-400 mb-8 text-lg">
            Join our waitlist for early access and help shape the future of AI education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleTryItOut}
              className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-all"
            >
              Try LearnX Now
            </button>
            <span className="text-neutral-500 text-sm">No signup required</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-6">Let's Build the Future of Learning</h3>
          
          <div className="flex flex-col justify-center items-center gap-4 text-neutral-400 mb-8">
            <a
              href="mailto:musharraf.learnx@gmail.com"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <HiOutlineMail size={20} /> musharraf.learnx@gmail.com
            </a>
            <a
              href="https://github.com/Musharraf1128/learnX"
              className="hover:text-white transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/musharaf-shah-0904451b7/"
              className="hover:text-white transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} /> LinkedIn
            </a>
          </div>
      
          <p className="text-neutral-500 text-sm">
            © 2025 LearnX. Building personalized AI education.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
