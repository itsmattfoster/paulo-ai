@echo off
echo ===================================
echo  Starting Content AI App
echo ===================================
echo.

:: Check if node_modules exists
if not exist node_modules (
    echo [ERROR] Dependencies not installed!
    echo Please run setup.bat first or run: npm install
    echo.
    pause
    exit /b 1
)

:: Check if .env exists
if not exist .env (
    echo [WARNING] .env file not found!
    echo Creating from .env.example...
    copy .env.example .env >nul
    echo.
    echo IMPORTANT: Edit the .env file and add your OpenAI API key!
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Starting development server...
echo.
echo The app will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

