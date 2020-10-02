package company.newlife.dao;

import company.newlife.entity.CategoryEntity;
import company.newlife.util.paging.PagingRequest;

import java.util.List;

public interface CategoryDAO {
    void create(CategoryEntity categoryEntity);

    CategoryEntity get(Integer id);

    List<CategoryEntity> getAll();

    List<CategoryEntity> fetch(PagingRequest request);

    void update(CategoryEntity categoryEntity);

    void delete(CategoryEntity categoryEntity);

    long count();
}
