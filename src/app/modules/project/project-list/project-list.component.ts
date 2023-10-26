import { 
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';
// import { ADTSettings,  } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

import { Project, ProjectList } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // dtOptions: ADTSettings = {};
  // dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  projects: ProjectList | undefined;

  constructor(
    private _projectService: ProjectService,
    private _router: Router
  ) { }

  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers'
      }

    // Fetch Project list Data 
    this._projectService.getAllProjects().subscribe((projects: ProjectList) => {
      this.projects = projects;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  removeProject(project: Project){
    let deleteConfirm = confirm("DELETE '"+project.name+"' project? Click OK to confirm.");
    if (deleteConfirm) {
      this._projectService.deleteProject(project?.id ?? 0).subscribe(() => {

        alert("Delete '"+project.name+"' Success!");
        console.log("Delete '"+project.name+"' Success!");
        this._router.navigate([`/projects`]);

      },(error: any) => {
        console.log("Delete '"+project.name+"' Failed");
        console.log(error);
        alert("Delete '"+project.name+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+project.name+"' Canceled!");
    }
  }

  slugify(str: string): string {
    return str.toLowerCase(
      ).trim(
      ).replace(
        /[^\w\s-]/g,
        ''
      ).replace(
        /[\s_-]+/g,
        '-'
      ).replace(
        /^-+|-+$/g,
        ''
      );
  }

  binarify(int: number): string {
    return btoa(int.toString())
  }

}
