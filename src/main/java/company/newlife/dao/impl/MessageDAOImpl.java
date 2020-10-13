package company.newlife.dao.impl;

import company.newlife.dao.MessageDAO;
import company.newlife.entity.MessageEntity;
import company.newlife.util.paging.PagingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class MessageDAOImpl implements MessageDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(MessageEntity messageEntity) {
        entityManager.persist(messageEntity);
    }

    @Override
    public MessageEntity get(Integer id) {
        String hql = "select m from MessageEntity m where  m.id = :id";
        Query query = entityManager.createQuery(hql, MessageEntity.class);
        query.setParameter("id", id);
        return (MessageEntity) query.getSingleResult();
    }

    @Override
    public List<MessageEntity> getAll() {
        String hql = "select m from MessageEntity m";
        return entityManager.createQuery(hql, MessageEntity.class).getResultList();
    }

    @Override
    public List<MessageEntity> fetch(PagingRequest request) {
        String hql = "select m from MessageEntity m ";
        if (request.getDesc() != null && request.getOrderBy() != null && !request.getOrderBy().isEmpty()) {
            if (request.getDesc()) {
                hql += "order by m." + request.getOrderBy() + " desc";
            } else {
                hql += "order by m." + request.getOrderBy() + " asc";
            }
        }
        return entityManager.createQuery(hql, MessageEntity.class)
                .setFirstResult(request.getStart())
                .setMaxResults((request.getLength()))
                .getResultList();
    }

    @Override
    public void update(MessageEntity messageEntity) {
        entityManager.merge(messageEntity);
    }

    @Override
    public void delete(MessageEntity messageEntity) {
        entityManager.remove(messageEntity);
    }

    @Override
    public long count() {
        String hql = "select count(m) from MessageEntity m";
        return entityManager.createQuery(hql, Long.class).getSingleResult();
    }
}
