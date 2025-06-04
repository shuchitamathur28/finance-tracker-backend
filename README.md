Deployment Instructions:

### 1. Create a `.env` File

```env
ATLAS_URI=your_mongodb_uri
TOKEN_KEY=your_jwt_secret
```

### 2. Make sure this file is in your `.gitignore`:
```bash
# .gitignore
config.env
```

### 3. Update CORS Settings
In your server.js file, update the CORS configuration to allow your frontend to access the backend:

```
const corsOptions = {
  origin: "http://your-frontend-url.com", // Replace with your actual frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
```
Make sure to replace "http://your-frontend-url.com" with the URL where your frontend is hosted.
