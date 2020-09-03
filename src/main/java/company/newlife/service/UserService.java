package company.newlife.service;

import company.newlife.model.User;

public interface UserService {
    User getByUsername(String username);
}
