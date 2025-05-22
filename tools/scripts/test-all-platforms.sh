#!/bin/bash

echo "Testing Web Application..."
cd ~/repos/Royal-mz
npm run lint
npm run build
npm run test

echo "Testing Desktop Application..."
cd ~/repos/Royal-mz/platforms/electron
npm run lint
npm run build

echo "Testing Mobile Application..."
cd ~/repos/Royal-mz/platforms/mobile
npm run lint
npm run test

echo "Testing Shared Library..."
cd ~/repos/Royal-mz/packages/shared-types
npm run build

echo "Testing API Client..."
cd ~/repos/Royal-mz/packages/api-client
npm run build

echo "Testing UI Components..."
cd ~/repos/Royal-mz/packages/ui-components
npm run build

echo "Testing Utils..."
cd ~/repos/Royal-mz/packages/utils
npm run build

echo "Testing WebSocket Service..."
cd ~/repos/Royal-mz/services/websocket
npm run build

echo "All tests completed!"
