#!/bin/bash
ffmpeg -i ./VSL.mp4 -c:v libx264 -crf 32 -preset slow -vf scale=360:640 -c:a aac -b:a 64k -movflags +faststart ./VSL_web.mp4 -y
