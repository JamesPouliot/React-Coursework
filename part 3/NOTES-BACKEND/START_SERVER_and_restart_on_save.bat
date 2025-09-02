cd %~dp0
npm run dev
:: because remember -- we already defined "dev" as the in the package.json file as being 'run index.js but allso --watch it so it restarts the server when there's a change
:: also, don't forget that you still need to refresh the browser after each change. That's unavoidable, according to the course.