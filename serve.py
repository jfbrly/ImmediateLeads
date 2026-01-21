#!/usr/bin/env python3

import http.server
import socketserver
import os
import webbrowser

# Change to the directory where this script is located
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

print(f"Starting server at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    # Try to open the browser automatically
    try:
        webbrowser.open(f'http://localhost:{PORT}')
    except:
        pass
    
    httpd.serve_forever()
