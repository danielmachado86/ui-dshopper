import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  
  return async () => {
    from(keycloak.keycloakEvents$).subscribe(event => console.log(event));
    return keycloak.init({
      config: environment.keycloak,
      enableBearerInterceptor: true,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/', '/signup'],
    });
  }
}