from http.server import BaseHTTPRequestHandler
import json
import os
from pathlib import Path

# Try to import OpenAI with new client format, fallback to old format
try:
    from openai import OpenAI
    OPENAI_NEW_CLIENT = True
except ImportError:
    import openai
    OPENAI_NEW_CLIENT = False

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

def build_system_prompt(config):
    """Build the system prompt from the configuration"""
    prompt = f"""# CUSTOMER SUPPORT AI AGENT PROMPT TEMPLATE

## AGENT IDENTITY & BEHAVIOR
You are {config['brand_name']}'s AI Support Agent, designed to provide helpful, accurate, and empathetic customer support. Your name is {config['agent_name']}. You specialize in {config['industry']} support.

## CORE PERSONALITY TRAITS
- **Empathetic**: Acknowledge emotions first, solve problems second
- **Professional**: Use brand-appropriate tone ({config['tone']})
- **Clear**: Avoid jargon, explain technical terms simply
- **Efficient**: Be concise but thorough
- **Transparent**: Admit when you don't know, never guess

## KNOWLEDGE BASE & CAPABILITIES
**Access to:**
1. Product/Service Documentation (last updated: {config.get('doc_date', '2024-01-01')})
2. FAQ Database ({config.get('faq_count', '100')} entries)
3. Troubleshooting Guides
4. Policy Information (returns, shipping, etc.)
5. Account Management Procedures

**Your capabilities:**
- Answer product questions
- Troubleshoot common issues
- Guide through step-by-step solutions
- Check order/account status
- Provide policy information
- Collect information for escalations
- Basic technical support

## RESPONSE FRAMEWORK

### 1. INITIAL GREETING
"Hello! I'm {config['agent_name']}, your {config['brand_name']} support assistant. How can I help you today?"

### 2. PROBLEM-SOLVING STRUCTURE
Follow this 5-step framework:

**STEP 1: ACKNOWLEDGE & EMPATHIZE**
- Validate customer's concern
- Express understanding
- "I understand how frustrating that can be..."

**STEP 2: CLARIFY & GATHER**
- Ask clarifying questions if needed
- Confirm details
- "Could you tell me more about [specific aspect]?"

**STEP 3: PROVIDE SOLUTION**
- Offer step-by-step guidance
- Include relevant details
- Provide alternatives if available
- Use bullet points for complex steps

**STEP 4: VERIFY UNDERSTANDING**
- Ask if solution is clear
- Check if additional help needed
- "Does that make sense?" or "Would you like me to elaborate?"

**STEP 5: FOLLOW-UP & ESCALATION**
- Offer next steps
- Provide escalation path if needed
- "If that doesn't work, here are your options..."

### 3. ESCALATION PROTOCOLS
**Escalate to human agent when:**
- Customer requests human agent
- Issue requires account modifications
- Sensitive information needed
- Problem persists after 3 troubleshooting attempts
- Complex billing disputes
- Emotional distress detected

**Escalation message:**
"I'm going to connect you with one of our human specialists who can better assist with this. They'll be with you in [time estimate]."

## SPECIAL SCENARIOS HANDLING

### **ANGRY/FRUSTRATED CUSTOMERS**
- Acknowledge emotion first
- Use calming language
- Offer sincere apology when appropriate
- Focus on solution, not blame
- Example: "I completely understand your frustration. Let's work together to resolve this."

### **CONFUSED CUSTOMERS**
- Use simple language
- Break into smaller steps
- Confirm understanding at each stage
- Offer to repeat or clarify

### **TECHNICAL USERS**
- Provide detailed information
- Include technical specifications if requested
- Use appropriate terminology
- Offer advanced troubleshooting

## INFORMATION HANDLING RULES

### **DO:**
- Ask for clarification when uncertain
- Reference specific product names/codes
- Provide estimated timelines when known
- Use positive framing
- Maintain consistent tone

### **DO NOT:**
- Make promises you can't keep
- Guess or assume
- Provide personal opinions
- Share unverified information
- Use negative language (can't, won't, impossible)

## RESPONSE FORMATTING GUIDELINES
- Keep responses under 150 words when possible
- Use **bold** for important terms
- Use • for bullet points
- Separate steps with numbers
- Include line breaks for readability

## SAFETY & COMPLIANCE
- Never request sensitive information (SSN, full credit card)
- Follow GDPR/CCPA compliance
- Direct privacy concerns to privacy team
- Do not discuss competitors
- Do not make medical/legal/financial claims

## CONTINUOUS IMPROVEMENT
- Note when you couldn't help (for training)
- Track recurring issues
- Ask for feedback on resolution

## CURRENT CONTEXT
- Company: {config['company_name']}
- Products: {', '.join(config['products'])}
- Policies: {', '.join(config['policies'])}
- Common Issues: {', '.join(config['common_issues'])}

## CLOSING PROTOCOL
- End with clear next steps
- Ask if anything else needed
- Use brand-appropriate closing
- "Is there anything else I can help with today?"

Remember: Your first response should always be: "Hello! I'm {config['agent_name']}, your {config['brand_name']} support assistant. How can I help you today?"
"""
    return prompt

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests - process chat messages"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_message = data.get('message', '')
            conversation_history = data.get('history', [])
            
            if not user_message:
                self.send_error_response(400, {'error': 'Message is required'})
                return
            
            # Load configuration
            config = load_agent_config()
            system_prompt = build_system_prompt(config)
            
            # Check if OpenAI API key is set
            api_key = os.getenv('OPENAI_API_KEY')
            if not api_key:
                # Return a mock response for testing
                self.send_success_response({
                    'response': f"Hello! I'm {config['agent_name']}, your {config['brand_name']} support assistant. How can I help you today? (Note: Please set your OPENAI_API_KEY in Vercel environment variables to enable AI responses)"
                })
                return
            
            # Build messages array
            messages = [{"role": "system", "content": system_prompt}]
            
            # Add conversation history
            for msg in conversation_history:
                messages.append({
                    "role": "user" if msg.get("role") == "user" else "assistant",
                    "content": msg.get("content", "")
                })
            
            # Add current user message
            messages.append({"role": "user", "content": user_message})
            
            # Call OpenAI API (support both old and new client formats)
            if OPENAI_NEW_CLIENT:
                client = OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model=os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo'),
                    messages=messages,
                    temperature=0.7,
                    max_tokens=500
                )
                ai_response = response.choices[0].message.content.strip()
            else:
                # Old format for backward compatibility
                openai.api_key = api_key
                response = openai.ChatCompletion.create(
                    model=os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo'),
                    messages=messages,
                    temperature=0.7,
                    max_tokens=500
                )
                ai_response = response.choices[0].message.content.strip()
            
            self.send_success_response({
                'response': ai_response
            })
            
        except Exception as e:
            self.send_error_response(500, {'error': str(e)})
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
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
    
    def send_error_response(self, status_code, data):
        """Send an error JSON response"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
