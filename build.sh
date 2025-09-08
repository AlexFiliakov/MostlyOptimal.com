#!/bin/bash
# Build script for Cloudflare Pages
echo "Starting build process..."
npm run build
echo "Build complete. Checking output directory..."
ls -la out/
echo "Ready for deployment"