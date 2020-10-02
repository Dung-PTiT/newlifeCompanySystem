package company.newlife.dao.impl;


import company.newlife.dao.CategoryDAO;
import company.newlife.entity.CategoryEntity;
import company.newlife.util.paging.PagingRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class CategoryDAOImpl implements CategoryDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(CategoryEntity categoryEntity) {
        entityManager.persist(categoryEntity);
    }

    @Override
    public CategoryEntity get(Integer id) {
        String hql = "select c from CategoryEntity c where  c.id = :id";
        Query query = entityManager.createQuery(hql, CategoryEntity.class);
        query.setParameter("id", id);
        return (CategoryEntity) query.getSingleResult();
    }

    @Override
    public List<CategoryEntity> getAll() {
        String hql = "select c from CategoryEntity c";
        return entityManager.createQuery(hql, CategoryEntity.class).getResultList();
    }

    @Override
    public void update(CategoryEntity categoryEntity) {
        entityManager.merge(categoryEntity);
    }

    @Override
    public void delete(CategoryEntity categoryEntity) {
        entityManager.remove(categoryEntity);
    }

    @Override
    public List<CategoryEntity> fetch(PagingRequest request) {
        String hql = "select c from CategoryEntity c ";
        if (request.getDesc() != null && request.getOrderBy() != null && !request.getOrderBy().isEmpty()) {
            if (request.getDesc()) {
                hql += "order by c." + request.getOrderBy() + " desc";
            } else {
                hql += "order by c." + request.getOrderBy() + " asc";
            }
        }
        return entityManager.createQuery(hql, CategoryEntity.class)
                .setFirstResult(request.getStart())
                .setMaxResults((request.getLength()))
                .getResultList();
    }

    @Override
    public long count() {
        String hql = "select count(c) from CategoryEntity c";
        return entityManager.createQuery(hql, Long.class).getSingleResult();
    }
}
