from http.server import BaseHTTPRequestHandler
import json
import os
from pathlib import Path

def load_template():
    """Load the HTML template"""
    template_path = Path(__file__).parent.parent / 'templates' / 'index.html'
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "<html><body><h1>Template not found</h1></body></html>"

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests - serve the main page"""
        html = load_template()
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(html.encode('utf-8'))
        return
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return
