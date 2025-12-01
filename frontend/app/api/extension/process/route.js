import { NextResponse } from 'next/server';

// CORS headers for extension requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Mock responses for EI content - trained context specific to demo
const EI_MOCK_RESPONSES = {
  default: {
    summary: `Employment Insurance (EI) helps workers who have lost their job due to no fault of their own. This page explains how to apply for regular EI benefits.

**Disclaimer:** This response is machine-generated based on official government content. Always confirm details by reading the official documentation on Service Canada's website.`,
    guidance: [
      "Step 1: Check if you qualify for EI regular benefits",
      "Step 2: Gather all required documents before applying",
      "Step 3: Create a Service Canada account or sign in",
      "Step 4: Complete your online EI application (takes about 1 hour)",
      "Step 5: Send your Records of Employment (ROE) from your employer"
    ],
    highlights: [
      "Apply within 4 weeks of your last day of work",
      "You'll need your social insurance number",
      "Direct deposit gets you payments within 2 business days",
      "Application saves automatically for 72 hours",
      "Service Canada may request your Records of Employment"
    ]
  },
  documents: {
    summary: `You'll need to gather several documents and pieces of information before applying for EI regular benefits.

**Disclaimer:** This is a machine-generated summary. The official Service Canada website has the complete and most current requirements.`,
    guidance: [
      "Step 1: Get your Social Insurance Number (SIN) card",
      "Step 2: Gather your parent's birth certificate (need last name at birth)",
      "Step 3: Collect all job information from the past 52 weeks",
      "Step 4: Request Records of Employment (ROE) from each employer",
      "Step 5: Prepare your banking information for direct deposit",
      "Step 6: Have your mailing and residential addresses ready"
    ],
    highlights: [
      "Your social insurance number (SIN)",
      "If your SIN begins with 9: proof of immigration status and work permit",
      "Last name at birth of one parent",
      "Your mailing address and postal code",
      "Your residential address and postal code",
      "Employer names and addresses",
      "Employment start and end dates for the past 52 weeks",
      "Reason for leaving each job (resignation, termination, layoff)",
      "Bank institution name, branch transit number, and account number",
      "Records of Employment (ROE) from each employer",
      "Any vacation pay, severance, or other separation payments received"
    ]
  },
  direct_deposit: {
    summary: `Direct deposit is the fastest way to get your EI payments. Instead of waiting for a cheque, your money goes directly into your bank account.

**Disclaimer:** This is a machine-generated explanation. Check Service Canada for current payment timelines and methods.`,
    guidance: [
      "Step 1: Have your banking information ready (find it on your cheque or online banking)",
      "Step 2: Know your financial institution name (e.g., Royal Bank, TD, Scotiabank)",
      "Step 3: Get your bank branch (transit) number (3 digits)",
      "Step 4: Have your account number ready (5-12 digits)",
      "Step 5: Set up direct deposit during your EI application",
      "Step 6: Receive payments within 2 business days of application approval"
    ],
    highlights: [
      "Payments arrive within 2 business days of application approval",
      "Much faster than receiving paper cheques by mail",
      "Need your financial institution name (bank name)",
      "Need your bank branch (transit) number",
      "Need your bank account number",
      "You can update banking information anytime",
      "Service Canada never asks for passwords or PINs",
      "All information is encrypted and secure"
    ]
  },
  canada_post: {
    summary: `Canada Post is experiencing a labour disruption that may affect mail delivery of EI documents and benefit payments.

**Disclaimer:** This summary is machine-generated. Check both Service Canada and Canada Post websites for current disruption status.`,
    guidance: [
      "Step 1: Set up direct deposit to receive payments electronically",
      "Step 2: Use online services at My Service Account to check status",
      "Step 3: Save all important documents digitally",
      "Step 4: Keep your phone number and email current in your account",
      "Step 5: Contact Service Canada by phone if urgent",
      "Step 6: Sign up for email notifications about your application"
    ],
    highlights: [
      "Mail delivery may be delayed or disrupted",
      "Use direct deposit to avoid mail delays for payments",
      "Check your EI status online instead of waiting for letters",
      "Keep copies of your application confirmation",
      "Save your Records of Employment electronically",
      "Update your contact information immediately",
      "Provide an email address for all notifications",
      "Keep your phone number active for Service Canada contact",
      "Service Canada phone: 1-866-864-9735",
      "Hours: Monday to Friday, 8:00 AM to 8:00 PM (your local time)"
    ]
  },
  qualifying: {
    summary: `To qualify for EI regular benefits, you must meet specific conditions about employment, hours worked, and reason for job loss.

**Disclaimer:** This is a machine-generated overview. Service Canada website has official eligibility criteria and can determine your specific situation.`,
    guidance: [
      "Step 1: Confirm you lost your job through no fault of your own",
      "Step 2: Verify you worked the required insurable hours",
      "Step 3: Check that you haven't refused a job offer recently",
      "Step 4: Ensure you're ready and able to work",
      "Step 5: Confirm you're a Canadian resident or have work authorization"
    ],
    highlights: [
      "Lost your job due to lack of work, layoff, or temporary shutdown",
      "Worked enough insurable hours (varies by region: 420-700 hours)",
      "Hours worked in the past 52 weeks or since last claim",
      "Are ready, willing, and able to work",
      "Are actively looking for work",
      "Are Canadian resident or authorized to work in Canada",
      "Did not refuse a suitable job offer",
      "Did not quit your job without just cause",
      "Are not working more than 3 hours per week",
      "Did not cause your own unemployment through misconduct"
    ]
  }
};

export async function POST(request) {
  try {
    const { query, pageContent, pageTitle, pageUrl } = await request.json();

    // Determine which mock response to use based on query keywords
    let response = EI_MOCK_RESPONSES.default;

    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('direct deposit') || queryLower.includes('bank') || queryLower.includes('payment method')) {
      response = EI_MOCK_RESPONSES.direct_deposit;
    } else if (queryLower.includes('document') || queryLower.includes('need') || queryLower.includes('gather') || queryLower.includes('prepare') || queryLower.includes('bring')) {
      response = EI_MOCK_RESPONSES.documents;
    } else if (queryLower.includes('canada post') || queryLower.includes('mail') || queryLower.includes('disruption') || queryLower.includes('letter')) {
      response = EI_MOCK_RESPONSES.canada_post;
    } else if (queryLower.includes('qualif') || queryLower.includes('eligible') || queryLower.includes('requirements') || queryLower.includes('criteria')) {
      response = EI_MOCK_RESPONSES.qualifying;
    }

    return NextResponse.json({
      success: true,
      summary: response.summary,
      guidance: response.guidance,
      highlights: response.highlights,
      query,
      pageTitle: pageTitle || 'Government Service Page'
    }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Extension API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your request',
        guidance: [
          "There was an error processing your request. Please try again or visit the official government website directly."
        ]
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({}, {
    headers: corsHeaders
  });
}
