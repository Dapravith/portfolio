export type Language = 'en' | 'km';

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewWork: string;
    downloadResume: string;
    getInTouch: string;
    technologiesLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    codeButton: string;
    demoButton: string;
  };
  experience: {
    title: string;
  };
  skills: {
    title: string;
  };
  contact: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Rotha Dapravith',
      title: 'Full-Stack Developer & DevOps Engineer',
      description: 'Passionate about building scalable applications and implementing modern DevOps practices. Specialized in Java Spring Boot, React, NextJS, Docker, Kubernetes, and cloud technologies.',
      viewWork: 'View My Work',
      downloadResume: 'Download Resume',
      getInTouch: 'Get In Touch',
      technologiesLabel: 'Technologies I work with:',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Here are some of my recent projects that showcase my skills and experience',
      codeButton: 'Code',
      demoButton: 'Demo',
    },
    experience: {
      title: 'Work Experience',
    },
    skills: {
      title: 'Skills & Technologies',
    },
    contact: {
      title: 'Get In Touch',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Failed to send message. Please try again.',
    },
  },
  km: {
    nav: {
      home: 'ទំព័រដើម',
      about: 'អំពីខ្ញុំ',
      projects: 'គម្រោង',
      skills: 'ជំនាញ',
      contact: 'ទំនាក់ទំនង',
    },
    hero: {
      greeting: 'សួស្តី ខ្ញុំឈ្មោះ',
      name: 'រដ្ឋា ដាប្រវិត្ត',
      title: 'អ្នកអភិវឌ្ឍន៍ Full-Stack និង វិស្វករ DevOps',
      description: 'ចូលចិត្តបង្កើតកម្មវិធីដែលអាចពង្រីកបាន និងអនុវត្តវិធីសាស្ត្រ DevOps ទំនើប។ ជំនាញពិសេសលើ Java Spring Boot, React, NextJS, Docker, Kubernetes និងបច្ចេកវិទ្យាពពក។',
      viewWork: 'មើលការងាររបស់ខ្ញុំ',
      downloadResume: 'ទាញយកប្រវត្តិរូប',
      getInTouch: 'ទាក់ទងខ្ញុំ',
      technologiesLabel: 'បច្ចេកវិទ្យាដែលខ្ញុំប្រើ:',
    },
    projects: {
      title: 'គម្រោងពិសេស',
      subtitle: 'នេះគឺជាគម្រោងថ្មីៗរបស់ខ្ញុំដែលបង្ហាញពីជំនាញ និងបទពិសោធន៍របស់ខ្ញុំ',
      codeButton: 'កូដ',
      demoButton: 'ទស្សនា',
    },
    experience: {
      title: 'បទពិសោធន៍ការងារ',
    },
    skills: {
      title: 'ជំនាញ និងបច្ចេកវិទ្យា',
    },
    contact: {
      title: 'ទាក់ទងខ្ញុំ',
      nameLabel: 'ឈ្មោះ',
      namePlaceholder: 'ឈ្មោះរបស់អ្នក',
      emailLabel: 'អ៊ីមែល',
      emailPlaceholder: 'your.email@example.com',
      messageLabel: 'សារ',
      messagePlaceholder: 'សាររបស់អ្នក...',
      sendButton: 'ផ្ញើសារ',
      sending: 'កំពុងផ្ញើ...',
      successMessage: 'សារត្រូវបានផ្ញើដោយជោគជ័យ!',
      errorMessage: 'មិនអាចផ្ញើសារបានទេ។ សូមព្យាយាមម្តងទៀត។',
    },
  },
};
