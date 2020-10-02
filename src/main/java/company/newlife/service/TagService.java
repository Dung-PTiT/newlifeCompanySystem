package company.newlife.service;

import company.newlife.model.Tag;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;

import java.util.List;

public interface TagService {

    void create(Tag tag);

    Tag get(Integer id);

    List<Tag> getAll();

    void update(Tag tag);

    void delete(Integer id);

    PagingResponse<Tag> fetch(PagingRequest request);
}
