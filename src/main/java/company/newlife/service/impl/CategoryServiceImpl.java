package company.newlife.service.impl;

import company.newlife.dao.CategoryDAO;
import company.newlife.entity.CategoryEntity;
import company.newlife.model.Category;
import company.newlife.model.Post;
import company.newlife.model.Tag;
import company.newlife.service.CategoryService;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryDAO categoryDAO;

    @Override
    public void create(Category category) {

    }

    @Override
    public Category get(Integer id) {
        CategoryEntity categoryEntity = categoryDAO.get(id);
        Category category = new Category();
        category.setId(categoryEntity.getId());
        category.setCode(categoryEntity.getCode());
        category.setName(categoryEntity.getName());
        return category;
    }

    @Override
    public List<Category> getAll() {
        List<CategoryEntity> categoryEntities = categoryDAO.getAll();
        if (categoryEntities == null) {
            return null;
        }
        return categoryEntities.stream().map(element -> {
            Category category = new Category();
            category.setId(element.getId());
            category.setCode(element.getCode());
            category.setName(element.getName());
            return category;
        }).collect(Collectors.toList());
    }

    @Override
    public void update(Category category) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public PagingResponse<Category> fetch(PagingRequest request) {
        List<CategoryEntity> categoryEntities = categoryDAO.fetch(request);
        PagingResponse<Category> response = new PagingResponse<>();
        if (categoryEntities == null) {
            return null;
        }
        response.setData(categoryEntities.stream().map(element -> {
            Category category = new Category();
            category.setId(element.getId());
            category.setCode(element.getCode());
            category.setName(element.getName());
            return category;
        }).collect(Collectors.toList()));
        response.setDraw(request.getDraw());
        response.setRecordsFiltered(categoryEntities.size());
        response.setRecordsTotal((int) categoryDAO.count());
        response.setTotalDraw(response.getRecordsFiltered() / request.getLength());
        return response;
    }
}
