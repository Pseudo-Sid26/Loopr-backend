# LooprAnalytics Backend Deployment Guide - Render

This guide will walk you through deploying the LooprAnalytics backend to Render without Docker.

## Prerequisites

1. **MongoDB Atlas Account**: Ensure you have a MongoDB Atlas cluster set up
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **GitHub Repository**: Your code should be pushed to a GitHub repository

## Deployment Steps

### 1. Prepare Your Repository

Make sure your backend code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### 2. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository and branch (usually `main`)

### 3. Configure Build Settings

In the Render configuration:

- **Name**: `loopr-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose the closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 4. Set Environment Variables

In your Render service settings, add these environment variables:

#### Required Environment Variables:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Environment
NODE_ENV=production

# Frontend URL (update when you deploy frontend)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

#### Optional Environment Variables:

```bash
# Custom port (Render sets this automatically)
PORT=10000
```

### 5. MongoDB Atlas Configuration

Ensure your MongoDB Atlas cluster allows connections from Render:

1. Go to MongoDB Atlas Dashboard
2. Navigate to "Network Access"
3. Click "Add IP Address"
4. Add `0.0.0.0/0` (allow from anywhere) or add Render's IP ranges
5. Save the changes

### 6. Deploy

1. Click "Create Web Service" in Render
2. Render will automatically build and deploy your application
3. Monitor the build logs for any errors

### 7. Verify Deployment

Once deployed, test your API endpoints:

- Health check: `https://your-app-name.onrender.com/health`
- Root endpoint: `https://your-app-name.onrender.com/`

## Important Notes

### Security Considerations

1. **Environment Variables**: Never commit sensitive data like JWT secrets or database credentials
2. **CORS**: Update the CORS configuration in `server.ts` with your actual frontend URL
3. **HTTPS**: Render provides HTTPS by default

### Performance Optimization

1. **Free Tier Limitations**: 
   - Services go to sleep after 15 minutes of inactivity
   - 750 hours/month limit
   - Consider upgrading to paid plan for production

2. **Cold Start**: First request after sleep may take 10-30 seconds

### Monitoring

1. Check Render logs for any runtime errors
2. Monitor MongoDB Atlas for connection issues
3. Set up alerts for service downtime

## Troubleshooting

### Common Issues

1. **Build Fails**: 
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation works locally

2. **Database Connection Issues**:
   - Verify MongoDB URI is correct
   - Check MongoDB Atlas network access settings
   - Ensure database user has proper permissions

3. **Environment Variables**:
   - Verify all required environment variables are set
   - Check for typos in variable names

4. **CORS Issues**:
   - Update CORS configuration with your frontend URL
   - Test API endpoints directly first

### Logs

Access logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. Monitor for errors and warnings

## Next Steps

1. **Frontend Deployment**: Deploy your React frontend to Vercel or Netlify
2. **Custom Domain**: Add a custom domain in Render settings
3. **SSL Certificate**: Render provides free SSL certificates
4. **Monitoring**: Set up monitoring and alerts for production

## Support

If you encounter issues:
1. Check Render documentation
2. Review application logs
3. Test database connectivity
4. Verify environment variables

---

## Environment Variables Reference

Copy these to your Render service environment variables:

```bash
MONGODB_URI=mongodb+srv://siddhesh26pseudo:n4xMucqSyVBAxSX2@financedb.xkrknnv.mongodb.net/LooprFinDB?retryWrites=true&w=majority&appName=FinanceDB
JWT_SECRET=your-jwt-secret-key-change-this-for-production
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**⚠️ Important**: Change the JWT_SECRET to a strong, unique secret for production!
