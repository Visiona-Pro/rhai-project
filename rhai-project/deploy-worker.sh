#!/bin/bash
set -e
cd "$(dirname "$0")/r2-video-worker"
npx wrangler deploy
