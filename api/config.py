from http.server import BaseHTTPRequestHandler
import json
from pathlib import Path

def load_agent_config():
    """Load the agent configuration from config.json"""
    config_path = Path(__file__).parent.parent / 'config.json'
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        # Return default configuration
        return {
            "brand_name": "Your Company",
            "agent_name": "Alex",
            "industry": "Customer Support",
            "tone": "friendly",
            "company_name": "Your Company Name",
            "products": ["Product A", "Product B"],
            "policies": ["Returns", "Shipping", "Warranty"],
            "common_issues": ["Order status", "Technical support", "Billing questions"]
        }

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests - return agent configuration"""
        config = load_agent_config()
        self.send_success_response(config)
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return
    
    def send_success_response(self, data):
        """Send a successful JSON response"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
