import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'ng2-bootstrap/accordion';

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
    component: ProjectsComponent, 
    children: [
    // { path: 'speakersList', component: SpeakersListComponent, outlet: 'list' },
    // { path: ':id', component: BioComponent, outlet: 'display' }
    ]
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
    RouterModule.forRoot(ROUTES),
    AccordionModule.forRoot()
  ],
  providers: [ProjectsService,TemplatesService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
