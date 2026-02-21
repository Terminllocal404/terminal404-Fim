import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CommunityPage } from './pages/CommunityPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { RequestPage } from './pages/RequestPage';
import { TermsOfUse } from './pages/TermsOfUse';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'sobre',
        Component: AboutPage,
      },
      {
        path: 'servicos',
        Component: ServicesPage,
      },
      {
        path: 'comunidade',
        Component: CommunityPage,
      },
      {
        path: 'equipe',
        Component: TeamPage,
      },
      {
        path: 'contato',
        Component: ContactPage,
      },
      {
        path: 'solicitacao',
        Component: RequestPage,
      },
      {
        path: 'termos-de-uso',
        Component: TermsOfUse,
      },
      {
        path: 'politica-de-privacidade',
        Component: PrivacyPolicy,
      },
    ],
  },
]);