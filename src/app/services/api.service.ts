import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Platform } from '@ionic/angular';

const JWT_KEY = "mytoken";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  private user = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.storage.get(JWT_KEY).then(data => {
        if (data) {
          console.log('JWT from storage: ', data);
          this.user.next(data);
        }
      })
    })
      
    }

  getPosts(page = 1, categoryId = null, search = ''): Observable<any> {
    let options = {
      observe: "response" as "body",
      params: {
        per_page: "5",
        page: "" + page,
      },
    };

    let url = `${environment.apiUrl}posts?_embed`;

    if(categoryId){
      url += `&categories=${categoryId}`;
    }

    if(search != '') {
      url += `&search=${search}`;
    }

    console.log('request: ', url);

    return this.http
      .get<any[]>(url, options)
      .pipe(
        map((res) => {
          let mediaUrl = "../assets/img/no-image-available.jpg";
          let data = res["body"];
          

          for (let post of data) {
            console.log(post);
            if (post["_embedded"]["wp:featuredmedia"]) {
              post.media_url =
                post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
                  "full"
                ].source_url;
            }
            else {
                   post.media_url = "../assets/img/no-image-available.jpg";
                   //post.source_url = "../assets/img/no-image-available.jpg";
                 }
          
          }

          return {
            
            posts: data,
            pages: res["headers"].get("x-wp-totalpages"),
            totalPosts: res["headers"].get("x-wp-total"),
          };
        })
      );
  }

  getPostContent(id) {
    return this.http
      .get<any>(`${environment.apiUrl}posts/${id}?_embed`)
      .pipe(map (post => {

        if (post["_embedded"]["wp:featuredmedia"]) {
          post.media_url =
            post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
              "full"
            ].source_url;
        }
        else if (!post["_embedded"]["wp:featuredmedia"]) {
          post.media_url = "../assets/img/no-image-available.jpg";
          //post.source_url = "../assets/img/no-image-available.jpg";
        }
        return post;
      })
      );
  }

  getCategories() {
    return this.http.get<any[]>(`${environment.apiUrl}categories`).pipe(
      map(res => {
        const items = [];
        for (let item of res) {
          items.push({
            id: item.id,
            name: item.name,
            slug: item.slug
          });
        }
        return items;
      })
    )
  }

  getPages() {

    return this.http.get<any[]>(`${environment.apiUrl}pages`).pipe(
      map(res => {
        const items = [];
        for (let item of res) {
          items.push({
            url: `page/${item.id}`,
            title: item.title.rendered,
            icon: 'file-tray'
          });
        }
        return items;
      })
    )

  }

  getPageContent(id) {

    return this.http
      .get<any>(`${environment.apiUrl}pages/${id}?_embed`)
      .pipe(map(page => {

        if (page["_embedded"]["wp:featuredmedia"]) {
          page.media_url =
            page["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
              "full"
            ].source_url;
        }
        else {
          page.media_url = "../assets/img/no-image-available.jpg";
        }
        return page;
      })
      );

  }

  signIn(username, password) {
    return this.http.post(`${environment.authUrl}jwt-auth/v1/token`, { username, password }).pipe(
      switchMap(data => {
        console.log('got token: ', data);
        return from(this.storage.set(JWT_KEY, data));
      }),
      tap(data => {
        this.user.next(data);
      })
    );
  }

  getPrivatePosts() {
    return this.http.get<any[]>(`${environment.apiUrl}posts?_embed&status=private`).pipe(
      map(data => {
        for (let post of data) {
          if (post['_embedded']['wp:featuredmedia']) {
            post.media_url =
              post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
          }
        }
        return data;
      })
    );
  }

  getCurrentUser() {
    return this.user.asObservable();
  }

  getUserValue() {
    return this.user.getValue();
  }

  logout() {
    this.storage.remove(JWT_KEY).then(() => {
      this.user.next(null);
    });
  }



}
