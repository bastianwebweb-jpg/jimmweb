export interface Theme {
  name: string;
  bg: string;
  accent: string;
  border: string;
  glow: string;
  textTitle: string;
  textBody: string;
  bgImage: string;
  buttonClass: string;
}

export const PRODUCT_THEMES: Record<string, Theme> = {
  rap: {
    name: "RAP_ARSENAL",
    bg: "bg-black",
    accent: "text-red-600",
    border: "border-red-600/50",
    glow: "shadow-[0_0_30px_rgba(220,38,38,0.3)]",
    textTitle: "font-black italic uppercase tracking-tighter",
    textBody: "font-mono text-zinc-400",
    bgImage: "/images/rap-bg.jpg",
    buttonClass: "bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
  },
  disney: {
    name: "MAGIC_COLLECTION",
    bg: "bg-zinc-50",
    accent: "text-blue-500",
    border: "border-blue-200",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    textTitle: "font-serif font-bold tracking-normal text-zinc-900",
    textBody: "font-sans text-zinc-600",
    bgImage: "/images/disney-light-bg.jpg",
    buttonClass: "bg-blue-500 hover:bg-blue-600 shadow-md"
  },
  // Aquí puedes meter 'anime', 'rock', etc. en el futuro
};