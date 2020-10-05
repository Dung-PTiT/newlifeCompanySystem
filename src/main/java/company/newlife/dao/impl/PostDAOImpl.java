package company.newlife.dao.impl;

import company.newlife.dao.PostDAO;
import company.newlife.entity.PostEntity;
import company.newlife.entity.TagEntity;
import company.newlife.model.Post;
import company.newlife.util.paging.PagingRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class PostDAOImpl implements PostDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(PostEntity postEntity) {
        entityManager.persist(postEntity);
    }

    @Override
    public PostEntity get(Integer id) {
        String hql = "select p from PostEntity p where  p.id = :id";
        Query query = entityManager.createQuery(hql, PostEntity.class);
        query.setParameter("id", id);
        return (PostEntity) query.getSingleResult();
    }

    @Override
    public List<PostEntity> getAll() {
        String hql = "select p from PostEntity p";
        Query query = entityManager.createQuery(hql, PostEntity.class);
        return query.getResultList();
    }

    @Override
    public void update(PostEntity postEntity) {
        entityManager.merge(postEntity);
    }

    @Override
    public void delete(PostEntity postEntity) {
        entityManager.remove(postEntity);
    }

    @Override
    public List<PostEntity> fetch(PagingRequest request) {
        String hql = "select p from PostEntity p ";
        if (request.getDesc() != null && request.getOrderBy() != null && !request.getOrderBy().isEmpty()) {
            if (request.getDesc()) {
                hql += "order by p." + request.getOrderBy() + " desc";
            } else {
                hql += "order by p." + request.getOrderBy() + " asc";
            }
        }
        return entityManager.createQuery(hql, PostEntity.class)
                .setFirstResult(request.getStart())
                .setMaxResults((request.getLength()))
                .getResultList();
    }

    @Override
    public long count() {
        String hql = "select count(p) from PostEntity p";
        return entityManager.createQuery(hql, Long.class).getSingleResult();
    }


}
