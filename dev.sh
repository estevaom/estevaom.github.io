#!/bin/bash

# Development script for estevaom.github.io

set -e

echo "🚀 Starting development environment..."

# 1. Make sure API responses exist
if [ ! -f "dist/api/responses.json" ]; then
    echo "📦 Building API with Rust..."
    cd build
    cargo run
    cd ..
fi

# 2. Copy API responses for dev server
echo "📋 Copying API responses for dev server..."
mkdir -p app/public/dist/api
cp dist/api/responses.json app/public/dist/api/responses.json

# 3. Start dev server
echo "🛠️  Starting Vue dev server..."
cd app
bun run dev
