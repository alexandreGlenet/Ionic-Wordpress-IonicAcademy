import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(page = 1): Observable<any> {
    let options = {
      observe: "response" as "body",
      params: {
        per_page: "5",
        page: "" + page,
      },
    };

    return this.http
      .get<any[]>(`${environment.apiUrl}posts?_embed`, options)
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
            else if (!post["_embedded"]["wp:featuredmedia"]) {
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
}
