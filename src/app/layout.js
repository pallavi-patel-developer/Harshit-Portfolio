import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "HARSHIT SHARMA | Director of Photography & Visual Artist",
  description: "The creative portfolio of Harshit Sharma, showcasing high-end cinematography, film direction, and fine-art photography.",
  keywords: ["cinematographer", "director of photography", "videographer", "harshit sharma", "commercial film", "fine art photography"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased min-h-screen bg-brand-bg text-brand-text relative overflow-x-hidden selection:bg-brand-accent selection:text-brand-bg font-sans">
        {/* Subtle persistent film grain overlay for an artistic photography feel */}
        <div className="fixed inset-0 pointer-events-none z-50 noise-overlay" />
        
        {/* Ambient background glows for visual richness */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glow pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glow pointer-events-none z-0" />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
