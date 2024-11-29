import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { init } from '@/telegram/init.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './telegram/mockEnv.ts';

import { routeTree } from './routeTree.gen.ts'
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { EnvUnsupported } from './components/EnvUnsupported.tsx';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

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
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AppRoot>
      </StrictMode>,
    )
  }
} catch (e) {
  root.render(<EnvUnsupported/>);
}
