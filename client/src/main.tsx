import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { init } from '@/telegram/init.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './telegram/mockEnv.ts';

import { EnvUnsupported } from './components/EnvUnsupported.tsx';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './app.tsx';
import Home from './pages/home.tsx';
import Onboarding from './pages/onboarding.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Create a new router instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
    ],
  },
]);

const queryClient = new QueryClient()

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {

    root.render(
      <StrictMode>
        <AppRoot
          appearance={'dark'}
          platform={'base'}
        >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
          </QueryClientProvider>
        </AppRoot>
      </StrictMode>,
    )
  }
} catch (e) {
  root.render(<EnvUnsupported/>);
}
