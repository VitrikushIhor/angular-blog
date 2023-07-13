import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/post.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {

  form: FormGroup;

  constructor(private postService: PostService,
              private alertService: AlertService,
  ) {
    this.form = new FormGroup<any>({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      text: this.form.value.text,
      author: this.form.value.author,
      title: this.form.value.title,
      date: new Date(),
    }
    this.postService.create(post).subscribe(() => {
      this.form.reset()
      this.alertService.success('Post was create')
    })
  }

}
