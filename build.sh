#!/bin/bash

echo "🔨 Starting TypeScript build..."

# Clean dist directory
rm -rf dist

# Run TypeScript compiler
npx tsc

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Output directory: dist/"
    echo "🚀 Ready to run: npm start"
else
    echo "❌ Build failed!"
    exit 1
fi
