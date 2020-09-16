package company.newlife.dao;


import company.newlife.entity.UserEntity;

import java.util.List;

public interface UserDAO {
    UserEntity getByUsername(String username);

    void addUser(UserEntity userEntity);

    void updateUser(UserEntity userEntity);

    List<UserEntity> getAll();

    List<UserEntity> getByRole(String role);

    void deleteUser(UserEntity userEntity);

    int getIDUserByUsername(String username);

    UserEntity getByID(Integer userID);
}
