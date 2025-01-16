setlocal enabledelayedexpansion
cd %~dp0
set /p projectname=Enter the project title: 
echo You entered: !projectname!
call npm create vite@latest !projectname! -- --template react
cd !projectname!
call npm install
npm run dev