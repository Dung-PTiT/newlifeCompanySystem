package company.newlife.service;

import company.newlife.model.Category;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;

import java.util.List;

public interface CategoryService {
    void create(Category category);

    Category get(Integer id);

    List<Category> getAll();

    void update(Category category);

    void delete(Integer id);

    PagingResponse<Category> fetch(PagingRequest request);
}
