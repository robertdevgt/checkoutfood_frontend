import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppRouter from "./router";
import './index.css'
import 'leaflet/dist/leaflet.css';

const queryCliente = new QueryClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>
      <AppRouter />
    </QueryClientProvider>

    <Toaster position='top-right' />
  </StrictMode>,
)
