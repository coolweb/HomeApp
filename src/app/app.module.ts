import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FlexModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    FlexModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:3000/graphql'}),
      cache: new InMemoryCache()
    });
  }
 }
