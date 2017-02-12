import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';

import { ProjectsService } from './projects.service';
import { TemplatesService } from './templates.service';
import { GenerationsComponent } from './generations/generations.component';
import { TemplatesComponent } from './templates/templates.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
    {
    path: 'projects',
    component: ProjectsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    GenerationsComponent,
    TemplatesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ProjectsService,TemplatesService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
