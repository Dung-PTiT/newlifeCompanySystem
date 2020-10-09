package company.newlife.dao;

import company.newlife.entity.PostEntity;
import company.newlife.util.paging.PagingRequest;

import java.util.List;

public interface PostDAO {
    void create(PostEntity postEntity);

    PostEntity get(Integer id);

    List<PostEntity> getAll();

    List<PostEntity> fetch(PagingRequest request);

    void update(PostEntity postEntity);

    void delete(PostEntity postEntity);

    long count();

    void updateImage(PostEntity postEntity);

    void updateText(PostEntity postEntity);
}
