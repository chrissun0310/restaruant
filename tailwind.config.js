export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#180706",
        lacquer: "#8f1616",
        cinnabar: "#b92720",
        vermilion: "#d8432e",
        gold: "#d8ad55",
        palegold: "#f2d998",
        paper: "#f8efd7"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(216, 173, 85, .18)",
        insetGold: "inset 0 0 0 1px rgba(216,173,85,.34)"
      },
      fontFamily: {
        sans: ["Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "sans-serif"],
        song: ["Songti SC", "STSong", "SimSun", "serif"]
      }
    }
  },
  plugins: []
};
