import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'ng2-bootstrap/accordion';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { TemplatesComponent } from './projects/display/templates/templates.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DisplayComponent } from './projects/display/display.component';

import { ProjectsService } from './projects/shared/projects-list.service';
import { TemplatesService } from './projects/display/shared/templates.service';
import { DisplayService } from './projects/display/shared/display.service';




// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
    {
    path: 'projects',
    component: ProjectsComponent, 
    children: [
    { path: 'projectsList', component: ProjectsListComponent, outlet: 'list' },
    { path: ':id', component: DisplayComponent, outlet: 'display'}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TemplatesComponent,
    ProjectsListComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AccordionModule.forRoot()
  ],
  providers: [ProjectsService,TemplatesService, DisplayService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
