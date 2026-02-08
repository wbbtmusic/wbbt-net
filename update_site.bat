@echo off
echo ==========================================
echo   WBBT.net Auto-Updater
echo ==========================================

echo [1/3] Adding all changes...
git add .

echo [2/3] Committing...
:: Get current date and time for commit message
set mydate=%date:/=-%
set mytime=%time::=-%
set mytime=%mytime: =0%

git commit -m "Auto-update: %mydate% %mytime%"

echo [3/3] Pushing to GitHub...
git push origin main

echo ==========================================
echo   DONE. Changes pushed to GitHub.
echo   Coolify deployment should trigger now.
echo ==========================================
timeout /t 5
