import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../../../shared/interfaces';

@Pipe({
  name: 'searchPost',
})
export class SerchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts
    }
    return posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
