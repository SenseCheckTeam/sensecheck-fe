# Error Pages Documentation

This directory contains all error-related components and utilities for the SenseCheck application.

## Components

### 1. ErrorPage.jsx
A comprehensive error page component that handles various HTTP status codes:
- **400** - Bad Request
- **401** - Unauthorized  
- **403** - Forbidden
- **404** - Not Found (also has dedicated NotFound component)
- **500** - Internal Server Error
- **502** - Bad Gateway
- **503** - Service Unavailable

**Usage:**
```jsx
// Accessed via route: /error/:statusCode
// Example: /error/404, /error/500, etc.
```

### 2. NotFound.jsx
A dedicated 404 error page with enhanced UX:
- Friendly error message
- Navigation suggestions
- Back button functionality
- Link to homepage

**Usage:**
```jsx
// Automatically shown for unmatched routes
// Accessed via catch-all route: /*
```

### 3. ErrorDemo.jsx
A demonstration page showcasing all error pages:
- Interactive error code cards
- JavaScript error trigger
- Usage examples
- Code snippets

**Usage:**
```jsx
// Accessed via route: /error-demo
```

### 4. ErrorBoundary.jsx (in components/)
A React Error Boundary component that catches JavaScript errors:
- Catches unhandled React errors
- Shows user-friendly error message
- Provides recovery options
- Development error details

## Utilities

### errorHandler.js
Utility functions for error handling:

```javascript
import { 
  navigateToError, 
  handleApiError, 
  fetchWithErrorHandling 
} from '../utils/errorHandler';

// Navigate to specific error page
navigateToError(404, navigate);

// Handle API errors automatically
try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    handleApiError(response, navigate);
  }
} catch (error) {
  handleApiError(error, navigate);
}

// Enhanced fetch with automatic error handling
const response = await fetchWithErrorHandling('/api/data', {}, navigate);
```

## Styling

### ErrorPages.css
Comprehensive styling for all error components:
- Responsive design
- Consistent with app theme
- Smooth animations
- Accessibility features

## Routes

The following routes are configured in App.jsx:

```javascript
// Error routes
<Route path="/error/:statusCode" element={<ErrorPage />} />
<Route path="/error-demo" element={<ErrorDemo />} />

// 404 catch-all (within Layout)
<Route path="*" element={<NotFound />} />
```

## Error Boundary Integration

The entire app is wrapped with ErrorBoundary:

```javascript
<ErrorBoundary>
  <AuthProvider>
    {/* App content */}
  </AuthProvider>
</ErrorBoundary>
```

## Best Practices

1. **Use appropriate status codes**: Match the error type to the correct HTTP status code
2. **Provide helpful messages**: Give users clear information about what went wrong
3. **Offer recovery options**: Always provide ways for users to continue
4. **Log errors**: Use console.error or error reporting services
5. **Test error scenarios**: Regularly test error pages and boundaries

## Testing Error Pages

Visit `/error-demo` to test all error pages interactively, or manually navigate to:
- `/error/400` - Bad Request
- `/error/401` - Unauthorized
- `/error/403` - Forbidden
- `/error/404` - Not Found
- `/error/500` - Internal Server Error
- `/error/502` - Bad Gateway
- `/error/503` - Service Unavailable
- `/non-existent-page` - 404 via catch-all route

## Customization

To add new error types:

1. Add the error configuration to `ErrorPage.jsx`
2. Update the `errorConfigs` object with new status code
3. Add corresponding utility functions if needed
4. Update this documentation

## Accessibility

All error pages include:
- Proper heading hierarchy
- Descriptive alt text for icons
- Keyboard navigation support
- Screen reader friendly content
- High contrast colors
