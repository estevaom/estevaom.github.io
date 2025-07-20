#!/bin/bash

# Build script for estevaom.github.io
# This script builds the entire site by:
# 1. Running the Rust build tool to generate API responses
# 2. Copying responses to the Vue app
# 3. Building the Vue app for production

set -e  # Exit on error

echo "🚀 Starting build process..."

# 1. Run Rust build tool
echo "📦 Building API with Rust..."
cd build
cargo run --release
cd ..

# 2. API responses are already in /dist/api/ for production

# 3. Build Vue app
echo "🛠️  Building Vue app for production..."
cd app
bun install
bun run build
cd ..

echo "✅ Build complete!"
echo ""
echo "The Vue app has been built to: app/dist/"
echo ""
echo "To test locally:"
echo "1. cd app && bun run preview"
echo "2. Or open app/dist/index.html in your browser"
echo ""
echo "To deploy:"
echo "1. Commit your changes"
echo "2. Push to GitHub" 
echo "3. GitHub Actions will automatically build and deploy"
