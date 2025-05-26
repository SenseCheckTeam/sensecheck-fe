# Contoh Penggunaan Error Pages

## 1. Navigasi Manual ke Error Pages

Anda dapat mengunjungi error pages secara langsung melalui URL:

```
http://localhost:5173/error/400  - Bad Request
http://localhost:5173/error/401  - Unauthorized
http://localhost:5173/error/403  - Forbidden
http://localhost:5173/error/404  - Not Found
http://localhost:5173/error/500  - Internal Server Error
http://localhost:5173/error/502  - Bad Gateway
http://localhost:5173/error/503  - Service Unavailable
```

## 2. Halaman 404 Otomatis

Ketika user mengunjungi halaman yang tidak ada, mereka akan otomatis diarahkan ke halaman 404:

```
http://localhost:5173/halaman-yang-tidak-ada
http://localhost:5173/random-page
http://localhost:5173/xyz
```

## 3. Demo Interaktif

Kunjungi halaman demo untuk melihat semua error pages:

```
http://localhost:5173/error-demo
```

## 4. Penggunaan Programmatik

### Dalam komponen React:

```jsx
import { useNavigate } from 'react-router-dom';
import { navigateToError } from '../utils/errorHandler';

function MyComponent() {
  const navigate = useNavigate();

  const handleApiError = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        // Redirect ke halaman error berdasarkan status code
        navigateToError(response.status, navigate);
      }
    } catch (error) {
      // Redirect ke halaman error 500
      navigateToError(500, navigate);
    }
  };

  return (
    <button onClick={handleApiError}>
      Test API Call
    </button>
  );
}
```

### Dengan Enhanced API:

```jsx
import { createEnhancedAPI } from '../services/api/enhancedApi';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  const api = createEnhancedAPI(navigate);

  const loadData = async () => {
    // API akan otomatis redirect ke error page jika terjadi error
    const data = await api.content.getHome();
    if (data) {
      // Handle success
      console.log(data);
    }
    // Jika error, user sudah diarahkan ke error page
  };

  return (
    <button onClick={loadData}>
      Load Data
    </button>
  );
}
```

## 5. Error Boundary

Error Boundary akan menangkap JavaScript errors secara otomatis:

```jsx
// Trigger JavaScript error untuk testing
function TestErrorBoundary() {
  const triggerError = () => {
    throw new Error('Test error for ErrorBoundary');
  };

  return (
    <button onClick={triggerError}>
      Trigger JS Error
    </button>
  );
}
```

## 6. Kustomisasi Error Messages

Anda dapat menambahkan error code baru di `ErrorPage.jsx`:

```jsx
const errorConfigs = {
  // ... existing configs
  '429': {
    title: 'Too Many Requests',
    description: 'You have made too many requests. Please try again later.',
    suggestion: 'Wait a few minutes before making another request.',
    icon: (
      // Your custom icon SVG here
    )
  }
};
```

## 7. Testing Error Pages

### Manual Testing:
1. Kunjungi `/error-demo` untuk melihat semua error pages
2. Klik "Trigger JavaScript Error" untuk test ErrorBoundary
3. Kunjungi URL yang tidak ada untuk test 404

### Programmatic Testing:
```jsx
// Test redirect ke error page
navigate('/error/500');

// Test dengan utility function
navigateToError(404, navigate);

// Test API error handling
const api = createEnhancedAPI(navigate);
api.content.getSliders(); // Akan redirect jika API error
```

## 8. Styling Kustomisasi

Error pages menggunakan CSS classes yang dapat dikustomisasi:

```css
/* Kustomisasi warna error */
.error-number {
  color: #your-color;
}

/* Kustomisasi icon */
.error-icon-404 {
  /* Your custom styles */
}

/* Kustomisasi button */
.error-btn.primary {
  background-color: #your-color;
}
```

## 9. Integrasi dengan Monitoring

Anda dapat menambahkan error logging:

```jsx
// Di ErrorBoundary.jsx
componentDidCatch(error, errorInfo) {
  // Log ke service monitoring (Sentry, LogRocket, dll)
  console.error('ErrorBoundary caught an error:', error, errorInfo);
  
  // Kirim ke monitoring service
  // errorReportingService.captureException(error);
}
```

## 10. Best Practices

1. **Selalu provide recovery options** - Berikan tombol "Go Back" atau "Go Home"
2. **Clear error messages** - Jelaskan apa yang terjadi dan apa yang bisa dilakukan user
3. **Consistent styling** - Gunakan design system yang sama dengan aplikasi
4. **Responsive design** - Pastikan error pages terlihat baik di semua device
5. **Accessibility** - Gunakan proper heading hierarchy dan alt text
6. **Error logging** - Log errors untuk debugging dan monitoring
7. **User-friendly language** - Hindari technical jargon
8. **Quick recovery** - Buat proses recovery semudah mungkin
