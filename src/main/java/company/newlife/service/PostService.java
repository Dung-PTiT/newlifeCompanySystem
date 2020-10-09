package company.newlife.service;

import company.newlife.model.Post;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;

import java.util.List;

public interface PostService {
    void create(Post post);

    Post get(Integer id);

    List<Post> getAll();

    void update(Post post);

    void delete(Integer id);

    PagingResponse<Post> fetch(PagingRequest request);

    void updateImage(Post post);

    void updateText(Post post);
}
