
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// setup apollo
import { HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LayoutModule } from '@angular/cdk/layout';
// import { ElishCustomMaterialModule } from './shared/elish.material.module';
// import { FooterComponent } from './shared/footer/footer.component';
// import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { BackendService } from './services/backend-service';
import { AuthGuard } from './services/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ElishCustomMaterialModule } from './styles';


export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({uri: environment.graphql});

    const auth = setContext((_: any, { headers }: any) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          //headers: headers.append('Authorization', `Bearer ${token}`)
          //headers: new HttpHeaders().set('Authorization', `${token}`)
          headers: new HttpHeaders().set('token', `${token}`)
        };
      }
    });
  return {
    //link: httpLink.create({uri: environment.graphql}),
    link: auth.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // LayoutModule,
    ElishCustomMaterialModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [BackendService, AuthGuard, {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }