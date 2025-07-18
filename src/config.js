let BackendUrl = ''
let FrontendUrl = ''
let PublicUrl = ''
let DomainUrl = ''

if (import.meta.env.VITE_BACKEND_URL) {
    BackendUrl = import.meta.env.VITE_BACKEND_URL;
}

if (import.meta.env.VITE_FRONTEND_URL) {
    FrontendUrl = import.meta.env.VITE_FRONTEND_URL;
  }

if (import.meta.env.VITE_FRONTEND_PUBLIC_URL) {
    PublicUrl = import.meta.env.VITE_FRONTEND_PUBLIC_URL
}
if (import.meta.env.VITE_DOMAIN_URL) {
    DomainUrl = import.meta.env.VITE_DOMAIN_URL
} 
export const PUBLIC_NEXT_URL = import.meta.env.VITE_PUBLIC_NEXT_URL

export {BackendUrl,FrontendUrl,PublicUrl,DomainUrl};