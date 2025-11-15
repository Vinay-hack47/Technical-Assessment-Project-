import app from "./app.js";

const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  
  "https://technical-assessment-project-8fje.vercel.app"
];

// FIXED: Proper CORS config
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.listen(PORT, () => {
  console.log("🚀 Backend running on port", PORT);
});
