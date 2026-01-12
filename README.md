# Customer Support AI Agent Chatbot

A modern, customizable AI-powered customer support chatbot built with Flask and OpenAI. This chatbot implements a comprehensive prompt template system for consistent, empathetic customer service interactions.

## Features

- 🤖 **AI-Powered Responses**: Uses OpenAI GPT models for intelligent, context-aware responses
- 🎨 **Modern UI**: Beautiful, responsive chat interface with smooth animations
- ⚙️ **Customizable**: Easy-to-configure agent personality, brand, and behavior
- 📝 **Comprehensive Prompt Template**: Implements the full customer support agent framework
- 🔄 **Conversation History**: Maintains context throughout the conversation
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure OpenAI API

1. Copy the example environment file:
```bash
copy env.example .env
```
(On Linux/Mac: `cp env.example .env`)

2. Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

You can get an API key from [OpenAI's website](https://platform.openai.com/api-keys).

### 3. Customize Agent Configuration

Edit `config.json` to customize your agent:

```json
{
  "brand_name": "Your Company",
  "agent_name": "Alex",
  "industry": "Customer Support",
  "tone": "friendly",
  "company_name": "Your Company Name",
  "products": ["Product A", "Product B"],
  "policies": ["Returns", "Shipping", "Warranty"],
  "common_issues": ["Order status", "Technical support", "Billing questions"]
}
```

### 4. Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## Configuration Options

### Agent Settings (`config.json`)

- **brand_name**: Your company/brand name
- **agent_name**: Name of the AI agent
- **industry**: Industry or product category
- **tone**: Communication style (formal/casual/friendly)
- **company_name**: Full company name
- **products**: Array of main products/services
- **policies**: Key policies customers ask about
- **common_issues**: Top support request types
- **doc_date**: Last documentation update date
- **faq_count**: Number of FAQ entries

### Environment Variables (`.env`)

- **OPENAI_API_KEY**: Your OpenAI API key (required)
- **OPENAI_MODEL**: Model to use (default: `gpt-3.5-turbo`, can use `gpt-4` for better quality)

## Deployment to Vercel

This application is configured for easy deployment to Vercel. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

1. **Push to GitHub/GitLab/Bitbucket**
2. **Import to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository
3. **Add Environment Variables**:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENAI_MODEL` = `gpt-3.5-turbo` (optional)
4. **Deploy**: Click deploy and your app will be live!

The project includes:
- `vercel.json` - Vercel configuration
- `api/` - Serverless function handlers
- `public/` - Static files (CSS, JS)

## Project Structure

```
.
├── app.py                 # Flask backend server (for local development)
├── api/                   # Vercel serverless functions
│   ├── index.py          # Main page handler
│   ├── chat.py           # Chat API endpoint
│   └── config.py         # Config API endpoint
├── public/                # Static files (served by Vercel)
│   ├── style.css         # Chat UI styles
│   └── script.js         # Frontend JavaScript
├── templates/             # HTML templates
│   └── index.html        # Main chat interface
├── config.json           # Agent configuration
├── requirements.txt      # Python dependencies
├── vercel.json           # Vercel deployment config
├── env.example           # Environment variables template
└── static/               # Static files (for local development)
    ├── style.css
    └── script.js
```

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. The agent will greet you automatically
3. Type your message and press Enter or click Send
4. The AI agent will respond based on the configured prompt template

## Features of the Prompt Template

The chatbot implements a comprehensive customer support framework:

- **5-Step Problem-Solving Structure**: Acknowledge → Clarify → Solve → Verify → Follow-up
- **Escalation Protocols**: Automatic detection of when to escalate to human agents
- **Special Scenario Handling**: Tailored responses for angry, confused, or technical customers
- **Safety & Compliance**: Built-in safeguards for sensitive information
- **Response Formatting**: Consistent formatting guidelines for clarity

## Customization

### Changing the Agent Personality

Edit `config.json` to modify:
- Agent name and brand
- Communication tone
- Industry focus
- Available products and policies

### Modifying the Prompt Template

The prompt template is built in the `build_system_prompt()` function in `app.py`. You can customize it to match your specific needs.

### Styling

Modify `static/style.css` to change the appearance of the chat interface.

## Troubleshooting

### "Please set your OPENAI_API_KEY"
- Make sure you've created a `.env` file with your API key
- Verify the key is correct and has sufficient credits

### Connection Errors
- Check that Flask is running on port 5000
- Verify your internet connection
- Ensure OpenAI API is accessible from your location

### Import Errors
- Run `pip install -r requirements.txt` to install all dependencies
- Make sure you're using Python 3.7 or higher

## License

This project is open source and available for customization.

## Support

For issues or questions, please check:
- OpenAI API documentation: https://platform.openai.com/docs
- Flask documentation: https://flask.palletsprojects.com/
