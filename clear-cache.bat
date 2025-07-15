@echo off
echo Clearing development cache...

REM Stop any running gulp processes
taskkill /IM "node.exe" /F 2>nul

REM Go to project directory
cd my-project

REM Clean the dist directory
gulp clean

REM Rebuild everything
gulp build

REM Start dev server
gulp dev

echo.
echo Cache cleared and dev server restarted!
echo.
echo If you still see cached styles in browser:
echo 1. Press Ctrl+Shift+R (hard refresh)
echo 2. Open DevTools (F12) ^> Settings ^> Disable cache (while DevTools is open)
echo 3. Or clear browser cache manually
