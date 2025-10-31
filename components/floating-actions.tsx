// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Download, X, Moon, Sun } from "lucide-react";

// export default function FloatingActions() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
//     setTheme(initialTheme);
//   }, []);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const handleDownloadResume = () => {
//     const link = document.createElement('a');
//     link.href = '/resume.pdf';
//     link.download = 'Rotha_Dapravith_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setIsExpanded(true);
//     setTimeout(() => setIsExpanded(false), 3000);
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
    
//     if (newTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   if (!isVisible || !mounted) return null;

//   return (
//     <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
//       {/* Theme Toggle Button */}
//       <Button
//         size="lg"
//         variant="outline"
//         className="rounded-full shadow-lg hover:shadow-xl transition-all"
//         onClick={toggleTheme}
//         aria-label="Toggle theme"
//       >
//         {theme === "light" ? (
//           <Moon className="h-5 w-5" />
//         ) : (
//           <Sun className="h-5 w-5" />
//         )}
//       </Button>

//       {/* Resume Download Button */}
//       {isExpanded ? (
//         <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom">
//           <span className="text-sm font-medium">Resume Downloaded! ✓</span>
//           <button
//             onClick={() => setIsExpanded(false)}
//             className="hover:opacity-80 transition-opacity"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       ) : (
//         <Button
//           size="lg"
//           className="rounded-full shadow-lg hover:shadow-xl transition-all gap-2 group"
//           onClick={handleDownloadResume}
//         >
//           <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
//           <span className="hidden sm:inline">Resume</span>
//         </Button>
//       )}
//     </div>
//   );
// }
