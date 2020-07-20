import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          enableBearerInterceptor: true,
          initOptions: {
            // onLoad: 'login-required',
            checkLoginIframe: true,
          },
          // bearerExcludedUrls: ['/', '/signup']
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
}