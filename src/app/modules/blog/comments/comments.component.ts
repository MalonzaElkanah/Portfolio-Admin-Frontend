import { 
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';
// import { ADTSettings,  } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

import { Comment, CommentList, Article } from '../blog';
import { BlogService } from '../blog.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // dtOptions: ADTSettings = {};
  // dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  comments: CommentList | undefined;
  article!: Article;

  constructor(
    private _blogService: BlogService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this._route.data.subscribe((data) => {
      this.article = data["article"];
    });
  }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    // Fetch Comment list Data 
    this._blogService.getArticleCommentList(this.article?.id ?? 0).subscribe((comments: CommentList) => {
      this.comments = comments;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  removeComment(comment: Comment){
    let deleteConfirm = confirm("DELETE '"+comment.name+"' comment? Click OK to confirm.");
    if (deleteConfirm) {
      this._blogService.deleteArticleComment(this.article?.id ?? 0, comment?.id ?? 0).subscribe(() => {

        alert("Delete '"+comment.name+"' Success!");
        console.log("Delete '"+comment.name+"' Success!");
        this._router.navigate([`/blog/comments`]);

      },(error: any) => {
        console.log("Delete '"+comment.name+"' Failed");
        console.log(error);
        alert("Delete '"+comment.name+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+comment.name+"' Canceled!");
    }
  }

}
