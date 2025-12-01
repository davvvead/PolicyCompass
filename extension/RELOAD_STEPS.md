# Extension Reload Steps

## Quick Fix for CORS Error

The CORS headers have been added to the API. Now you need to:

### 1. Reload the Extension
```
1. Go to chrome://extensions/
2. Find "PolicyCompass - Government Service Navigator"
3. Click the REFRESH icon (small circular arrow at bottom right of card)
4. Wait for the refresh to complete
```

### 2. Go Back to ei.gc.ca
```
1. Navigate to https://www.canada.ca/en/employment-social-development/services/ei/eligibility/regular-benefit.html
2. Click the PC icon in the toolbar
3. Type a question: "What documents do I need?"
4. Click send
```

### 3. Expected Result
You should now see:
- Loading indicator while processing
- Response with summary text
- List of highlighted items on the page
- 5-step guidance in the next release

### 4. If Still Getting Errors
Open the Service Worker console:
```
1. chrome://extensions/
2. Find PolicyCompass extension
3. Click "Details"
4. Scroll down to "Inspect views"
5. Click "service worker"
6. Look for [PolicyCompass] log messages
```

The logs should show:
```
[PolicyCompass] Processing query: What documents do I need?
[PolicyCompass] API endpoint: http://localhost:3000/api/extension/process
[PolicyCompass] API response status: 200
[PolicyCompass] API response received: { success: true, summary: "...", ... }
```

If you see a 404 or connection error, make sure Next.js dev server is running:
```
ps aux | grep "next dev"
```

It should show something like:
```
node /Users/davvead/Documents/govai/frontend/node_modules/.bin/next dev
```
