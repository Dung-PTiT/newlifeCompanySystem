package company.newlife.dao;

import company.newlife.entity.TagEntity;
import company.newlife.util.paging.PagingRequest;

import java.util.List;

public interface TagDAO {
    void create(TagEntity tagEntity);

    TagEntity get(Integer id);

    List<TagEntity> getAll();

    List<TagEntity> fetch(PagingRequest request);

    void update(TagEntity tagEntity);

    void delete(TagEntity tagEntity);

    long count();
}
