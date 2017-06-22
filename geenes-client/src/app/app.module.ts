import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'ng2-bootstrap/accordion';

import { SafeHtmlPipe } from './shared/safeHtml.pipe';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { TemplatesComponent } from './projects/display/templates/templates.component';
import { DisplayComponent } from './projects/display/display.component';
import { RatingComponent } from './projects/display/rating/rating.component';
import { NewGenerationComponent } from './projects/display/new-generation/new-generation.component';

import { ProjectsService } from './projects/shared/projects.service';
import { TemplatesService } from './projects/display/shared/templates.service';
import { DisplayService } from './projects/display/shared/display.service';
import { RatingService } from './projects/display/shared/rating.service';
import { NewGenerationService } from './projects/display/shared/new-generation.service';

import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';

import { DraggableDirective } from './projects/display/shared/draggable.directive';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_directives/alert.component';






// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  { path: 'projects', component: ProjectsComponent, },
  { path: 'project/:p_id/:g_id', component: DisplayComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TemplatesComponent,
    DisplayComponent,
    SafeHtmlPipe,
    RatingComponent,
    DraggableDirective,
    NewGenerationComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AccordionModule.forRoot()
  ],
  providers: [
    ProjectsService,
    TemplatesService, 
    DisplayService, 
    AuthenticationService, 
    UserService, 
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
