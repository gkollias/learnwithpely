import { getInstance } from './index';

// eslint-disable-next-line import/prefer-default-export
export const authenticationGuard = (to, from, next) => {
  const authService = getInstance();
  const guardAction = () => {
    if (authService.isAuthenticated) {
      return next();
    }

    return authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If the Auth0Plugin has loaded already, check the authentication state
  if (!authService.loading) {
    return guardAction();
  }

  return authService.$watch('loading', (loading) => {
    if (loading === false) {
      return guardAction();
    }

    return null;
  });
};
