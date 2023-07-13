import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashbord-page',
  templateUrl: './dashbord-page.component.html',
  styleUrls: ['./dashbord-page.component.scss'],
})
export class DashbordPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  dSub!: Subscription;
  search: string = ''

  constructor(private postService: PostService,
              private alertService: AlertService) {
  }

  remove(id: string | undefined) {
    if (id) {
      this.dSub = this.postService.remove(id).subscribe(() => {
        this.posts.filter(post => post.id !== id)
        this.alertService.danger('post was deleted')
      })
    }
  }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe((posts) => {
      // @ts-ignore
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
