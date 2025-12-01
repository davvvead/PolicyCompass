# PolicyCompass Extension - Demo Testing Guide

## Quick Setup (5 minutes)

### 1. Load Extension in Chrome
- Open Chrome
- Go to `chrome://extensions/`
- Enable **Developer mode** (toggle top right)
- Click **Load unpacked**
- Select folder: `/Users/davvead/Documents/govai/extension`
- Extension should appear in toolbar with "PC" icon

### 2. Verify Backend is Running
- Ensure Next.js dev server is running: `npm run dev` in `/frontend` folder
- Server will run on `http://localhost:3000` or `http://localhost:3001` (if 3000 is busy)
- Test endpoint: `curl http://localhost:3001/api/extension/process` (adjust port if needed)

### 3. Test on EI.gc.ca
- Visit: https://www.canada.ca/en/employment-social-development/services/ei/eligibility/regular-benefit.html
- Click the **PC icon** in toolbar → Opens popup
- Type in extension popup: "How do I apply for EI?"
- **Click send** → Watch the floating widget appear and respond
- Response should include:
  - Summary: "Employment Insurance helps workers..."
  - Highlights: "Complete and submit your online application..."
  - Guidance: Step-by-step instructions (5 steps)

## Demo Narrative

**Act 1: PolicyCompass App**
> "User comes to our PolicyCompass app, describes their situation (lost job, need benefits), and our AI creates a personalized action plan."
> *Click "Open Official Guidance" button for Step 1*

**Act 2: Extension Takes Over**
> "Our extension follows them to the government website. Instead of being overwhelmed by legal language, the extension simplifies it, highlights key requirements, and guides them step-by-step."
> *Show extension widget on ei.gc.ca with highlights and guidance*

**Act 3: Multi-language Support**
> "They can switch languages in the extension settings" 
> *Show popup language radio buttons (EN/FR/ES)*

## Key Demo Points to Highlight

✅ **Simplification**: Complex legal text → Clear, simple language  
✅ **Highlighting**: Key requirements visually marked on page  
✅ **Guidance**: 5-step action plan instead of overwhelming documentation  
✅ **Accessibility**: Works across all 6 government domain patterns  
✅ **Companion Product**: App + Extension working together  

## Troubleshooting

**Extension doesn't load:**
- Check manifest.json syntax: `node -e "console.log(JSON.parse(require('fs').readFileSync('/Users/davvead/Documents/govai/extension/manifest.json', 'utf8')))"`
- Verify icons exist: `ls -la /Users/davvead/Documents/govai/extension/icons/`

**Extension loads but widget doesn't appear on EI.gc.ca:**
- Check console: Right-click page → Inspect → Console tab
- Verify host_permissions in manifest.json include the site

**API returns 404:**
- Confirm Next.js is running: `ps aux | grep "next dev"`
- Check endpoint: `curl http://localhost:3000/api/extension/process`

**Different response than expected:**
- Query keywords trigger different mock responses:
  - "direct deposit" → Direct deposit guidance
  - "documents" → What to bring guidance
  - "canada post" → Disruption guidance
  - Default → General EI application guidance
