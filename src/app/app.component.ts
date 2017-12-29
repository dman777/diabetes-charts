import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})

// LEAVE OFF ... ADD BREAK POINT OBSERVER
export class AppComponent implements AfterViewInit {
   @ViewChild('snav') public snav: MdSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: (media) => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngAfterViewInit() { 
    this._mobileQueryListener = (media) => { 
      if (media.matches && this.snav.opened) { 
        this.snav.close();
      } else if (!media.matches && !this.snav.opened) {
        this.snav.open();
      }
      this.changeDetectorRef.detectChanges();
    };

    this.mobileQuery.addListener(this._mobileQueryListener);
  }
}
