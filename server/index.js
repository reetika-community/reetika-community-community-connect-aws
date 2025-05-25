import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const path = require("path");
const _dirname = path.dirname("");
const buildpath = path.join(_dirname,"../client/build");
// appendFile.use(XPathExpression.s)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
