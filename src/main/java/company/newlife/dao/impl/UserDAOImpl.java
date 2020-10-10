package company.newlife.dao.impl;

import company.newlife.dao.UserDAO;
import company.newlife.entity.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

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

    @Override
    public void addUser(UserEntity userEntity) {
        entityManager.persist(userEntity);
    }

    @Override
    public void updateUser(UserEntity userEntity) {
        entityManager.merge(userEntity);
    }

    @Override
    public List<UserEntity> getByRole(String role) {
        TypedQuery<UserEntity> query = entityManager.createQuery(" select u from UserEntity u where u.role LIKE :roleUser", UserEntity.class);
        query.setParameter("roleUser", "%" + role + "%");
        return query.getResultList();
    }

    @Override
    public List<UserEntity> getAll() {
        return entityManager.createQuery("select u from UserEntity u order by u.role", UserEntity.class).getResultList();
    }

    @Override
    public void deleteUser(UserEntity userEntity) {
        entityManager.remove(userEntity);
    }

    @Override
    public UserEntity getByID(Integer userID) {
        String hql = "select u from UserEntity u where  u.id = :userID";
        Query query = entityManager.createQuery(hql, UserEntity.class);
        query.setParameter("userID", userID);
        return (UserEntity) query.getSingleResult();
    }
}
