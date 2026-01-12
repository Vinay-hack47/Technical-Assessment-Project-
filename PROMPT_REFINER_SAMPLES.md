# Prompt Refiner - Sample Inputs and Outputs

This document contains 5 diverse examples demonstrating the Prompt Refiner system with different input types and their corresponding refined outputs.

---

## Sample 1: Text-Only Input - Web Application Requirements

### Input Type: Plain Text

### Input:
```
I need to build a social media dashboard application. The app should allow users to:
- Connect multiple social media accounts (Twitter, Instagram, Facebook)
- View analytics for each platform
- Schedule posts across platforms
- Generate reports

Technical constraints:
- Must use React for frontend
- Backend should be Node.js
- Database: MongoDB
- Must support real-time updates

Expected deliverables:
- Fully functional web application
- User authentication system
- Analytics dashboard
- Post scheduling interface
- PDF report generation
```

### Refined Output:
```json
{
  "intent": "Build a social media dashboard application for managing multiple platforms",
  "requirements": [
    "Connect multiple social media accounts (Twitter, Instagram, Facebook)",
    "View analytics for each platform",
    "Schedule posts across platforms",
    "Generate reports",
    "User authentication system",
    "Analytics dashboard",
    "Post scheduling interface",
    "PDF report generation"
  ],
  "constraints": [
    "Must use React for frontend",
    "Backend should be Node.js",
    "Database: MongoDB",
    "Must support real-time updates"
  ],
  "deliverables": [
    "Fully functional web application",
    "User authentication system",
    "Analytics dashboard",
    "Post scheduling interface",
    "PDF report generation"
  ],
  "metadata": {
    "sourceTypes": ["text"],
    "confidence": 0.9,
    "extractedText": "I need to build a social media dashboard application...",
    "timestamp": "2025-01-XX...",
    "fileCount": 0,
    "hasPlainText": true
  }
}
```

---

## Sample 2: Image Input - Product Sketch

### Input Type: Image (JPG/PNG)

### Input:
- Image file: `product-sketch.jpg` (contains a hand-drawn sketch of a mobile app interface with labels)

### Extracted Text (via OCR):
```
Mobile App Design
Home Screen:
- Navigation bar at top
- Search functionality
- Product categories
- Featured items carousel

Constraints:
- Must be responsive
- iOS and Android support
- Dark mode support
```

### Refined Output:
```json
{
  "intent": "Design a mobile application interface based on provided sketch",
  "requirements": [
    "Navigation bar at top",
    "Search functionality",
    "Product categories",
    "Featured items carousel",
    "Responsive design",
    "iOS and Android support",
    "Dark mode support"
  ],
  "constraints": [
    "Must be responsive",
    "iOS and Android support",
    "Dark mode support"
  ],
  "deliverables": [
    "Mobile app design",
    "Home screen interface",
    "Responsive layout"
  ],
  "metadata": {
    "sourceTypes": ["image"],
    "confidence": 0.75,
    "extractedText": "Mobile App Design\nHome Screen:\n- Navigation bar...",
    "timestamp": "2025-01-XX...",
    "fileCount": 1,
    "hasPlainText": false
  }
}
```

---

## Sample 3: PDF Document - Project Specification

### Input Type: PDF

### Input:
- PDF file: `project-spec.pdf` (contains a formal project specification document)

### Extracted Text (from PDF):
```
PROJECT SPECIFICATION: E-COMMERCE PLATFORM

OBJECTIVE:
Develop a comprehensive e-commerce platform for selling digital products.

FUNCTIONAL REQUIREMENTS:
1. User registration and authentication
2. Product catalog with search and filters
3. Shopping cart functionality
4. Payment gateway integration (Stripe)
5. Order management system
6. Email notifications
7. Admin dashboard

TECHNICAL CONSTRAINTS:
- Framework: Next.js 14
- Database: PostgreSQL
- Authentication: NextAuth.js
- Payment: Stripe API
- Hosting: Vercel
- Must be SEO optimized

DELIVERABLES:
- Production-ready application
- Admin panel
- API documentation
- Deployment guide
- User manual
```

### Refined Output:
```json
{
  "intent": "Develop a comprehensive e-commerce platform for selling digital products",
  "requirements": [
    "User registration and authentication",
    "Product catalog with search and filters",
    "Shopping cart functionality",
    "Payment gateway integration (Stripe)",
    "Order management system",
    "Email notifications",
    "Admin dashboard"
  ],
  "constraints": [
    "Framework: Next.js 14",
    "Database: PostgreSQL",
    "Authentication: NextAuth.js",
    "Payment: Stripe API",
    "Hosting: Vercel",
    "Must be SEO optimized"
  ],
  "deliverables": [
    "Production-ready application",
    "Admin panel",
    "API documentation",
    "Deployment guide",
    "User manual"
  ],
  "metadata": {
    "sourceTypes": ["pdf"],
    "confidence": 0.85,
    "extractedText": "PROJECT SPECIFICATION: E-COMMERCE PLATFORM...",
    "timestamp": "2025-01-XX...",
    "fileCount": 1,
    "hasPlainText": false
  }
}
```

