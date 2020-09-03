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

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService  {
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
            user.setPassword(userEntity.getPassword());
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
//        return new User(email,userEntity.getPassword(),authorities);
        return new org.springframework.security.core.userdetails.User(username,userEntity.getPassword(),authorities);
    }
}
