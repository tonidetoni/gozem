import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {CustomInterceptor} from "./custominterceptor";

/** Provider for the Noop Interceptor. */
export const interceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true };
