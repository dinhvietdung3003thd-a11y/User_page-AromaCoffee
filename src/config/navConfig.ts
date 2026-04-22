import { routePaths } from '../router/routePaths';

export const centerNavLinks = [
  { label: 'Home', to: routePaths.home },
  { label: 'Our Product', to: routePaths.ourProduct },
  { label: 'My Orders', to: routePaths.myOrders },
  { label: 'Profile', to: routePaths.profile }
] as const;
