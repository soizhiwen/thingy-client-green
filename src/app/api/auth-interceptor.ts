import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectToken } from "../state/auth/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("token")
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("authorization",
                    idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}