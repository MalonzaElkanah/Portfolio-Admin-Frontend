import {
  Component,
  OnInit 
} from '@angular/core';

import {
    Work,
    WorkList
} from '../work';
import { WorkService } from '../work.service';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent {
  workList!: WorkList;

  constructor(
    private _workService: WorkService
  ) { }

  ngOnInit(): void {
    this._workService.getWorkList().subscribe((work: WorkList) => {
      this.workList = work;
    });
  }

  removeWork(work: Work){
    let deleteConfirm = confirm("DELETE '"+work.company+":"+work.position+"' work? Click OK to confirm.");
    if (deleteConfirm) {
      this._workService.deleteWork(work?.id ?? 0).subscribe(() => {

        alert("Delete '"+work.company+":"+work.position+"' Success!");
        console.log("Delete '"+work.company+":"+work.position+"' Success!");

        this._workService.getWorkList().subscribe((work: WorkList) => {
          this.workList = work;
        });

      },(error: any) => {
        console.log("Delete '"+work.company+":"+work.position+"' Failed");
        console.log(error);
        alert("Delete '"+work.company+":"+work.position+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+work.company+":"+work.position+"' Canceled!");
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
