package company.newlife.service.impl;

import company.newlife.dao.UserDAO;
import company.newlife.entity.UserEntity;
import company.newlife.model.User;
import company.newlife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getByUsername(String username) {
        try {
            UserEntity userEntity = userDAO.getByUsername(username);
            User user = new User();
            user.setId(userEntity.getId());
            user.setUsername(userEntity.getUsername());
//            user.setPassword(userEntity.getPassword());
            user.setName(userEntity.getName());
            user.setPhoneNumber(userEntity.getPhoneNumber());
            user.setEmail(userEntity.getEmail());
            user.setAddress(userEntity.getAddress());
            user.setRole(userEntity.getRole());
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userDAO.getByUsername(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("Not Found !");
        }
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userEntity.getRole());
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return new org.springframework.security.core.userdetails.User(username, userEntity.getPassword(), authorities);
    }

    @Override
    public void addUser(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setUsername(user.getUsername());
        userEntity.setAddress(user.getAddress());
        userEntity.setRole(user.getRole());
        userEntity.setPhoneNumber(user.getPhoneNumber());
        userDAO.addUser(userEntity);
    }

    @Override
    public void updateUser(User user) {
        UserEntity userEntity = userDAO.getByID(user.getId());
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(userEntity.getPassword());
        userEntity.setUsername(user.getUsername());
        userEntity.setAddress(user.getAddress());
        userEntity.setRole(user.getRole());
        userEntity.setPhoneNumber(user.getPhoneNumber());
        userDAO.updateUser(userEntity);
    }

    @Override
    public void deleteUser(Integer userID) {
        UserEntity userEntity = userDAO.getByID(userID);
        userDAO.deleteUser(userEntity);
    }


    @Override
    public List<User> getByRole(String role) {
        List<UserEntity> userEntityList = userDAO.getByRole(role);
        if (userEntityList == null) {
            return null;
        }
        return userEntityList.stream().map(userEntity -> {
            User user = new User();
            user.setId(userEntity.getId());
            user.setUsername(userEntity.getUsername());
//            user.setPassword(userEntity.getPassword());
            user.setName(userEntity.getName());
            user.setRole(userEntity.getRole());
            user.setAddress(userEntity.getAddress());
            user.setEmail(userEntity.getEmail());
            user.setPhoneNumber(userEntity.getPhoneNumber());
            return user;
        }).collect(Collectors.toList());
    }

    @Override
    public List<User> getAll() {
        List<UserEntity> userEntityList = userDAO.getAll();
        if (userEntityList == null) {
            return null;
        }
        return userEntityList.stream().map(userEntity -> {
            User user = new User();
            user.setId(userEntity.getId());
            user.setUsername(userEntity.getUsername());
//            user.setPassword(userEntity.getPassword());
            user.setName(userEntity.getName());
            user.setRole(userEntity.getRole());
            user.setAddress(userEntity.getAddress());
            user.setEmail(userEntity.getEmail());
            user.setPhoneNumber(userEntity.getPhoneNumber());
            return user;
        }).collect(Collectors.toList());
    }
}
