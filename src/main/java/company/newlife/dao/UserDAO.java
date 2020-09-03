package company.newlife.dao;


import company.newlife.entity.UserEntity;

public interface UserDAO {
    UserEntity getByUsername(String username);

    int getIDUserByUsername(String username);
}
