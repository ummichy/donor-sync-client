// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import router from './Routes/Routes.jsx'
// import { RouterProvider } from 'react-router'
// import AuthProvider from './Provider/AuthProvider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//  <RouterProvider
//           router={router}
//           fallbackElement={<div className="text-center py-8 text-lg">Loading...</div>}
//         />
//     </AuthProvider>
  
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
