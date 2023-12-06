import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Letter } from '../../jobs';
import { JobsService } from '../../jobs.service';


@Component({
  selector: 'app-letter-detail',
  templateUrl: './letter-detail.component.html',
  styleUrls: ['./letter-detail.component.css']
})
export class LetterDetailComponent implements OnInit {
  @ViewChild("iframe") iframe!:any;

  letter!: Letter;

  constructor(
    private _jobService: JobsService,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.letter = data['letter'];
    })
  }

  ngOnInit() { }

  copyLetterText() {
    navigator.clipboard.writeText(this.letter?.strip_tag_text ?? '');
  }

  printPreview() {
    const iframe = this.iframe.nativeElement;
    // console.log(iframe.contentDocument.body)
    iframe.contentWindow.print()
  }

}
