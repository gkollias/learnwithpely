import { getInstance } from './index';

// eslint-disable-next-line import/prefer-default-export
export const authenticationGuard = (to, from, next) => {
  const authService = getInstance();
  // eslint-disable-next-line no-console
  console.log('test');
  const guardAction = () => {
    // eslint-disable-next-line no-console
    console.log('Here:');
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
    // eslint-disable-next-line no-console
    console.log('Loading:', loading);
    // eslint-disable-next-line no-console
    console.log('Here2:');
    if (loading === false) {
      return guardAction();
    }

    return null;
  });
};
