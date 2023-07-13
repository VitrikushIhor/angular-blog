import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {Subscription, switchMap} from 'rxjs';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  post!: Post
  submitted = false
  updateSubscription!: Subscription

  constructor(private activateRoute: ActivatedRoute,
              private postService: PostService,
              private alertService: AlertService,
  ) {
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.updateSubscription = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false
      this.alertService.success('post was update')
    })
  }

  ngOnInit(): void {
    this.activateRoute.params.pipe(switchMap((params => {
      return this.postService.getById(params['id'])
    }))).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }


  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }
}