---

## Sample 4: Word Document - Business Requirements

### Input Type: DOCX

### Input:
- Word document: `business-requirements.docx` (contains formatted business requirements)

### Extracted Text (from DOCX):
```
BUSINESS REQUIREMENTS DOCUMENT

Project: Customer Relationship Management System

Purpose:
Implement a CRM system to manage customer interactions and improve sales processes.

Key Features Required:
• Contact management
• Lead tracking
• Sales pipeline visualization
• Email integration
• Reporting and analytics

Business Constraints:
- Budget: $50,000
- Timeline: 6 months
- Must integrate with existing Salesforce
- Compliance: GDPR requirements

Expected Outcomes:
- Improved customer retention by 20%
- Reduced sales cycle time
- Automated reporting
```

### Refined Output:
```json
{
  "intent": "Implement a CRM system to manage customer interactions and improve sales processes",
  "requirements": [
    "Contact management",
    "Lead tracking",
    "Sales pipeline visualization",
    "Email integration",
    "Reporting and analytics"
  ],
  "constraints": [
    "Budget: $50,000",
    "Timeline: 6 months",
    "Must integrate with existing Salesforce",
    "Compliance: GDPR requirements"
  ],
  "deliverables": [
    "CRM system",
    "Improved customer retention by 20%",
    "Reduced sales cycle time",
    "Automated reporting"
  ],
  "metadata": {
    "sourceTypes": ["docx"],
    "confidence": 0.8,
    "extractedText": "BUSINESS REQUIREMENTS DOCUMENT\nProject: Customer Relationship...",
    "timestamp": "2025-01-XX...",
    "fileCount": 1,
    "hasPlainText": false
  }
}
```

---

## Sample 5: Combined Input - Text + Image + PDF

### Input Type: Multiple (Text + Image + PDF)

### Input:
1. **Plain Text**: "I need a mobile app that matches this design and follows the specifications in the attached document."
2. **Image**: `ui-mockup.png` (contains a UI design mockup)
3. **PDF**: `technical-specs.pdf` (contains technical specifications)

### Extracted Text (Combined):
```
[From ui-mockup.png]
Mobile App UI Design
- Login screen with social auth
- Home feed with posts
- Profile page
- Settings menu

[From technical-specs.pdf]
Technical Specifications:
- React Native framework
- Firebase backend
- Real-time database
- Push notifications
- Image upload to S3

I need a mobile app that matches this design and follows the specifications in the attached document.
```

### Refined Output:
```json
{
  "intent": "Build a mobile application matching the provided UI design and following technical specifications",
  "requirements": [
    "Login screen with social auth",
    "Home feed with posts",
    "Profile page",
    "Settings menu",
    "React Native framework",
    "Firebase backend",
    "Real-time database",
    "Push notifications",
    "Image upload to S3"
  ],
  "constraints": [
    "Must match provided UI design",
    "React Native framework required",
    "Firebase backend required"
  ],
  "deliverables": [
    "Mobile application",
    "UI matching provided design",
    "Technical implementation per specifications"
  ],
  "metadata": {
    "sourceTypes": ["text", "image", "pdf"],
    "confidence": 0.88,
    "extractedText": "[From ui-mockup.png]\nMobile App UI Design...",
    "timestamp": "2025-01-XX...",
    "fileCount": 2,
    "hasPlainText": true
  }
}
```

---

## Sample 6: Rejected Input - Too Short

### Input Type: Plain Text

### Input:
```
Build app
```

### Response:
```json
{
  "success": false,
  "message": "Input too brief. Please provide more context.",
  "error": "INVALID_INPUT"
}
```

---

## Sample 7: Rejected Input - Spam

### Input Type: Plain Text

### Input:
```
https://example.com
```

### Response:
```json
{
  "success": false,
  "message": "Input appears to be spam or irrelevant.",
  "error": "INVALID_INPUT"
}
```

---

## Notes on Output Variations

1. **Confidence Scores**: 
   - Higher for longer, more structured inputs (0.8-0.9)
   - Lower for OCR-extracted content (0.7-0.8)
   - Lower for very short inputs (0.6-0.7)

2. **Requirements Extraction**:
   - May vary slightly based on AI model response
   - Fallback rules ensure minimum structure

3. **Metadata**:
   - `sourceTypes` array reflects all input types used
   - `fileCount` shows number of uploaded files
   - `hasPlainText` indicates if text input was provided

4. **Formatting**:
   - Bullet points converted to array items
   - Numbered lists preserved
   - Section headers used to identify categories

---

## Testing the Samples

To test these samples:

1. **Text-only**: Copy Sample 1 text into the textarea
2. **Image**: Upload a screenshot or image with text
3. **PDF**: Upload a PDF document
4. **DOCX**: Upload a Word document
5. **Combined**: Use textarea + upload multiple files
6. **Invalid**: Try short inputs to see validation

All samples should produce structured outputs matching the format shown above.
