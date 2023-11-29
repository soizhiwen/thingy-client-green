import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectToken } from "../state/auth/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private idToken: string | undefined;
    constructor(private store: Store) {
        this.store.select(selectToken).subscribe(token => this.idToken = token);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (this.idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + this.idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}