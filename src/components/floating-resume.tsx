// "use client";

// import { Button } from "@/components/ui/button";
// import { Download, X } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function FloatingResume() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       // Show button after scrolling down 300px
//       if (window.pageYOffset > 500) {
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
    
//     // Show success message
//     setIsExpanded(true);
//     setTimeout(() => setIsExpanded(false), 3000);
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed bottom-8 right-8 z-50">
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
