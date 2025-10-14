@echo off
echo ===================================
echo  Content AI App - Quick Setup
echo ===================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

:: Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
echo.
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

:: Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo.
    echo IMPORTANT: Edit the .env file and add your OpenAI API key!
    echo.
) else (
    echo [OK] .env file already exists
    echo.
)

echo ===================================
echo  Setup Complete!
echo ===================================
echo.
echo Next steps:
echo 1. Edit the .env file and add your OpenAI API key
echo 2. Run: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo Press any key to exit...
pause >nul

