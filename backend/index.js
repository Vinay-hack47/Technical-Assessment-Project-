import app from "./app.js";

const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "https://technical-assessment-project-8fje.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.listen(PORT, () => {
  console.log("🚀 Backend running on port", PORT);
});
