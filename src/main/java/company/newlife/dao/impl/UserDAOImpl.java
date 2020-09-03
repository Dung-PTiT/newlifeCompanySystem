package company.newlife.dao.impl;

import company.newlife.dao.UserDAO;
import company.newlife.entity.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public UserEntity getByUsername(String username) {
        try {
            String hql = "SELECT u FROM UserEntity u WHERE u.username = :username";
            Query query = entityManager.createQuery(hql);
            query.setParameter("username", username);
            return (UserEntity) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public int getIDUserByUsername(String username) {
        String sql = "SELECT user_id FROM users where username = '" + username + "'";
        Query query = entityManager.createNativeQuery(sql);
        int IDUser = (Integer) query.getSingleResult();
        return IDUser;
    }
}
