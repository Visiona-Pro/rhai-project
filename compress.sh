#!/bin/bash
ffmpeg -i ./UPSELL.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart ./UPSELL_web.mp4
ffmpeg -i ./VSL.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart ./VSL_web.mp4
