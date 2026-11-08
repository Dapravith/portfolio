export type Language = 'en' | 'km';

export interface Translations {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    hook: string;
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
    subtitle: string;
    description: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
      ai: string;
    };
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
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Rotha Dapravith',
      hook: 'Building software that works, scales, and lasts.',
      title: 'Full-Stack Developer & DevOps Engineer',
      description: 'I build full-stack applications and reliable delivery workflows with Java Spring Boot, React, and cloud technologies.',
      viewWork: 'View Experience',
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
      title: 'Skills & Expertise',
      subtitle: 'Technologies and tools I use to deliver reliable solutions',
      description: 'Browse my front-end, back-end, DevOps, and AI-assisted engineering tools.',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools & DevOps',
        ai: 'AI Assisted Tools',
      },
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
      experience: 'បទពិសោធន៍',
      projects: 'គម្រោង',
      skills: 'ជំនាញ',
      contact: 'ទំនាក់ទំនង',
    },
    hero: {
      greeting: 'សួស្តី ខ្ញុំឈ្មោះ',
      name: 'រដ្ឋា ដាប្រាវីត',
      hook: 'បង្កើតកម្មវិធីដែលអាចទុកចិត្ត ពង្រីក និងប្រើប្រាស់បានយូរអង្វែង។',
      title: 'អ្នកអភិវឌ្ឍ Full-Stack និងវិស្វករ DevOps',
      description: 'ខ្ញុំបង្កើតកម្មវិធី Full-Stack និងដំណើរការដាក់ឱ្យប្រើប្រាស់ដែលអាចទុកចិត្តបាន ដោយប្រើ Java Spring Boot, React និងបច្ចេកវិទ្យាពពក។',
      viewWork: 'មើលបទពិសោធន៍ការងារ',
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
      subtitle: 'បច្ចេកវិទ្យា និងឧបករណ៍ដែលខ្ញុំប្រើសម្រាប់បង្កើតដំណោះស្រាយដ៏ទុកចិត្តបាន',
      description: 'ស្វែងយល់អំពីបច្ចេកវិទ្យា Frontend, Backend, DevOps និងឧបករណ៍ AI ដែលខ្ញុំប្រើ។',
      categories: {
        frontend: 'ផ្នែកខាងមុខ',
        backend: 'ផ្នែកខាងក្រោយ',
        tools: 'ឧបករណ៍ និង DevOps',
        ai: 'ឧបករណ៍ AI',
      },
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
