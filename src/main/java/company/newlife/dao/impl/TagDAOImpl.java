package company.newlife.dao.impl;

import company.newlife.dao.TagDAO;
import company.newlife.entity.TagEntity;
import company.newlife.model.Tag;
import company.newlife.util.paging.PagingRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class TagDAOImpl implements TagDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(TagEntity tagEntity) {
        entityManager.persist(tagEntity);
    }

    @Override
    public TagEntity get(Integer id) {
        String hql = "select t from TagEntity t where  t.id = :id";
        Query query = entityManager.createQuery(hql, TagEntity.class);
        query.setParameter("id", id);
        return (TagEntity) query.getSingleResult();
    }

    @Override
    public List<TagEntity> getAll() {
        String hql = "select t from TagEntity t";
        Query query = entityManager.createQuery(hql, TagEntity.class);
        return query.getResultList();
    }

    @Override
    public void update(TagEntity tagEntity) {
        entityManager.merge(tagEntity);
    }

    @Override
    public void delete(TagEntity tagEntity) {
        entityManager.remove(tagEntity);
    }

    @Override
    public List<TagEntity> fetch(PagingRequest request) {
        String hql = "select t from TagEntity t ";
        if (request.getDesc() != null && request.getOrderBy() != null && !request.getOrderBy().isEmpty()) {
            if (request.getDesc()) {
                hql += "order by t." + request.getOrderBy() + " desc";
            } else {
                hql += "order by t." + request.getOrderBy() + " asc";
            }
        }
        return entityManager.createQuery(hql, TagEntity.class)
                .setFirstResult(request.getStart())
                .setMaxResults((request.getLength()))
                .getResultList();
    }

    @Override
    public long count() {
        String hql = "select count(t) from TagEntity t";
        return entityManager.createQuery(hql, Long.class).getSingleResult();
    }
}
