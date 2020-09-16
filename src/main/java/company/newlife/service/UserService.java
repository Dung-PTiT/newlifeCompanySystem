package company.newlife.service;

import company.newlife.model.User;

import java.util.List;

public interface UserService {
    User getByUsername(String username);

    void addUser(User user);

    void updateUser(User user);

    List<User> getByRole(String role);

    List<User> getAll();

    void deleteUser(Integer userID);
}
